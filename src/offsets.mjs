// Pure offset/position math shared by the Harper and Vale adapters.
// No tool imports here: this module must stay loadable without WASM or
// child_process (that's what keeps unit specs fast and mutation runs scoped).

/**
 * Index of every line's first UTF-16 offset; starts[i] is line i+1's start.
 * @param {string} text
 * @returns {number[]}
 */
export function lineStartTable(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === "\n") starts.push(i + 1);
  return starts;
}

/**
 * 1-based line and column; column counted in code points like Vale does.
 * @param {string} text
 * @param {number[]} lineStarts result of lineStartTable(text)
 * @param {number} offset UTF-16 offset into text
 * @returns {{ line: number, column: number }}
 */
export function lineCol(text, lineStarts, offset) {
  let lo = 0, hi = lineStarts.length - 1;
  while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (lineStarts[mid] <= offset) lo = mid; else hi = mid - 1; }
  return { line: lo + 1, column: Array.from(text.slice(lineStarts[lo], offset)).length + 1 };
}

/**
 * Vale reports Span columns in code points within the line; this maps them
 * to UTF-16 offsets.
 * @param {string} lineText
 * @returns {number[]}
 */
export function codePointToUtf16Table(lineText) {
  const table = [0];
  let i = 0;
  for (const ch of lineText) { i += ch.length; table.push(i); }
  return table;
}
