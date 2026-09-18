// Baseline benchmark for the two hot paths:
//
//   1. the request path   — runHarper / runVale / lintAll on
//                           test/fixtures/sample.txt, cold (first call: WASM
//                           setup + Vale spawn) and warm (steady state)
//   2. the page highlight — the backdrop cut-point sweep from
//                           public/index.html on a synthetic 200 KB input
//                           at 500 and 5000 issues
//
// The backdrop algorithm lives inline in public/index.html and is mirrored
// here; the module split (Phase 3) extracts it into an importable module and
// this bench will import the real thing instead.
//
// Human-readable by default; --json prints the metrics object and nothing
// else (for gates). Every perf commit must record before/after from here.

import { performance } from "node:perf_hooks";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { lintAll, runHarper, runVale } from "../src/lint.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const JSON_OUT = process.argv.includes("--json");

// ---------------------------------------------------------------- helpers

async function timedRuns(n, fn) {
  const runs = [];
  for (let i = 0; i < n; i++) {
    const t = performance.now();
    await fn();
    runs.push(performance.now() - t);
  }
  return runs.sort((a, b) => a - b);
}

// Deterministic PRNG so the synthetic input (and therefore the numbers)
// is reproducible run to run.
function lcg(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32;
}

function p50(xs) { return percentile(xs, 50); }
function percentile(sorted, p) { return sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))]; }
const ms = (n) => `${n.toFixed(1)}ms`;

const LINT_RUNS = 15;
const BACKDROP_RUNS = 50;

// ------------------------------------------------- 1. request path

async function benchLint() {
  const sample = fs.readFileSync(path.join(ROOT, "..", "test", "fixtures", "sample.txt"), "utf8");

  const t0 = performance.now();
  await lintAll(sample);
  const cold = performance.now() - t0;

  // each tool timed on its own so a regression in one cannot hide behind
  // the other (Promise.all composes them; the composed number comes from
  // lintAll itself)
  const harperWarm = await timedRuns(LINT_RUNS, () => runHarper(sample));
  const valeWarm = await timedRuns(LINT_RUNS, () => runVale(sample));
  const lintWarm = await timedRuns(LINT_RUNS, () => lintAll(sample));

  if (!JSON_OUT) {
    console.log(`lint path (sample.txt, ${sample.length}B)`);
    console.log(`  lintAll cold (first call) : ${ms(cold)}`);
    console.log(`  runHarper warm p50        : ${ms(p50(harperWarm))}`);
    console.log(`  runVale   warm p50        : ${ms(p50(valeWarm))}`);
    console.log(`  lintAll   warm p50        : ${ms(p50(lintWarm))}`);
  }
  return {
    harperWarmP50: p50(harperWarm), harperWarmMin: harperWarm[0],
    valeWarmP50: p50(valeWarm), valeWarmMin: valeWarm[0],
    cold, lintWarmP50: p50(lintWarm), lintWarmMin: lintWarm[0],
  };
}

// --------------------------------------- 2. backdrop sweep, no DOM
//
// Mirrors public/index.html renderBackdrop() (esc, rank, cut-point sweep,
// strongest-severity mark). The DOM steps (innerHTML write, scrollTop sync)
// are excluded. Phase 3 extracts the algorithm into an importable module and
// this bench will point at the real thing.

const ESC_MAP = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };
const esc = (s) => s.replace(/[&<>]/g, (c) => ESC_MAP[c]);
/** @type {Record<string, number>} */
const rank = { error: 3, warning: 2, suggestion: 1 };

function renderBackdropCore(src, issues, activeId) {
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
  return html + "\n";
}

async function benchBackdrop(nIssues, seed) {
  const rng = lcg(seed);
  const TARGET = 200 * 1024;
  const words = "the quick brown fox jumps over lazy dog while writing english texts".split(" ");
  let text = "";
  while (text.length < TARGET) text += words[Math.floor(rng() * words.length)] + " ";

  const severities = ["error", "warning", "suggestion"];
  const issues = Array.from({ length: nIssues }, (_, n) => {
    const start = Math.floor(rng() * (text.length - 20));
    return { id: n, start, end: start + 3 + Math.floor(rng() * 10), severity: severities[Math.floor(rng() * 3)] };
  });

  renderBackdropCore(text, issues, null); // warm-up
  let r = 0; // alternate the active id so both branches of the sweep run
  const runs = await timedRuns(BACKDROP_RUNS, () => renderBackdropCore(text, issues, r++ % 2 ? null : 7));

  if (!JSON_OUT) {
    console.log(`  backdrop(${nIssues}) min : ${ms(runs[0])}  (p50 ${ms(p50(runs))})`);
  }
  return { min: runs[0], p50: p50(runs) };
}

// ------------------------------------------------------------------- main

const lint = await benchLint();
if (!JSON_OUT) console.log(`backdrop sweep (200KB text, no DOM)`);
const b500 = await benchBackdrop(500, 0x533d);
const b5000 = await benchBackdrop(5000, 0x533d);

if (JSON_OUT) {
  console.log(JSON.stringify({
    lintAll: { cold: lint.cold, warmP50: lint.lintWarmP50, warmMin: lint.lintWarmMin },
    harper: { warmP50: lint.harperWarmP50, warmMin: lint.harperWarmMin },
    vale: { warmP50: lint.valeWarmP50, warmMin: lint.valeWarmMin },
    backdrop500: b500, backdrop5000: b5000,
  }));
} else {
  console.log("\nBaseline:");
  console.log(`  lintAll cold=${ms(lint.cold)} warmP50=${ms(lint.lintWarmP50)}`);
  console.log(`  harper warmP50=${ms(lint.harperWarmP50)}  vale warmP50=${ms(lint.valeWarmP50)}`);
}
