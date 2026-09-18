// Unit specs for pure Vale-side normalization (no spawned binary, ms fast).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { valeSpanOffsets, valeSuggestions } from "../../src/vale/normalize.mjs";
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
