// Unit specs for pure Vale-side normalization (no spawned binary, ms fast).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { valeSpanOffsets, valeSuggestions, toIssue } from "../../src/vale/normalize.mjs";
import { lineStartTable } from "../../src/offsets.mjs";

describe("valeSpanOffsets", () => {
  const text = "ab\ncdef";
  const starts = lineStartTable(text);

  describe("when the span is on the first line", () => {
    it("maps 1-based inclusive columns to start/end UTF-16 offsets", () => {
      // Span [1,2] covers columns 1..2 inclusive -> start 0, end 2
      const r = valeSpanOffsets(text, starts, { Line: 1, Span: [1, 2] });
      assert.deepEqual(r, { start: 0, end: 2 });
    });
  });

  describe("when the span is on a later line", () => {
    it("offsets by the line start", () => {
      // line 2 is "cdef"; columns 2..4 -> text offsets 4..6
      const r = valeSpanOffsets(text, starts, { Line: 2, Span: [2, 4] });
      assert.deepEqual(r, { start: 4, end: 7 });
    });
  });

  describe("when the line number is out of range", () => {
    it("clamps to the text instead of crashing", () => {
      const r = valeSpanOffsets(text, starts, { Line: 99, Span: [1, 1] });
      assert.equal(r.start, 0);
    });
  });
});

describe("toIssue", () => {
  const text = "ab\ncdef";
  const starts = lineStartTable(text);

  /** @param {object} [overrides] */
  const alert = (overrides = {}) => ({
    Check: "BR.Spelling", Severity: "error", Message: "misspelled",
    Line: 2, Span: [2, 4], Match: "cde", Action: { Name: "replace", Params: ["xyz"] },
    ...overrides,
  });

  describe("when the alert has all fields", () => {
    it("builds a full issue with tool, rule, severity, and suggestions", () => {
      const span = valeSpanOffsets(text, starts, alert());
      const i = toIssue(text, starts, alert({ Link: "https://x", Description: "desc" }), span);
      assert.equal(i.tool, "vale");
      assert.equal(i.rule, "BR.Spelling");
      assert.equal(i.severity, "error");
      assert.equal(i.kind, "error");
      assert.equal(i.message, "misspelled");
      assert.equal(i.matched, "cde");
      assert.equal(i.line, 2);
      assert.equal(i.column, 2);
      assert.deepEqual(i.suggestions, ["xyz"]);
      assert.equal(i.link, "https://x");
      assert.equal(i.description, "desc");
    });
  });

  describe("when the alert has no Link or Description", () => {
    it("sets link and description to undefined", () => {
      const span = valeSpanOffsets(text, starts, alert());
      const i = toIssue(text, starts, alert(), span);
      assert.equal(i.link, undefined);
      assert.equal(i.description, undefined);
    });
  });

  describe("when the alert has no Action", () => {
    it("sets suggestions to an empty list", () => {
      const a = alert();
      delete a.Action;
      const span = valeSpanOffsets(text, starts, a);
      const i = toIssue(text, starts, a, span);
      assert.deepEqual(i.suggestions, []);
    });
  });
});

describe("valeSuggestions", () => {
  describe("when the action is replace with params", () => {
    it("uses the params", () => {
      assert.deepEqual(valeSuggestions({ Name: "replace", Params: ["reading"] }), ["reading"]);
    });
  });

  describe("when the action is replace without params", () => {
    it("returns no suggestions", () => {
      assert.deepEqual(valeSuggestions({ Name: "replace" }), []);
    });
  });

  describe("when the action is remove", () => {
    it("produces the empty-string marker", () => {
      assert.deepEqual(valeSuggestions({ Name: "remove" }), [""]);
    });
  });

  describe("when there is no action", () => {
    it("returns no suggestions", () => {
      assert.deepEqual(valeSuggestions(undefined), []);
    });
  });
});
