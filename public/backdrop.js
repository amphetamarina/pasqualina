// Pure highlight-sweep algorithm for the editor backdrop: cut the text at
// every issue boundary and wrap each segment with the strongest severity
// covering it. Importable from Node (bench) and the browser (type=module).

/** @param {string} s */
const esc = (s) => s.replace(/[&<>]/g, (/** @type {string} */ c) => (/** @type {Record<string, string>} */ ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }))[c]);
/** @type {Record<string, number>} */
const RANK = { error: 3, warning: 2, suggestion: 1 };

/**
 * @param {string} seg
 * @param {{ severity: string, id?: number }[]} active
 * @param {number | null} activeId
 */
function segHtml(seg, active, activeId) {
  if (!active.length) return esc(seg);
  let top = active[0];
  for (const i of active) if (RANK[i.severity] > RANK[top.severity]) top = i;
  const cls = active.some((i) => i.id === activeId) ? " active" : "";
  return `<mark class="${top.severity}${cls}">${esc(seg)}</mark>`;
}

/**
 * Build the backdrop's inner HTML for the given text and issues.
 * @param {string} src the editor text
 * @param {{ start: number, end: number, severity: string, id?: number }[]} issues
 * @param {number | null} activeId the active issue's id, if any
 * @returns {string} html (segments; plain text where nothing covers)
 */
export function buildBackdropHtml(src, issues, activeId) {
  const cuts = new Set([0, src.length]);
  const startsAt = Object.create(null);
  const endsAt = Object.create(null);
  for (const i of issues) {
    if (i.end > i.start) {
      cuts.add(i.start);
      cuts.add(i.end);
      (startsAt[i.start] || (startsAt[i.start] = [])).push(i);
      (endsAt[i.end] || (endsAt[i.end] = [])).push(i);
    }
  }
  const points = [...cuts].sort((a, b) => a - b);
  const active = /** @type {{ start: number, end: number, severity: string, id?: number }[]} */ ([]);
  let html = "";
  for (let k = 0; k < points.length - 1; k++) {
    const a = points[k];
    const b = points[k + 1];
    for (const i of startsAt[a] || []) active.push(i);
    for (const i of endsAt[a] || []) active.splice(active.indexOf(i), 1);
    html += segHtml(src.slice(a, b), active, activeId);
  }
  return html;
}
