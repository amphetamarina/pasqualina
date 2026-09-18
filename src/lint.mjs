// Compose entry: runs both tool adapters and merges their issues.
// This is the one module consumers may enter through (enforced by the
// ESLint boundary rules).
//
// Normalized issue shape: see the @typedef Issue in src/issues.mjs.

import { runHarper, getHarper } from "./harper/linter.mjs";
import { runVale, getValeBin } from "./vale/linter.mjs";
import { sortIssues } from "./issues.mjs";

// re-exports so bin/harper-rules.mjs (getHarper) and bin/check-styles.mjs
// (getValeBin) enter through here like everyone else
export { getHarper, runHarper, getValeBin, runVale };

export async function lintAll(/** @type {string} */ text) {
  const [harper, vale] = await Promise.all([runHarper(text), runVale(text)]);
  const issues = sortIssues([...harper, ...vale]);
  return { issues, counts: { harper: harper.length, vale: vale.length } };
}
