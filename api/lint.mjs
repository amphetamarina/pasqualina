// Vercel serverless function: POST /api/lint {text} -> {issues, counts, ms}.
// Same contract as server.mjs (the local dev server); both call lintAll().
// Harper runs in-process (harper.js); Vale is the binary bundled from
// vendor/vale/ by scripts/fetch-vale.mjs (see vercel.json includeFiles).
import { lintAll } from "../src/lint.mjs";
import { parseLintRequest } from "../src/http/lint-request.mjs";

export default async function handler(req, res) {
  res.setHeader("cache-control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("allow", "POST");
    return res.status(405).json({ error: "method not allowed" });
  }
  const parsed = parseLintRequest(req.body);
  if (!parsed.ok) return res.status(parsed.status).json({ error: parsed.error });
  const t0 = performance.now();
  try {
    const result = await lintAll(parsed.text);
    res.status(200).json({ ...result, ms: Math.round(performance.now() - t0) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e instanceof Error ? e.message : String(e) });
  }
}
