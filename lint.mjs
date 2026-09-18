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
import { LocalLinter, Dialect, SuggestionKind } from "harper.js";
import { binary } from "harper.js/binary";
import { codePointToUtf16Table, lineStartTable } from "./src/offsets.mjs";
import { sortIssues } from "./src/issues.mjs";
import { harperSuggestions, toIssue } from "./src/harper/normalize.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const VALE_CONFIG = path.join(ROOT, ".vale.ini");

// ---------------------------------------------------------------- Harper

// American English only (decision 2026-09-16, docs/05-decisions.md).
/** @type {Promise<import("harper.js").LocalLinter> | null} */
let harperPromise = null;
export function getHarper() {
  if (!harperPromise) {
    harperPromise = (async () => {
      const linter = new LocalLinter({ binary, dialect: Dialect.American });
      await linter.setup();
      return linter;
    })();
  }
  return harperPromise;
}

// On Vercel the WASM setup is pure import-time work: start it as the module
// loads so it overlaps the cold start instead of adding to the first
// request's latency. Local cold stays untouched so the bench's cold number
// (baseline 923d1e9) remains comparable.
const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
if (IS_SERVERLESS) getHarper().catch(() => {}); // the real error surfaces at first use

export async function runHarper(text) {
  const linter = await getHarper();
  // organizedLints groups by rule name; lint() alone only exposes the kind.
  const byRule = await linter.organizedLints(text);
  const lineStarts = lineStartTable(text);
  const issues = [];
  for (const [rule, lints] of Object.entries(byRule)) {
    for (const l of lints) {
      const { start, end } = l.span(); // harper.js spans are UTF-16 offsets
      const matched = text.slice(start, end);
      const kind = l.lint_kind();
      const suggestions = harperSuggestions(l.suggestions().map(mapVariant), matched);
      issues.push(toIssue(text, lineStarts, { rule, kind, message: l.message(), start, end, matched, suggestions }));
      l.free?.();
    }
  }
  return issues;
}

// Map harper's SuggestionKind enum to the plain variant tag that
// src/harper/normalize.mjs understands (keeps that module harper.js-free).
function mapVariant(s) {
  const variant = { [SuggestionKind.Replace]: "replace", [SuggestionKind.Remove]: "remove", [SuggestionKind.InsertAfter]: "insertAfter" }[s.kind()];
  return { variant, replacement: s.get_replacement_text() };
}

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

// Plain data in, plain data out: one Vale JSON alert -> { start, end } UTF-16
// offsets into the original text.
function valeSpanOffsets(text, lineStarts, alert) {
  const lineStart = lineStarts[alert.Line - 1] ?? 0;
  const lineText = text.slice(lineStart, lineStarts[alert.Line] ?? text.length);
  const cp = codePointToUtf16Table(lineText);
  return {
    start: lineStart + (cp[alert.Span[0] - 1] ?? 0),
    end: lineStart + (cp[alert.Span[1]] ?? lineText.length),
  };
}

// Plain data in, plain data out: a.Action -> replacement strings; "" means remove.
function valeSuggestions(action) {
  if (action?.Name === "replace" && Array.isArray(action.Params)) return action.Params;
  if (action?.Name === "remove") return [""];
  return [];
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
  return alerts.map((a) => {
    const { start, end } = valeSpanOffsets(text, lineStarts, a);
    return {
      tool: "vale", rule: a.Check, kind: a.Severity, severity: a.Severity,
      message: a.Message, start, end, line: a.Line, column: a.Span[0],
      matched: a.Match, suggestions: valeSuggestions(a.Action),
      link: a.Link || undefined, description: a.Description || undefined,
    };
  });
}

// ------------------------------------------------------------------ both

export async function lintAll(text) {
  const [harper, vale] = await Promise.all([runHarper(text), runVale(text)]);
  const issues = sortIssues([...harper, ...vale]);
  return { issues, counts: { harper: harper.length, vale: vale.length } };
}
