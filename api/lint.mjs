// Vercel serverless function: POST /api/lint {text} -> {issues, counts, ms}.
// Same contract as server.mjs (the local dev server); both call lintAll().
// Harper runs in-process (harper.js); Vale is the binary bundled from
// vendor/vale/ by scripts/fetch-vale.mjs (see vercel.json includeFiles).
import { lintAll } from "../lint.mjs";

const MAX_TEXT = 200 * 1024;

export default async function handler(req, res) {
  res.setHeader("cache-control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("allow", "POST");
    return res.status(405).json({ error: "method not allowed" });
  }
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "invalid JSON" }); } }
  const text = typeof body?.text === "string" ? body.text : null;
  if (text === null) return res.status(400).json({ error: "expected {text: string}" });
  if (text.length > MAX_TEXT) return res.status(413).json({ error: "text too large" });
  const t0 = performance.now();
  try {
    const result = await lintAll(text);
    res.status(200).json({ ...result, ms: Math.round(performance.now() - t0) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
