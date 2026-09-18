// Unit specs for the shared issue ordering (pure, ms fast).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sortIssues } from "../../src/issues.mjs";

/**
 * @param {number} start
 * @param {number} end
 * @returns {import("../../src/issues.mjs").Issue}
 */
const issue = (start, end, extra = {}) => ({
  tool: "harper", rule: "R", kind: "Spelling", severity: "warning",
  message: "", start, end, line: 1, column: 1, matched: "", suggestions: [],
  ...extra,
});

describe("sortIssues", () => {
  describe("when issues are out of document order", () => {
    it("sorts by start ascending", () => {
      const r = sortIssues([issue(10, 12), issue(0, 2)]);
      assert.deepEqual(r.map((i) => i.start), [0, 10]);
    });
  });

  describe("when two issues start at the same offset", () => {
    it("sorts by end ascending", () => {
      const r = sortIssues([issue(5, 12), issue(5, 8)]);
      assert.deepEqual(r.map((i) => i.end), [8, 12]);
    });
  });

  describe("when issues have equal spans", () => {
    it("keeps the original relative order (stable sort)", () => {
      const a = issue(5, 8, { rule: "first" });
      const b = issue(5, 8, { rule: "second" });
      const r = sortIssues([b, a]);
      assert.deepEqual(r.map((i) => i.rule), ["second", "first"]);
    });
  });

  describe("when called with a list", () => {
    it("does not mutate the input", () => {
      const input = [issue(10, 12), issue(0, 2)];
      sortIssues(input);
      assert.deepEqual(input.map((i) => i.start), [10, 0]);
    });
  });
});
