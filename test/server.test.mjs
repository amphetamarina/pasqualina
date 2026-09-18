import { test } from "node:test";
import assert from "node:assert/strict";
import { startServer } from "./helpers/server.mjs";

test("GET with a malformed percent-escape answers 400 and keeps the server alive", async () => {
  const { port, close } = await startServer();
  try {
    const bad = await fetch(`http://127.0.0.1:${port}/%E0%A4%A`);
    assert.equal(bad.status, 400);
    // the point of the fix: the handler did not crash the process, so a
    // second request is still answered
    const next = await fetch(`http://127.0.0.1:${port}/`);   // still alive
    assert.equal(next.status, 200);
    const type = next.headers.get("content-type") ?? "";
    assert.match(type, /text\/html/);
  } finally {
    await close();
  }
});

test("HEAD answers 200 with no body and without crashing the process", async () => {
  const { port, close } = await startServer();
  try {
    const head = await fetch(`http://127.0.0.1:${port}/`, { method: "HEAD" });
    assert.equal(head.status, 200);
    assert.equal(await head.text(), "");
    // still healthy afterwards
    const next = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(next.status, 200);
  } finally {
    await close();
  }
});
