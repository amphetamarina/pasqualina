import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { formatJson, formatText, selectIssues, toEntry } from "../../src/cli/format.mjs";

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

/** @param {import("../../src/issues.mjs").Issue[]} issues */
function result(issues) {
  return { issues, counts: { harper: 0, vale: 0 } };
}

/** @type {{ severity: "error" | "warning" | "suggestion", tool: "harper" | "vale" | null }} */
const FILTER = { severity: "suggestion", tool: null };

describe("selectIssues", () => {
  it("keeps every severity when the minimum is suggestion", () => {
    const issues = [
      issue({ severity: "error" }),
      issue({ severity: "warning" }),
      issue({ severity: "suggestion" }),
    ];
    assert.equal(selectIssues(issues, FILTER).length, 3);
  });

  it("drops anything below the minimum severity", () => {
    const issues = [
      issue({ severity: "error" }),
      issue({ severity: "warning" }),
      issue({ severity: "suggestion" }),
    ];
    const kept = selectIssues(issues, { severity: "warning", tool: null });
    assert.deepEqual(kept.map((i) => i.severity), ["error", "warning"]);
  });

  it("keeps only the requested tool", () => {
    const issues = [issue({ tool: "harper" }), issue({ tool: "vale" })];
    const kept = selectIssues(issues, { severity: "suggestion", tool: "vale" });
    assert.deepEqual(kept.map((i) => i.tool), ["vale"]);
  });

  it("preserves the input order", () => {
    const issues = [issue({ start: 5 }), issue({ start: 1 })];
    assert.deepEqual(selectIssues(issues, FILTER), issues);
  });
});

describe("formatText", () => {
  it("renders line:column, bracket, message and suggestions", () => {
    const issues = [issue({ line: 4, column: 7, suggestions: ["the", "a"] })];
    assert.deepEqual(formatText("draft.txt", result(issues), { ...FILTER, prefix: false }), [
      '4:7  [harper Rule warning]  a problem  →  "the" | "a"',
    ]);
  });

  it("omits the suggestion arrow when there are none", () => {
    assert.deepEqual(formatText("draft.txt", result([issue()]), { ...FILTER, prefix: false }), [
      "1:2  [harper Rule warning]  a problem",
    ]);
  });

  it("prefixes each line with the file when asked", () => {
    const lines = formatText("draft.txt", result([issue()]), { ...FILTER, prefix: true });
    assert.deepEqual(lines, ["draft.txt:1:2  [harper Rule warning]  a problem"]);
  });

  it("renders nothing for a clean file", () => {
    assert.deepEqual(formatText("draft.txt", result([]), { ...FILTER, prefix: true }), []);
  });

  it("applies the severity and tool filters before rendering", () => {
    const issues = [
      issue({ tool: "harper", severity: "suggestion" }),
      issue({ tool: "vale", severity: "error", line: 3, column: 1 }),
    ];
    const lines = formatText("draft.txt", result(issues), { severity: "error", tool: "vale", prefix: false });
    assert.deepEqual(lines, ["3:1  [vale Rule error]  a problem"]);
  });
});

describe("toEntry", () => {
  it("returns the filtered issues with matching per-tool counts", () => {
    const issues = [
      issue({ tool: "harper", severity: "suggestion" }),
      issue({ tool: "harper", severity: "error" }),
      issue({ tool: "vale", severity: "error" }),
    ];
    const entry = toEntry("draft.txt", result(issues), { severity: "error", tool: null });
    assert.equal(entry.file, "draft.txt");
    assert.equal(entry.issues.length, 2);
    assert.deepEqual(entry.counts, { harper: 1, vale: 1 });
  });
});

describe("formatJson", () => {
  it("wraps the entries under files", () => {
    const entry = toEntry("<stdin>", result([issue()]), FILTER);
    assert.deepEqual(JSON.parse(formatJson([entry])), {
      files: [
        {
          file: "<stdin>",
          issues: [issue()],
          counts: { harper: 1, vale: 0 },
        },
      ],
    });
  });
});
