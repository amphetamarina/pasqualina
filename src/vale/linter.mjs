// Vale adapter: resolves the binary once via memoizeAsync, spawns it per
// request, and reduces its JSON output to the shared Issue shape.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { memoizeAsync } from "../memo.mjs";
import { lineStartTable } from "../offsets.mjs";
import { toIssue, valeSpanOffsets } from "./normalize.mjs";

// project root is two levels up from src/vale/
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const VALE_CONFIG = path.join(ROOT, ".vale.ini");

// Resolution order: $PASQUALINA_VALE_BIN, then vendor/vale/vale (what the
// Vercel build downloads), then `vale` on PATH (nix-shell).
// On Vercel the deployment filesystem is read-only and may drop the exec
// bit, so the bundled binary is copied to the temp dir and chmod'ed once.
export const getValeBin = memoizeAsync(async () => {
  const vendored = path.join(ROOT, "vendor", "vale", "vale");
  let bin = process.env.PASQUALINA_VALE_BIN || (fs.existsSync(vendored) ? vendored : "vale");
  if (bin !== "vale" && (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)) {
    const tmp = path.join(os.tmpdir(), "pasqualina-vale");
    if (!fs.existsSync(tmp)) { fs.copyFileSync(bin, tmp); fs.chmodSync(tmp, 0o755); }
    bin = tmp;
  }
  return bin;
});

function runCli(cmd, args, input, { timeoutMs = 15000 } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: ROOT, stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "", stderr = "", settled = false;
    const finish = (fn) => { if (settled) return; settled = true; clearTimeout(timer); fn(); };
    const timer = setTimeout(() => { child.kill("SIGKILL"); finish(() => reject(new Error(`${cmd} timed out`))); }, timeoutMs);
    child.stdout.setEncoding("utf8").on("data", (d) => (stdout += d));
    child.stderr.setEncoding("utf8").on("data", (d) => (stderr += d));
    child.on("error", (e) => finish(() => reject(e)));
    child.on("close", (code) => finish(() => resolve({ code, stdout, stderr })));
    child.stdin.on("error", () => {});
    child.stdin.end(input);
  });
}

export async function runVale(text) {
  const bin = await getValeBin();
  const args = ["--config", VALE_CONFIG, "--no-global", "--no-exit", "--output=JSON", "--ext=.txt"];
  const { code, stdout, stderr } = await runCli(bin, args, text);
  if (code !== 0) throw new Error(`vale exit ${code}: ${stderr.trim() || stdout.slice(0, 200)}`);
  let parsed;
  try { parsed = JSON.parse(stdout || "{}"); } catch { throw new Error(`vale: bad JSON: ${stdout.slice(0, 200)}`); }
  const lineStarts = lineStartTable(text);
  const alerts = Object.values(parsed).flat();
  return alerts.map((a) => toIssue(text, lineStarts, a, valeSpanOffsets(text, lineStarts, a)));
}
