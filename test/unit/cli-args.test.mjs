import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseArgs } from "../../src/cli/args.mjs";

/** @param {string[]} argv */
function accepted(argv) {
  const options = parseArgs(argv);
  assert.ok(options.kind === "lint", JSON.stringify(options));
  return options;
}

/** @param {string[]} argv */
function rejected(argv) {
  const result = parseArgs(argv);
  assert.ok(result.kind === "error", JSON.stringify(result));
  return result.message;
}

describe("parseArgs", () => {
  it("defaults to stdin, text, all severities", () => {
    assert.deepEqual(accepted([]), {
      kind: "lint",
      files: [],
      format: "text",
      severity: "suggestion",
      tool: null,
      quiet: false,
    });
  });

  describe("files", () => {
    it("collects positional file arguments", () => {
      assert.deepEqual(accepted(["a.txt", "b.txt"]).files, ["a.txt", "b.txt"]);
    });

    it("keeps - as a file meaning stdin", () => {
      assert.deepEqual(accepted(["-"]).files, ["-"]);
    });

    it("accepts files after options", () => {
      const options = accepted(["--format", "json", "a.txt"]);
      assert.equal(options.format, "json");
      assert.deepEqual(options.files, ["a.txt"]);
    });
  });

  describe("--format", () => {
    it("accepts json in both spellings", () => {
      assert.equal(accepted(["--format=json"]).format, "json");
      assert.equal(accepted(["--format", "json"]).format, "json");
    });

    it("rejects other values", () => {
      assert.equal(rejected(["--format", "yaml"]), 'invalid --format "yaml" (expected text|json)');
    });
  });

  describe("--severity", () => {
    for (const severity of ["error", "warning", "suggestion"]) {
      it(`accepts ${severity}`, () => {
        assert.equal(accepted(["--severity", severity]).severity, severity);
      });
    }

    it("rejects other values", () => {
      assert.equal(
        rejected(["--severity", "fatal"]),
        'invalid --severity "fatal" (expected error|warning|suggestion)',
      );
    });
  });

  describe("--tool", () => {
    for (const tool of ["harper", "vale"]) {
      it(`accepts ${tool}`, () => {
        assert.equal(accepted(["--tool", tool]).tool, tool);
      });
    }

    it("rejects other values", () => {
      assert.equal(
        rejected(["--tool", "languagetool"]),
        'invalid --tool "languagetool" (expected harper|vale)',
      );
    });
  });

  it("sets quiet", () => {
    assert.equal(accepted(["--quiet"]).quiet, true);
  });

  describe("--help and --version", () => {
    it("reports help", () => {
      assert.deepEqual(parseArgs(["--help"]), { kind: "help" });
    });

    it("reports version", () => {
      assert.deepEqual(parseArgs(["--version"]), { kind: "version" });
    });

    it("lets help win over an invalid option value", () => {
      assert.deepEqual(parseArgs(["--help", "--format", "yaml"]), { kind: "help" });
    });
  });

  describe("invalid input", () => {
    it("rejects unknown options", () => {
      assert.match(rejected(["--nope"]), /Unknown option '--nope'/);
    });

    it("rejects a missing option value", () => {
      assert.match(rejected(["--format"]), /argument missing/);
    });
  });
});
