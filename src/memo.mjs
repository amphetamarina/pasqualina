// Memoize an async factory: cache the in-flight promise so concurrent
// callers share one setup. Pure; used by the tool adapters to hold their
// one-time (WASM / binary-resolution) setups.

/**
 * @template T
 * @param {() => Promise<T>} fn the async factory to memoize
 * @returns {() => Promise<T>}
 */
export function memoizeAsync(fn) {
  /** @type {Promise<T> | null} */
  let promise = null;
  return () => {
    if (!promise) {
      promise = fn().catch((e) => {
        promise = null; // a failed setup must not poison later calls
        throw e;
      });
    }
    return promise;
  };
}
