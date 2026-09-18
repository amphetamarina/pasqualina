// The normalized issue shape both tools reduce to, plus ordering.
// Pure: no tool imports.

/**
 * Normalized issue (what /api/lint returns and the page renders).
 * @typedef {object} Issue
 * @property {"harper" | "vale"} tool
 * @property {string} rule            e.g. "SpellCheck" | "BR.FalseFriends"
 * @property {string} kind            tool-specific
 * @property {"error" | "warning" | "suggestion"} severity
 * @property {string} message
 * @property {number} start           UTF-16 offset into the original text
 * @property {number} end             exclusive
 * @property {number} line            1-based
 * @property {number} column          1-based
 * @property {string} matched         the offending text
 * @property {string[]} suggestions   replacement strings; "" means remove
 * @property {string} [link]
 * @property {string} [description]
 */

/**
 * Order issues by document position: start ascending, then end ascending.
 * Stable for equal spans (Array.prototype.sort is stable).
 * @param {Issue[]} issues
 * @returns {Issue[]} a new sorted array
 */
export function sortIssues(issues) {
  return [...issues].sort((a, b) => a.start - b.start || a.end - b.end);
}
