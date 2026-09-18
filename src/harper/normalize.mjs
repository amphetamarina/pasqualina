// Pure Harper-side normalization: severity mapping, suggestion collection,
// and the shared Issue shape. No harper.js import — the adapter passes
// pre-mapped plain data (that's what keeps this mutation-testable).

import { lineCol } from "../offsets.mjs";

/** @type {Record<string, string>} */
export const HARPER_SEVERITY = {
  Spelling: "error", Grammar: "error", Typo: "error", Capitalization: "warning",
  Punctuation: "warning", Agreement: "error", Miscellaneous: "suggestion",
  Formatting: "suggestion", Repetition: "warning", Readability: "suggestion",
  Style: "suggestion", Usage: "warning", Enhancement: "suggestion",
  WordChoice: "warning", Redundancy: "suggestion", Regionalism: "suggestion",
  Nonstandard: "warning", Eggcorn: "warning", Malapropism: "warning",
  BoundaryError: "error",
};

/**
 * Plain variant tag the adapter maps harper's SuggestionKind to, so this
 * module never imports harper.js.
 * @typedef {"replace" | "remove" | "insertAfter"} SuggestionVariant
 */

/**
 * @typedef {object} SuggestionItem
 * @property {SuggestionVariant} variant
 * @property {string} replacement the suggestion's replacement text
 */

/**
 * @param {SuggestionItem[]} items pre-mapped harper suggestions
 * @param {string} matched the offending text, already sliced
 * @returns {string[]} replacement strings; "" means remove
 */
export function harperSuggestions(items, matched) {
  const out = [];
  for (const item of items) {
    if (item.variant === "replace") out.push(item.replacement);
    else if (item.variant === "remove") out.push("");
    else if (item.variant === "insertAfter") out.push(matched + item.replacement);
  }
  return out;
}

/**
 * @param {string} text original text
 * @param {number[]} lineStarts lineStartTable(text)
 * @param {{ rule: string, kind: string, message: string, start: number, end: number, matched: string, suggestions: string[] }} lint
 * @returns {import("../issues.mjs").Issue}
 */
export function toIssue(text, lineStarts, lint) {
  const { rule, kind, message, start, end, matched, suggestions } = lint;
  const severity = /** @type {import("../issues.mjs").Issue["severity"]} */ (HARPER_SEVERITY[kind] ?? "warning");
  return {
    tool: "harper", rule, kind,
    severity,
    message,
    start, end, ...lineCol(text, lineStarts, start),
    matched, suggestions,
  };
}
