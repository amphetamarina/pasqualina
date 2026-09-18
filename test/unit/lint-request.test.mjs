// Behavior specs for the shared lint request parser (pure, no HTTP, no WASM).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseLintRequest } from "../../src/http/lint-request.mjs";

describe("parseLintRequest", () => {
  describe("when the body is valid {text: string} JSON", () => {
    it("accepts the text unchanged", () => {
      const r = parseLintRequest('{"text":"I have 30 years"}');
      assert.deepEqual(r, { ok: true, text: "I have 30 years" });
    });

    it("accepts an already-parsed body object", () => {
      const r = parseLintRequest({ text: "hello" });
      assert.deepEqual(r, { ok: true, text: "hello" });
    });

    it("accepts an empty text", () => {
      const r = parseLintRequest({ text: "" });
      assert.deepEqual(r, { ok: true, text: "" });
    });
  });

  describe("when the body is not valid JSON", () => {
    it("rejects with 400", () => {
      const r = parseLintRequest("{not json");
      assert.deepEqual(r, { ok: false, status: 400, error: "invalid JSON" });
    });
  });

  describe("when the body is valid JSON but text is not a string", () => {
    for (const payload of [{}, { text: 42 }, { text: null }, { other: "x" }, null, undefined]) {
      it(`rejects ${JSON.stringify(payload) ?? String(payload)} with 400`, () => {
        const r = parseLintRequest(payload);
        assert.deepEqual(r, { ok: false, status: 400, error: "expected {text: string}" });
      });
    }
  });

  describe("when the text exceeds the 200 KB cap", () => {
    it("rejects with 413", () => {
      const r = parseLintRequest({ text: "a".repeat(200 * 1024 + 1) });
      assert.deepEqual(r, { ok: false, status: 413, error: "text too large" });
    });

    it("accepts text at exactly the cap", () => {
      const r = parseLintRequest({ text: "a".repeat(200 * 1024) });
      assert.equal(r.ok, true);
    });
  });
});
