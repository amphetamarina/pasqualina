// Fake req/res adapter for the Vercel function handler: call handler and
// capture the answered status/body via the fake response's json().

/**
 * Build a minimal fake ServerResponse-like object; resolve when json() is
 * called.
 * @param {(v: { status: number, body: object }) => void} resolve
 */
function fakeResponse(resolve) {
  const res = /** @type {any} */ ({ headers: {}, statusCode: 200 });
  res.setHeader = (/** @type {string} */ k, /** @type {string} */ v) => { res.headers[k] = v; };
  res.status = (/** @type {number} */ c) => { res.statusCode = c; return res; };
  res.json = (/** @type {object} */ o) => resolve({ status: res.statusCode, body: o });
  return res;
}

/**
 * Invoke a request handler the way Vercel would, and await its answer.
 * @param {Function} handler
 * @param {unknown} [body]
 * @param {string} [method]
 * @returns {Promise<{ status: number, body: any }>}
 */
export function lintRequest(handler, body, method = "POST") {
  return new Promise((resolve) => {
    handler({ method, body }, fakeResponse(resolve));
  });
}
