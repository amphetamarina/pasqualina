import { describe, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ESLint } from "eslint";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const eslint = new ESLint({ cwd: ROOT });

/** @param {string} from */
const snippet = (from) => `import { x } from "${from}";\nexport const y = x;\n`;

/**
 * @param {string} file
 * @param {string} source
 * @returns {Promise<number>}
 */
async function countErrors(file, source) {
  const [result] = await eslint.lintText(source, { filePath: path.join(ROOT, file) });
  return result.messages.filter((message) => message.severity === 2).length;
}

/** @type {[string, string, number][]} */
const CASES = [
  ["src/cli/x.mjs", "../harper/linter.mjs", 1],
  ["src/cli/x.mjs", "../lint.mjs", 0],
  ["src/cli/x.mjs", "../issues.mjs", 0],
  ["src/harper/x.mjs", "../cli/run.mjs", 1],
  ["src/harper/x.mjs", "../vale/linter.mjs", 1],
  ["src/harper/x.mjs", "../offsets.mjs", 0],
  ["src/vale/x.mjs", "../harper/normalize.mjs", 1],
  ["src/vale/x.mjs", "../offsets.mjs", 0],
];

describe("eslint import boundaries", () => {
  for (const [file, from, errors] of CASES) {
    it(`${file} importing ${from} reports ${errors} error(s)`, async () => {
      assert.equal(await countErrors(file, snippet(from)), errors);
    });
  }
});
