const SEVERITY_RANK = { error: 0, warning: 1, suggestion: 2 };

/**
 * @typedef {import("../issues.mjs").Issue} Issue
 * @typedef {"error" | "warning" | "suggestion"} Severity
 * @typedef {"harper" | "vale"} Tool
 * @typedef {{ harper: number, vale: number }} Counts
 * @typedef {{ issues: Issue[], counts: Counts }} LintResult
 * @typedef {{ severity: Severity, tool: Tool | null }} Filter
 * @typedef {{ file: string, issues: Issue[], counts: Counts }} FileEntry
 */

/**
 * @param {Issue[]} issues
 * @param {Filter} filter
 * @returns {Issue[]}
 */
export function selectIssues(issues, filter) {
  return issues.filter((issue) =>
    SEVERITY_RANK[issue.severity] <= SEVERITY_RANK[filter.severity]
    && (filter.tool === null || issue.tool === filter.tool));
}

/**
 * @param {Issue[]} issues
 * @returns {Counts}
 */
function countByTool(issues) {
  return {
    harper: issues.filter((issue) => issue.tool === "harper").length,
    vale: issues.filter((issue) => issue.tool === "vale").length,
  };
}

/**
 * @param {Issue} issue
 * @returns {string}
 */
function issueLine(issue) {
  const suggestions = issue.suggestions.length
    ? `  →  ${issue.suggestions.map((s) => JSON.stringify(s)).join(" | ")}`
    : "";
  return `${issue.line}:${issue.column}  [${issue.tool} ${issue.rule} ${issue.severity}]  ${issue.message}${suggestions}`;
}

/**
 * @param {string} file
 * @param {LintResult} result
 * @param {Filter & { prefix: boolean }} options
 * @returns {string[]}
 */
export function formatText(file, result, options) {
  const issues = selectIssues(result.issues, options);
  return issues.map((issue) => (options.prefix ? `${file}:` : "") + issueLine(issue));
}

/**
 * @param {string} file
 * @param {LintResult} result
 * @param {Filter} filter
 * @returns {FileEntry}
 */
export function toEntry(file, result, filter) {
  const issues = selectIssues(result.issues, filter);
  return { file, issues, counts: countByTool(issues) };
}

/**
 * @param {FileEntry[]} entries
 * @returns {string}
 */
export function formatJson(entries) {
  return JSON.stringify({ files: entries }, null, 2);
}
