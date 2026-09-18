// Unit specs for the pure offset math (no WASM, no child_process — ms fast).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { codePointToUtf16Table, lineCol, lineStartTable } from "../../src/offsets.mjs";

describe("lineStartTable", () => {
  describe("when the text has newlines", () => {
    it("records the offset after each newline", () => {
      assert.deepEqual(lineStartTable("ab\ncd\n"), [0, 3, 6]);
    });

    it("starts a line after an empty line", () => {
      assert.deepEqual(lineStartTable("a\n\nb"), [0, 2, 3]);
    });

    it("has exactly one entry for text without newlines", () => {
      assert.deepEqual(lineStartTable("abc"), [0]);
    });
  });
});

describe("lineCol", () => {
  const starts = lineStartTable("ab\ncd\nef");
  describe("when the offset falls inside a line", () => {
    it("reports 1-based line and column", () => {
      assert.deepEqual(lineCol("ab\ncd\nef", starts, 0), { line: 1, column: 1 });
      assert.deepEqual(lineCol("ab\ncd\nef", starts, 4), { line: 2, column: 2 });
    });
  });

  describe("when the offset is at a line start", () => {
    it("reports column 1 of the next line", () => {
      assert.deepEqual(lineCol("ab\ncd\nef", starts, 3), { line: 2, column: 1 });
    });
  });

  describe("when non-BMP characters precede the offset", () => {
    it("counts the column in code points", () => {
      // UTF-16 offset 2 is code point 1, so column 2
      assert.deepEqual(lineCol("🙂b", [0], 2), { line: 1, column: 2 });
    });
  });

  describe("when the offset is in the last line", () => {
    it("resolves to the last line via the binary search's upper bound", () => {
      assert.deepEqual(lineCol("ab\ncd\nef", starts, 7), { line: 3, column: 2 });
    });
  });
});

describe("codePointToUtf16Table", () => {
  describe("when the line contains only BMP characters", () => {
    it("maps code-point n to UTF-16 offset n", () => {
      assert.deepEqual(codePointToUtf16Table("abc"), [0, 1, 2, 3]);
    });
  });

  describe("when the line contains non-BMP characters", () => {
    it("counts surrogate pairs as one code point", () => {
      // 🙂 is 2 UTF-16 units but 1 code point
      assert.deepEqual(codePointToUtf16Table("a🙂b"), [0, 1, 3, 4]);
    });
  });
});
