// Shared lint request parsing for the two entry points (dev server and
// Vercel function): both accept POST {text: string} with a 200 KB cap.
// Pure function: raw body in, validated text or a status/error out.

// 200 KB of text is plenty for a page.
const MAX_TEXT = 200 * 1024;

/**
 * Validate a lint request body.
 * @param {string | { text?: unknown } | null | undefined} body
 *   the raw request body (string is parsed as JSON here; the dev server
 *   passes the pre-parsed object straight through)
 * @returns {{ ok: true, text: string } | { ok: false, status: number, error: string }}
 */
export function parseLintRequest(body) {
  let payload = body;
  if (typeof body === "string") {
    try { payload = JSON.parse(body); }
    catch { return { ok: false, status: 400, error: "invalid JSON" }; }
  }
  const obj = typeof payload === "object" && payload !== null ? payload : null;
  const text = obj !== null && typeof obj.text === "string" ? obj.text : null;
  if (text === null) return { ok: false, status: 400, error: "expected {text: string}" };
  if (text.length > MAX_TEXT) return { ok: false, status: 413, error: "text too large" };
  return { ok: true, text };
}
