// Route-level specs for the dev server (public/ API + static serving).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { startServer } from "../helpers/server.mjs";

describe("HEAD", () => {
  it("answers 200 with the html page", async () => {
    const { close } = await startServer();
    try {
      const res = await fetch("http://127.0.0.1:8321/");
      assert.equal(res.status, 200);
    } finally { await close(); }
  });
});
