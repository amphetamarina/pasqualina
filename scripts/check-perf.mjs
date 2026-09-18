// Performance gate: runs bench/bench.mjs --json in its own process (never
// share a process with the test suite or other benches; interleaved runs
// poison timings) and applies thresholds against the recorded baseline.
//
// Baseline 923d1e9 (Node 24.19, vendored vale 3.14.2, harper.js 2.10.0):
//   harper warm p50=2.8ms   lintAll warm p50=214.6ms (dominated by the Vale
//   spawn — report-only, see below)   backdrop(500) min=0.9ms
//   backdrop(5000) min=68.5ms → 6.1ms after single-sweep rewrite (c0d8aa0)
//
// We gate only what we own. Vale is a spawned Go binary (~215ms/request,
// no server mode); a hard gate on lintAll warm would be a Vale gate in
// disguise and flake on machine noise. So: harper and the backdrop sweep
// are hard gates, vale/lintAll/cold are report-only.
//
// --soft: print failures as warnings and exit 0 (for CI on other runners);
// default: fail the run.

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
// --soft: explicit switches only — the CLI flag or PERF_SOFT=1 (CI). Never
// auto-detect CI=true; implicit softening is what a gate must not do.
const SOFT = process.argv.includes("--soft") || process.env.PERF_SOFT === "1";

// Thresholds annotated with the baseline they were set from. Never loosened
// to fit the code; re-baseline with a recorded number instead.
const THRESHOLDS = {
  harperWarmP50: 10,   // ms, hard
  backdrop500Min: 2.5, // ms, hard
  backdrop5000Min: 10, // ms, hard — re-baselined from 103 after c0d8aa0 (single-sweep)
};

function benchJson() {
  const r = spawnSync(process.execPath, [path.join(ROOT, "..", "bench", "bench.mjs"), "--json"], {
    encoding: "utf8", timeout: 5 * 60_000,
  });
  if (r.status !== 0) throw new Error(`bench failed (exit ${r.status}): ${r.error?.message ?? r.stderr}`);
  try { return JSON.parse(r.stdout); } catch { throw new Error(`bench: bad JSON: ${r.stdout.slice(0, 200)}`); }
}

const b = benchJson();
const checks = [
  { name: "harper warm p50", value: b.harper.warmP50, max: THRESHOLDS.harperWarmP50, gate: true },
  { name: "backdrop(500) min", value: b.backdrop500.min, max: THRESHOLDS.backdrop500Min, gate: true },
  { name: "backdrop(5000) min", value: b.backdrop5000.min, max: THRESHOLDS.backdrop5000Min, gate: true },
];
// report-only: spawned-binary latency and cold-start, tracked but not gated
const report = [
  { name: "vale warm p50", value: b.vale.warmP50 },
  { name: "lintAll warm p50", value: b.lintAll.warmP50 },
  { name: "lintAll cold", value: b.lintAll.cold },
];

/** @param {number} n */
const fmt = (n) => `${n.toFixed(1)}ms`;
let failed = false;
for (const c of checks) {
  const ok = c.value <= c.max;
  failed ||= !ok;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${c.name}: ${fmt(c.value)} (max ${fmt(c.max)})`);
}
for (const r of report) console.log(`  info  ${r.name}: ${fmt(r.value)} (report-only)`);

const verdict = failed ? (SOFT ? "PERF WARN" : "PERF FAIL") : "PERF OK";
console.log(verdict);
if (failed && !SOFT) process.exit(1);
