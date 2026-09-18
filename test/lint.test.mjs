import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { lintAll, runHarper } from "../src/lint.mjs";

const sample = fs.readFileSync(new URL("./fixtures/sample.txt", import.meta.url), "utf8");

test("offsets point at the matched text, even after non-BMP characters", async () => {
  const { issues } = await lintAll(sample);
  assert.ok(issues.length > 0, "expected some issues");
  for (const i of issues) {
    assert.equal(sample.slice(i.start, i.end), i.matched, `${i.tool} ${i.rule} at ${i.start}-${i.end}`);
  }
});

test("both tools contribute", async () => {
  const { counts } = await lintAll(sample);
  assert.ok(counts.harper >= 1 && counts.vale >= 1, JSON.stringify(counts));
});

test("clean text yields no issues", async () => {
  const { issues } = await lintAll("This sentence is fine.\n");
  assert.deepEqual(issues, []);
});

test("american dialect flags British spellings", async () => {
  const { issues } = await lintAll("We organise the colour scheme.\n");
  const words = issues.filter((i) => i.tool === "harper").map((i) => i.matched);
  assert.ok(words.includes("organise") || words.includes("colour"), JSON.stringify(words));
});

test("harper issues carry a rule name, not just a kind", async () => {
  const issues = await runHarper("I did a mistake.\n");
  assert.ok(issues.some((i) => i.rule === "DoMistake"), JSON.stringify(issues.map((i) => i.rule)));
});
