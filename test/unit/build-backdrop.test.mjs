// Characterization specs for buildBackdropHtml (Phase 4 commit 0): written
// against the CURRENT implementation so the Phase 5 rewrite is provably
// behavior-preserving. These assertions must not change. Changing one of
// them is a behavior change and needs its own commit with a stated reason.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildBackdropHtml } from "../../public/backdrop.js";

/**
 * @param {number} start
 * @param {number} end
 * @param {string} severity
 * @param {number} [id]
 */
const issue = (start, end, severity, id = 1) => ({ start, end, severity, id });

describe("buildBackdropHtml", () => {
  describe("when there are no issues", () => {
    it("returns the escaped text", () => {
      assert.equal(buildBackdropHtml("a < b", [], null), "a &lt; b");
    });
  });

  describe("when one issue covers a segment", () => {
    it("wraps it in a mark with the issue's severity", () => {
      assert.equal(buildBackdropHtml("abcdef", [issue(2, 4, "error")], null), "ab<mark class=\"error\">cd</mark>ef");
    });
  });

  describe("when two issues overlap on a segment", () => {
    it("the strongest severity wins on the overlap", () => {
      const html = buildBackdropHtml("abcdefgh", [issue(0, 5, "suggestion"), issue(3, 6, "error", 2)], null);
      assert.equal(html, "<mark class=\"suggestion\">abc</mark><mark class=\"error\">de</mark><mark class=\"error\">f</mark>gh");
    });
  });

  describe("when two issues are adjacent", () => {
    it("renders separate marks", () => {
      const html = buildBackdropHtml("abcdef", [issue(0, 3, "error"), issue(3, 6, "warning")], null);
      assert.equal(html, "<mark class=\"error\">abc</mark><mark class=\"warning\">def</mark>");
    });
  });

  describe("when the active issue covers a segment", () => {
    it("adds the active class to its mark", () => {
      const html = buildBackdropHtml("abcdef", [issue(0, 3, "error")], 1);
      assert.equal(html, "<mark class=\"error active\">abc</mark>def");
    });
  });

  describe("when the text contains html-sensitive characters", () => {
    it("escapes them inside and outside marks", () => {
      const html = buildBackdropHtml("<a> & <b>", [issue(2, 3, "warning")], null);
      assert.ok(!html.includes("<\b"), "no stray markup");
      assert.equal(html, "&lt;a<mark class=\"warning\">&gt;</mark> &amp; &lt;b&gt;");
    });
  });

  describe("when an issue spans zero characters", () => {
    it("produces no mark (its cut dedupes away)", () => {
      assert.equal(buildBackdropHtml("abc", [issue(2, 2, "error")], null), "abc");
    });
  });

  describe("when the active issue is not the strongest one", () => {
    it("keeps both: top drives the class, active drives the highlight", () => {
      // top is computed over severity, active over the active issue id,
      // independently — a rewrite tracking only the top issue would lose it
      const html = buildBackdropHtml("abc", [issue(0, 3, "error", 1), issue(0, 3, "suggestion", 2)], 2);
      assert.equal(html, "<mark class=\"error active\">abc</mark>");
    });
  });
});
