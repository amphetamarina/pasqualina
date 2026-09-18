// Route-level specs for the dev server (public/ API + static serving).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { startServer } from "../helpers/server.mjs";

describe("HEAD", () => {
  it("answers 200 with no body and without crashing the process", async () => {
    const { port, close } = await startServer();
    try {
      const head = await fetch("http://127.0.0.1:" + port + "/", { method: "HEAD" });
      assert.equal(head.status, 200);
      assert.equal(await head.text(), "");
      // still healthy afterwards
      const next = await fetch("http://127.0.0.1:" + port + "/");
      assert.equal(next.status, 200);
    } finally { await close(); }
  });
});
