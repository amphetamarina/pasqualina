// Unit specs for pure Harper-side normalization (no harper.js, ms fast).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { HARPER_SEVERITY, harperSuggestions, toIssue } from "../../src/harper/normalize.mjs";
import { lineStartTable } from "../../src/offsets.mjs";

describe("harperSuggestions", () => {
  describe("when the suggestion replaces the text", () => {
    it("uses the replacement as-is", () => {
      const r = harperSuggestions([{ variant: "replace", replacement: "receive" }], "recieve");
      assert.deepEqual(r, ["receive"]);
    });
  });

  describe("when the suggestion removes the text", () => {
    it("produces the empty-string marker", () => {
      const r = harperSuggestions([{ variant: "remove", replacement: "" }], "an");
      assert.deepEqual(r, [""]);
    });
  });

  describe("when the suggestion inserts after the text", () => {
    it("prepends the matched text", () => {
      const r = harperSuggestions([{ variant: "insertAfter", replacement: " years" }], "30");
      assert.deepEqual(r, ["30 years"]);
    });
  });

  describe("when there are no suggestions", () => {
    it("returns an empty list", () => {
      assert.deepEqual(harperSuggestions([], "typo"), []);
    });
  });
});

describe("toIssue", () => {
  const text = "ab\ncd ef";
  const starts = lineStartTable(text);

  describe("when the kind has a known severity", () => {
    it("maps it through HARPER_SEVERITY", () => {
      const i = toIssue(text, starts, { rule: "SpellCheck", kind: "Spelling", message: "m", start: 0, end: 2, matched: "ab", suggestions: [] });
      assert.equal(i.severity, "error");
      assert.equal(i.tool, "harper");
    });
  });

  describe("when the kind is unknown to HARPER_SEVERITY", () => {
    it("falls back to warning", () => {
      const i = toIssue(text, starts, { rule: "R", kind: "SomethingNew", message: "m", start: 0, end: 1, matched: "a", suggestions: [] });
      assert.equal(i.severity, "warning");
    });
  });

  describe("when the offset is on the second line", () => {
    it("reports the 1-based line and code-point column", () => {
      const i = toIssue(text, starts, { rule: "R", kind: "Usage", message: "m", start: 3, end: 5, matched: "cd", suggestions: [] });
      assert.deepEqual({ line: i.line, column: i.column }, { line: 2, column: 1 });
    });
  });
});

describe("HARPER_SEVERITY", () => {
  describe("when read as a table", () => {
    it("only contains the three normalized severities", () => {
      for (const s of Object.values(HARPER_SEVERITY)) {
        assert.ok(["error", "warning", "suggestion"].includes(s), `unexpected severity ${s}`);
      }
    });
  });
});
