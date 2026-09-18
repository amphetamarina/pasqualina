// Pure highlight-sweep algorithm for the editor backdrop: cut the text at
// every issue boundary and wrap each segment with the strongest severity
// covering it. Importable from Node (bench) and the browser (type=module).

const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const rank = { error: 3, warning: 2, suggestion: 1 };

/**
 * Build the backdrop's inner HTML for the given text and issues.
 * @param {string} src the editor text
 * @param {{ start: number, end: number, severity: string, id?: number }[]} issues
 * @param {number | null} activeId the active issue's id, if any
 * @returns {string} html (segments; plain text where nothing covers)
 */
export function buildBackdropHtml(src, issues, activeId) {
  const cuts = new Set([0, src.length]);
  for (const i of issues) { cuts.add(i.start); cuts.add(i.end); }
  const points = [...cuts].sort((a, b) => a - b);
  let html = "";
  for (let k = 0; k < points.length - 1; k++) {
    const a = points[k], b = points[k + 1];
    const covering = issues.filter((i) => i.start <= a && i.end >= b);
    const seg = esc(src.slice(a, b));
    if (!covering.length) { html += seg; continue; }
    const top = covering.reduce((m, i) => rank[i.severity] > rank[m.severity] ? i : m);
    const active = covering.some((i) => i.id === activeId) ? " active" : "";
    html += `<mark class="${top.severity}${active}">${seg}</mark>`;
  }
  return html;
}
