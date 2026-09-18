// Pure Vale-side normalization: span offsets, suggestion shape, and the
// shared Issue shape. No child_process here — the adapter passes plain data.

import { codePointToUtf16Table } from "../offsets.mjs";

/**
 * Plain data in, plain data out: one Vale JSON alert -> { start, end }
 * UTF-16 offsets into the original text.
 * @param {string} text
 * @param {number[]} lineStarts lineStartTable(text)
 * @param {{ Line: number, Span: number[] }} alert
 * @returns {{ start: number, end: number }}
 */
export function valeSpanOffsets(text, lineStarts, alert) {
  const lineStart = lineStarts[alert.Line - 1] ?? 0;
  const lineText = text.slice(lineStart, lineStarts[alert.Line] ?? text.length);
  const cp = codePointToUtf16Table(lineText);
  return {
    start: lineStart + (cp[alert.Span[0] - 1] ?? 0),
    end: lineStart + (cp[alert.Span[1]] ?? lineText.length),
  };
}

/**
 * Plain data in, plain data out: a.Action -> replacement strings; "" means
 * remove.
 * @param {{ Name?: string, Params?: string[] } | undefined} action
 * @returns {string[]}
 */
export function valeSuggestions(action) {
  if (action?.Name === "replace" && Array.isArray(action.Params)) return action.Params;
  if (action?.Name === "remove") return [""];
  return [];
}

/**
 * @param {string} text original text
 * @param {number[]} lineStarts lineStartTable(text)
 * @param {{ Check: string, Severity: string, Message: string, Line: number, Span: number[], Match: string, Action?: { Name?: string, Params?: string[] }, Link?: string, Description?: string }} alert
 * @param {{ start: number, end: number }} span
 * @returns {import("../issues.mjs").Issue}
 */
export function toIssue(text, lineStarts, alert, span) {
  const { start, end } = span;
  const severity = /** @type {import("../issues.mjs").Issue["severity"]} */ (alert.Severity);
  return {
    tool: "vale", rule: alert.Check, kind: alert.Severity, severity,
    message: alert.Message, start, end, line: alert.Line, column: alert.Span[0],
    matched: alert.Match, suggestions: valeSuggestions(alert.Action),
    link: alert.Link || undefined, description: alert.Description || undefined,
  };
}
