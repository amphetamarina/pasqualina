// Runs Harper and Vale over a piece of text and returns one normalized
// list of "issues". Harper runs in-process through harper.js (WASM), so
// local and Vercel results are identical. Vale is a Go binary: on a dev
// machine it comes from nixpkgs (on PATH); on Vercel it is the pinned
// release that scripts/fetch-vale.mjs downloads into vendor/vale/.
//
// Normalized issue shape (what /api/lint returns and the page renders):
//   {
//     tool:        "harper" | "vale",
//     rule:        "SpellCheck" | "BR.FalseFriends" | ...,
//     kind:        "Spelling" | "Grammar" | "warning" | ...   (tool-specific)
//     severity:    "error" | "warning" | "suggestion",
//     message:     string,
//     start, end:  UTF-16 offsets into the original text (end exclusive),
//     line, column: 1-based,
//     matched:     the offending text,
//     suggestions: string[]   (replacement strings; "" means remove)
//   }

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LocalLinter, Dialect, SuggestionKind } from "harper.js";
import { binary } from "harper.js/binary";

export const ROOT = path.dirname(fileURLToPath(import.meta.url));
export const VALE_CONFIG = path.join(ROOT, ".vale.ini");

// ---------------------------------------------------------------- Harper

// American English only (decision 2026-09-16, docs/05-decisions.md).
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

const HARPER_SEVERITY = {
  Spelling: "error", Grammar: "error", Typo: "error", Capitalization: "warning",
  Punctuation: "warning", Agreement: "error", Miscellaneous: "suggestion",
  Formatting: "suggestion", Repetition: "warning", Readability: "suggestion",
  Style: "suggestion", Usage: "warning", Enhancement: "suggestion",
  WordChoice: "warning", Redundancy: "suggestion", Regionalism: "suggestion",
  Nonstandard: "warning", Eggcorn: "warning", Malapropism: "warning",
  BoundaryError: "error",
};

function lineStartTable(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === "\n") starts.push(i + 1);
  return starts;
}
// 1-based line and column; column counted in code points like Vale does.
function lineCol(text, lineStarts, offset) {
  let lo = 0, hi = lineStarts.length - 1;
  while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (lineStarts[mid] <= offset) lo = mid; else hi = mid - 1; }
  return { line: lo + 1, column: Array.from(text.slice(lineStarts[lo], offset)).length + 1 };
}

// Plain data in, plain data out: takes harper Suggestion objects and the
// already-sliced matched text; "" means "remove".
function harperSuggestions(suggestions, matched) {
  const out = [];
  for (const s of suggestions) {
    const k = s.kind();
    if (k === SuggestionKind.Replace) out.push(s.get_replacement_text());
    else if (k === SuggestionKind.Remove) out.push("");
    else if (k === SuggestionKind.InsertAfter) out.push(matched + s.get_replacement_text());
  }
  return out;
}

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
      const suggestions = harperSuggestions(l.suggestions(), matched);
      issues.push({
        tool: "harper", rule, kind,
        severity: HARPER_SEVERITY[kind] ?? "warning",
        message: l.message(),
        start, end, ...lineCol(text, lineStarts, start),
        matched, suggestions,
      });
      l.free?.();
    }
  }
  return issues;
}

// ------------------------------------------------------------------ Vale

// Resolution order: $PASQUALINA_VALE_BIN, then vendor/vale/vale (what the
// Vercel build downloads), then `vale` on PATH (nix-shell).
// On Vercel the deployment filesystem is read-only and may drop the exec
// bit, so the bundled binary is copied to the temp dir and chmod'ed once.
let valeBinPromise = null;
export function getValeBin() {
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
    let stdout = "", stderr = "";
    const timer = setTimeout(() => { child.kill("SIGKILL"); reject(new Error(`${cmd} timed out`)); }, timeoutMs);
    child.stdout.setEncoding("utf8").on("data", (d) => (stdout += d));
    child.stderr.setEncoding("utf8").on("data", (d) => (stderr += d));
    child.on("error", (e) => { clearTimeout(timer); reject(e); });
    child.on("close", (code) => { clearTimeout(timer); resolve({ code, stdout, stderr }); });
    child.stdin.on("error", () => {});
    child.stdin.end(input);
  });
}

// Vale counts Span columns in code points within the line; convert to UTF-16.
function codePointToUtf16Table(text) {
  const table = [0];
  let i = 0;
  for (const ch of text) { i += ch.length; table.push(i); }
  return table;
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
    const lineStart = lineStarts[a.Line - 1] ?? 0;
    const lineText = text.slice(lineStart, lineStarts[a.Line] ?? text.length);
    const cp = codePointToUtf16Table(lineText);
    const start = lineStart + (cp[a.Span[0] - 1] ?? 0);
    const end = lineStart + (cp[a.Span[1]] ?? lineText.length);
    const suggestions = a.Action?.Name === "replace" && Array.isArray(a.Action.Params) ? a.Action.Params
      : a.Action?.Name === "remove" ? [""] : [];
    return {
      tool: "vale", rule: a.Check, kind: a.Severity, severity: a.Severity,
      message: a.Message, start, end, line: a.Line, column: a.Span[0],
      matched: a.Match, suggestions,
      link: a.Link || undefined, description: a.Description || undefined,
    };
  });
}

// ------------------------------------------------------------------ both

export async function lintAll(text) {
  const [harper, vale] = await Promise.all([runHarper(text), runVale(text)]);
  const issues = [...harper, ...vale].sort((a, b) => a.start - b.start || a.end - b.end);
  return { issues, counts: { harper: harper.length, vale: vale.length } };
}
