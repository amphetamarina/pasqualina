// Harper adapter: holds the one WASM linter instance via memoizeAsync and
// reduces organized lints to the shared Issue shape.

import { LocalLinter, Dialect, SuggestionKind } from "harper.js";
import { binary } from "harper.js/binary";
import { memoizeAsync } from "../memo.mjs";
import { lineStartTable } from "../offsets.mjs";
import { harperSuggestions, toIssue } from "./normalize.mjs";

// American English only (decision 2026-09-16, docs/05-decisions.md).
export const getHarper = memoizeAsync(async () => {
  const linter = new LocalLinter({ binary, dialect: Dialect.American });
  await linter.setup();
  return linter;
});

// On Vercel the WASM setup is pure import-time work: start it as the module
// loads so it overlaps the cold start instead of adding to the first
// request's latency. Local cold stays untouched so the bench's cold number
// (baseline 923d1e9) remains comparable.
const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
if (IS_SERVERLESS) getHarper().catch(() => {}); // the real error surfaces at first use

// Map harper's SuggestionKind enum to the plain variant tag that
// normalize.mjs understands (keeps that module harper.js-free).
function mapVariant(s) {
  const variant = { [SuggestionKind.Replace]: "replace", [SuggestionKind.Remove]: "remove", [SuggestionKind.InsertAfter]: "insertAfter" }[s.kind()];
  return { variant, replacement: s.get_replacement_text() };
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
      const suggestions = harperSuggestions(l.suggestions().map(mapVariant), matched);
      issues.push(toIssue(text, lineStarts, { rule, kind, message: l.message(), start, end, matched, suggestions }));
      l.free?.();
    }
  }
  return issues;
}
