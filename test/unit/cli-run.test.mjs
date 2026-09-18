import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { run } from "../../src/cli/run.mjs";

/**
 * @param {Partial<import("../../src/issues.mjs").Issue>} [overrides]
 * @returns {import("../../src/issues.mjs").Issue}
 */
function issue(overrides) {
  return {
    tool: "harper",
    rule: "Rule",
    kind: "kind",
    severity: "warning",
    message: "a problem",
    start: 0,
    end: 1,
    line: 1,
    column: 2,
    matched: "x",
    suggestions: [],
    ...overrides,
  };
}

/**
 * @param {import("../../src/issues.mjs").Issue[]} issues
 * @returns {{ issues: import("../../src/issues.mjs").Issue[], counts: { harper: number, vale: number } }}
 */
function result(issues) {
  return { issues, counts: { harper: 0, vale: 0 } };
}

/**
 * @param {{
 *   stdin?: string,
 *   files?: Record<string, string>,
 *   lint?: (text: string) => Promise<{ issues: import("../../src/issues.mjs").Issue[], counts: { harper: number, vale: number } }>,
 * }} [config]
 */
function harness(config = {}) {
  const { stdin = "", files = {}, lint } = config;
  const out = /** @type {string[]} */ ([]);
  const err = /** @type {string[]} */ ([]);
  const io = {
    stdin: (async function* () { yield stdin; })(),
    stdout: (/** @type {string} */ text) => { out.push(text); },
    stderr: (/** @type {string} */ text) => { err.push(text); },
    readFile: (/** @type {string} */ path) => {
      if (!(path in files)) throw new Error(`ENOENT: ${path}`);
      return files[path];
    },
    lint: lint ?? (async () => ({ issues: [], counts: { harper: 0, vale: 0 } })),
    version: "0.0.0",
  };
  return { io, out, err };
}

describe("run", () => {
  describe("exit codes", () => {
    it("returns 0 and stays silent on clean stdin", async () => {
      const { io, out, err } = harness({ stdin: "fine" });
      assert.equal(await run([], io), 0);
      assert.equal(out.join(""), "");
      assert.equal(err.join(""), "harper: 0  vale: 0\n");
    });

    it("returns 1 when an issue is reported", async () => {
      const { io } = harness({ stdin: "x", lint: async () => result([issue()]) });
      assert.equal(await run([], io), 1);
    });

    it("returns 2 when a file cannot be read", async () => {
      const { io, err } = harness();
      assert.equal(await run(["missing.txt"], io), 2);
      assert.match(err.join(""), /ENOENT: missing\.txt/);
    });

    it("returns 2 when a tool fails", async () => {
      const { io, err } = harness({ stdin: "x", lint: async () => { throw new Error("vale blew up"); } });
      assert.equal(await run([], io), 2);
      assert.match(err.join(""), /vale blew up/);
    });

    it("returns 2 on a usage error", async () => {
      const { io, err } = harness();
      assert.equal(await run(["--nope"], io), 2);
      assert.match(err.join(""), /Unknown option/);
    });
  });

  describe("stdin", () => {
    it("lints stdin without a prefix when it is the only input", async () => {
      const { io, out } = harness({ stdin: "x", lint: async () => result([issue({ line: 2, column: 3 })]) });
      assert.equal(await run([], io), 1);
      assert.equal(out.join(""), "2:3  [harper Rule warning]  a problem\n");
    });

    it("treats an explicit - the same as empty stdin", async () => {
      const { io, out } = harness({ stdin: "x", lint: async () => result([issue()]) });
      await run(["-"], io);
      assert.equal(out.join(""), "1:2  [harper Rule warning]  a problem\n");
    });
  });

  describe("file prefixing", () => {
    it("does not prefix a single named file", async () => {
      const { io, out } = harness({ files: { "a.txt": "x" }, lint: async () => result([issue()]) });
      await run(["a.txt"], io);
      assert.equal(out.join(""), "1:2  [harper Rule warning]  a problem\n");
    });

    it("prefixes every line once there is more than one input", async () => {
      const { io, out } = harness({
        files: { "a.txt": "x", "b.txt": "y" },
        lint: async () => result([issue()]),
      });
      await run(["a.txt", "b.txt"], io);
      assert.equal(
        out.join(""),
        "a.txt:1:2  [harper Rule warning]  a problem\nb.txt:1:2  [harper Rule warning]  a problem\n",
      );
    });

    it("labels mixed stdin as <stdin> with the file prefix", async () => {
      const { io, out } = harness({
        stdin: "s",
        files: { "a.txt": "x" },
        lint: async () => result([issue({ line: 1, column: 1 })]),
      });
      await run(["-", "a.txt"], io);
      assert.equal(
        out.join(""),
        "<stdin>:1:1  [harper Rule warning]  a problem\na.txt:1:1  [harper Rule warning]  a problem\n",
      );
    });
  });

  describe("filters", () => {
    it("hides issues below the minimum severity and returns 0", async () => {
      const { io, out } = harness({ stdin: "x", lint: async () => result([issue({ severity: "suggestion" })]) });
      assert.equal(await run(["--severity", "error"], io), 0);
      assert.equal(out.join(""), "");
    });

    it("keeps only the requested tool", async () => {
      const { io, out } = harness({ stdin: "x", lint: async () => result([issue({ tool: "vale" })]) });
      assert.equal(await run(["--tool", "harper"], io), 0);
      assert.equal(out.join(""), "");
    });
  });

  describe("json", () => {
    it("wraps entries under files and names sole stdin <stdin>", async () => {
      const { io, out } = harness({ stdin: "x", lint: async () => result([issue()]) });
      assert.equal(await run(["--format", "json"], io), 1);
      assert.deepEqual(JSON.parse(out.join("")), {
        files: [{ file: "<stdin>", issues: [issue()], counts: { harper: 1, vale: 0 } }],
      });
    });

    it("lists one entry per file", async () => {
      const { io, out } = harness({
        files: { "a.txt": "x", "b.txt": "y" },
        lint: async () => result([issue()]),
      });
      await run(["--format", "json", "a.txt", "b.txt"], io);
      const body = JSON.parse(out.join(""));
      assert.deepEqual(body.files.map((/** @type {{ file: string }} */ f) => f.file), ["a.txt", "b.txt"]);
    });
  });

  describe("summary", () => {
    it("aggregates the per-tool counts across files", async () => {
      const { io, err } = harness({
        files: { "a.txt": "x", "b.txt": "y" },
        lint: async () => result([issue({ tool: "harper" }), issue({ tool: "vale" })]),
      });
      await run(["a.txt", "b.txt"], io);
      assert.equal(err.join(""), "harper: 2  vale: 2\n");
    });

    it("is silenced by --quiet", async () => {
      const { io, err } = harness({ stdin: "x" });
      await run(["--quiet"], io);
      assert.equal(err.join(""), "");
    });
  });

  describe("help and version", () => {
    it("prints usage and returns 0", async () => {
      const { io, out } = harness();
      assert.equal(await run(["--help"], io), 0);
      assert.match(out.join(""), /Usage: pasqualina/);
    });

    it("prints the version and returns 0", async () => {
      const { io, out } = harness();
      assert.equal(await run(["--version"], io), 0);
      assert.equal(out.join(""), "pasqualina 0.0.0\n");
    });
  });
});
