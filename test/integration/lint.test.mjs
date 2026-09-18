import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { lintAll, runHarper } from "../../src/lint.mjs";

const sample = fs.readFileSync(new URL("../fixtures/sample.txt", import.meta.url), "utf8");

describe("lintAll", () => {
  describe("when the text contains non-BMP characters", () => {
    it("reports UTF-16 offsets that slice to the matched text", async () => {
      const { issues } = await lintAll(sample);
      assert.ok(issues.length > 0, "expected some issues");
      for (const i of issues) {
        assert.equal(sample.slice(i.start, i.end), i.matched, `${i.tool} ${i.rule} at ${i.start}-${i.end}`);
      }
    });
  });

  describe("when the text has grammar and BR mistakes", () => {
    it("reports issues from both tools", async () => {
      const { counts } = await lintAll(sample);
      assert.ok(counts.harper >= 1 && counts.vale >= 1, JSON.stringify(counts));
    });
  });

  describe("when the text is clean", () => {
    it("reports no issues", async () => {
      const { issues } = await lintAll("This sentence is fine.\n");
      assert.deepEqual(issues, []);
    });
  });

  describe("when the text uses British spellings", () => {
    it("flags them under the American dialect", async () => {
      const { issues } = await lintAll("We organise the colour scheme.\n");
      const words = issues.filter((i) => i.tool === "harper").map((i) => i.matched);
      assert.ok(words.includes("organise") || words.includes("colour"), JSON.stringify(words));
    });
  });

  describe("runHarper", () => {
    it("names the rule, not only the kind", async () => {
      const issues = await runHarper("I did a mistake.\n");
      assert.ok(issues.some((i) => i.rule === "DoMistake"), JSON.stringify(issues.map((i) => i.rule)));
    });
  });
});
