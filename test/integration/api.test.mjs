// Exercises the Vercel function handler with a fake req/res pair.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import handler from "../../api/lint.mjs";
import { lintRequest } from "../helpers/lint-request.mjs";

describe("POST /api/lint", () => {
  describe("when the text has issues from both tools", () => {
    it("answers 200 with counts from each tool and a timing", async () => {
      const r = await lintRequest(handler, { text: "I have 30 years and I recieve emails." });
      assert.equal(r.status, 200);
      assert.ok(r.body.counts.harper >= 1 && r.body.counts.vale >= 1, JSON.stringify(r.body.counts));
      assert.ok(typeof r.body.ms === "number");
    });
  });

  describe("when the request is not a valid lint request", () => {
    it("answers 405 for non-POST", async () => {
      assert.equal((await lintRequest(handler, undefined, "GET")).status, 405);
    });

    it("answers 400 when text is not a string", async () => {
      assert.equal((await lintRequest(handler, { nope: 1 })).status, 400);
    });

    it("answers 400 for invalid JSON", async () => {
      assert.equal((await lintRequest(handler, "not json")).status, 400);
    });
  });
});
