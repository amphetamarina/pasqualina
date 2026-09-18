// Runs Harper and Vale over a piece of text and returns one normalized
// list of "issues". Harper runs in-process through harper.js (WASM), so
// local and Vercel results are identical. Vale is a Go binary: on a dev
// machine it comes from nixpkgs (on PATH); on Vercel it is the pinned
// release that scripts/fetch-vale.mjs downloads into vendor/vale/.
//
// Normalized issue shape: see the @typedef Issue in src/issues.mjs.

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { lineStartTable } from "./src/offsets.mjs";
import { sortIssues } from "./src/issues.mjs";
import { runHarper, getHarper } from "./src/harper/linter.mjs";
import { toIssue, valeSpanOffsets } from "./src/vale/normalize.mjs";

// re-exported for bin/harper-rules.mjs; goes away when the shim dies (Phase 3, commit 11)
export { getHarper, runHarper };

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const VALE_CONFIG = path.join(ROOT, ".vale.ini");

// ------------------------------------------------------------------ Vale

// Resolution order: $PASQUALINA_VALE_BIN, then vendor/vale/vale (what the
// Vercel build downloads), then `vale` on PATH (nix-shell).
// On Vercel the deployment filesystem is read-only and may drop the exec
// bit, so the bundled binary is copied to the temp dir and chmod'ed once.
/** @type {Promise<string> | null} */
let valeBinPromise = null;
export function getValeBin() { // also used by bin/check-styles.mjs
  if (!valeBinPromise) {
    valeBinPromise = (async () => {
      const vendored = path.join(ROOT, "vendor", "vale", "vale");
      let bin = process.env.PASQUALINA_VALE_BIN || (fs.existsSync(vendored) ? vendored : "vale");
      if (bin !== "vale" && (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)) {
        const tmp = path.join(os.tmpdir(), "pasqualina-vale");
        if (!fs.existsSync(tmp)) { fs.copyFileSync(bin, tmp); fs.chmodSync(tmp, 0o755); }
        bin = tmp;
      }
      return bin;
    })();
  }
  return valeBinPromise;
}

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

// ------------------------------------------------------------------ both

export async function lintAll(text) {
  const [harper, vale] = await Promise.all([runHarper(text), runVale(text)]);
  const issues = sortIssues([...harper, ...vale]);
  return { issues, counts: { harper: harper.length, vale: vale.length } };
}
