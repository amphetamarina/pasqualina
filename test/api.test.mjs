// Exercises the Vercel function handler with a fake req/res pair.
import { test } from "node:test";
import assert from "node:assert/strict";
import handler from "../api/lint.mjs";

function call(method, body) {
  return new Promise((resolve) => {
    const res = { headers: {}, statusCode: 200,
      setHeader(k, v) { this.headers[k] = v; },
      status(c) { this.statusCode = c; return this; },
      json(o) { resolve({ status: this.statusCode, body: o }); } };
    handler({ method, body }, res);
  });
}

test("POST /api/lint returns issues from both tools", async () => {
  const r = await call("POST", { text: "I have 30 years and I recieve emails." });
  assert.equal(r.status, 200);
  assert.ok(r.body.counts.harper >= 1 && r.body.counts.vale >= 1, JSON.stringify(r.body.counts));
  assert.ok(typeof r.body.ms === "number");
});

test("rejects non-POST and bad bodies", async () => {
  assert.equal((await call("GET")).status, 405);
  assert.equal((await call("POST", { nope: 1 })).status, 400);
  assert.equal((await call("POST", "not json")).status, 400);
});
