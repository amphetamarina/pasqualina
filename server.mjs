// Pasqualina dev server: serves ./public and exposes POST /api/lint.
// No dependencies. Binds to loopback only; this is a personal tool.
//
//   node server.mjs            # PORT=8321 by default
//   PORT=9000 node server.mjs

import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { lintAll } from "./lint.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(ROOT, "public");
const PORT = Number(process.env.PORT ?? 8321);
const MAX_BODY = 200 * 1024; // 200 KB of text is plenty for a page

/** @type {Record<string, string>} */
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml" };

function send(res, status, body, type = "application/json; charset=utf-8") {
  // HEAD requests must not carry a body.
  const isHead = res.req?.method === "HEAD";
  res.writeHead(status, { "content-type": type, "cache-control": "no-store" });
  res.end(isHead ? undefined : body);
}
const json = (res, status, obj) => send(res, status, JSON.stringify(obj));

async function readBody(req) {
  let size = 0; const chunks = [];
  for await (const c of req) {
    size += c.length;
    if (size > MAX_BODY) throw Object.assign(new Error("body too large"), { status: 413 });
    chunks.push(c);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function handleLint(req, res) {
  let payload;
  try { payload = JSON.parse(await readBody(req)); }
  catch (e) {
    const status = e instanceof Error && "status" in e ? e.status : 400;
    return json(res, status, { error: e instanceof Error ? e.message : String(e) });
  }
  const text = typeof payload?.text === "string" ? payload.text : null;
  if (text === null) return json(res, 400, { error: "expected {text: string}" });
  const t0 = performance.now();
  try {
    const result = await lintAll(text);
    json(res, 200, { ...result, ms: Math.round(performance.now() - t0) });
  } catch (e) {
    console.error(e);
    json(res, 500, { error: e instanceof Error ? e.message : String(e) });
  }
}

async function serveStatic(req, res) {
  const url = new URL(req.url, "http://x");
  let rel;
  try { rel = decodeURIComponent(url.pathname); }
  catch { return send(res, 400, "bad request", "text/plain"); }
  if (rel === "/") rel = "/index.html";
  const file = path.normalize(path.join(PUBLIC, rel));
  if (!file.startsWith(PUBLIC + path.sep)) return send(res, 403, "forbidden", "text/plain");
  try {
    const data = await fs.readFile(file);
    send(res, 200, data, MIME[path.extname(file)] ?? "application/octet-stream");
  } catch {
    send(res, 404, "not found", "text/plain");
  }
}

function handle(req, res) {
  if (req.method === "POST" && req.url === "/api/lint") return handleLint(req, res);
  if (req.method === "GET" || req.method === "HEAD") return serveStatic(req, res);
  send(res, 405, "method not allowed", "text/plain");
}

// Exposed for tests: returned server is not listening yet.
export function createServer() {
  return http.createServer(handle);
}

// Run only when invoked directly (`node server.mjs`), not when imported.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  createServer().listen(PORT, "127.0.0.1", () => {
    console.log(`pasqualina  http://127.0.0.1:${PORT}`);
  });
}
