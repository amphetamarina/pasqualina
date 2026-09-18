import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const BIN = fileURLToPath(new URL("../../bin/pasqualina.mjs", import.meta.url));

/**
 * @param {string[]} args
 * @param {string} [input]
 */
function cli(args, input = "") {
  return spawnSync(process.execPath, [BIN, ...args], { cwd: ROOT, input, encoding: "utf8" });
}

describe("pasqualina CLI", () => {
  describe("a file with issues", () => {
    it("prints a located line and exits 1", () => {
      const r = cli(["test/fixtures/sample.txt"]);
      assert.equal(r.status, 1);
      assert.match(r.stdout, /^1:1 {2}\[vale BR\.Age error\]/m);
      assert.match(r.stderr, /harper: \d+ {2}vale: \d+/);
    });

    it("names the file in --format json", () => {
      const r = cli(["--format", "json", "test/fixtures/sample.txt"]);
      assert.equal(r.status, 1);
      const body = JSON.parse(r.stdout);
      assert.equal(body.files[0].file, "test/fixtures/sample.txt");
      assert.ok(body.files[0].issues.length > 0);
    });
  });

  describe("clean text on stdin", () => {
    it("prints nothing and exits 0", () => {
      const r = cli([], "This sentence is fine.\n");
      assert.equal(r.status, 0);
      assert.equal(r.stdout, "");
      assert.equal(r.stderr, "harper: 0  vale: 0\n");
    });
  });

  describe("dirty text on stdin", () => {
    it("prints an unprefixed line and exits 1", () => {
      const r = cli([], "I have 30 years and I pretend to go.\n");
      assert.equal(r.status, 1);
      assert.match(r.stdout, /^1:1 {2}\[/m);
      assert.doesNotMatch(r.stdout, /<stdin>/);
    });
  });

  describe("--help", () => {
    it("prints usage and exits 0", () => {
      const r = cli(["--help"]);
      assert.equal(r.status, 0);
      assert.match(r.stdout, /Usage: pasqualina/);
    });
  });

  describe("a usage error", () => {
    it("exits 2", () => {
      const r = cli(["--nope"]);
      assert.equal(r.status, 2);
      assert.match(r.stderr, /Unknown option/);
    });
  });
});
