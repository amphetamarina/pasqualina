// Runs Harper and Vale over a piece of text and returns one normalized
// list of "issues". Harper runs in-process through harper.js (WASM), so
// local and Vercel results are identical. Vale is a Go binary: on a dev
// machine it comes from nixpkgs (on PATH); on Vercel it is the pinned
// release that scripts/fetch-vale.mjs downloads into vendor/vale/.
//
// Normalized issue shape: see the @typedef Issue in src/issues.mjs.

import { sortIssues } from "./src/issues.mjs";
import { runHarper, getHarper } from "./src/harper/linter.mjs";
import { runVale, getValeBin } from "./src/vale/linter.mjs";

// re-exports for bin/harper-rules.mjs (getHarper) and bin/check-styles.mjs
// (getValeBin); go away when the shim dies (Phase 3, commit 11)
export { getHarper, runHarper, getValeBin, runVale };

export async function lintAll(text) {
  const [harper, vale] = await Promise.all([runHarper(text), runVale(text)]);
  const issues = sortIssues([...harper, ...vale]);
  return { issues, counts: { harper: harper.length, vale: vale.length } };
}
