// Unit specs for the memoized async factory (pure, ms fast).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { memoizeAsync } from "../../src/memo.mjs";

describe("memoizeAsync", () => {
  describe("when several callers start the setup at once", () => {
    it("shares one in-flight promise between them", async () => {
      let calls = 0;
      const setup = () => new Promise((resolve) => { calls++; setTimeout(() => resolve("ok"), 10); });
      const get = memoizeAsync(setup);
      const [a, b, c] = await Promise.all([get(), get(), get()]);
      assert.equal(calls, 1);
      assert.equal(a, "ok");
      assert.equal(b, "ok");
      assert.equal(c, "ok");
    });
  });

  describe("when the setup succeeds", () => {
    it("reuses the settled value on later calls", async () => {
      let calls = 0;
      const get = memoizeAsync(async () => { calls++; return calls; });
      await get();
      const second = await get();
      assert.equal(second, 1);
    });
  });

  describe("when the setup rejects once", () => {
    it("retries on the next call instead of failing forever", async () => {
      let attempts = 0;
      const get = memoizeAsync(async () => {
        attempts++;
        if (attempts === 1) throw new Error("transient");
        return "recovered";
      });
      await assert.rejects(get(), /transient/);
      assert.equal(await get(), "recovered");
    });

    it("reports the rejection to every caller that shared the attempt", async () => {
      let attempts = 0;
      const get = memoizeAsync(async () => {
        attempts++;
        if (attempts === 1) throw new Error("boom");
        return "ok";
      });
      const p1 = get();
      const p2 = get();
      await assert.rejects(p1, /boom/);
      await assert.rejects(p2, /boom/);
      assert.equal(attempts, 1);
      assert.equal(await get(), "ok");
    });
  });
});
