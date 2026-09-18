#!/usr/bin/env node
// Regenerate docs/appendix-harper-rules.md from the installed harper.js.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getHarper } from "../src/lint.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const version = JSON.parse(fs.readFileSync(path.join(root, "node_modules/harper.js/package.json"), "utf8")).version;
const linter = await getHarper();
const [defaults, descriptions] = await Promise.all([linter.getDefaultLintConfig(), linter.getLintDescriptions()]);
const rows = Object.keys(descriptions).sort().map((r) =>
  `| \`${r}\` | ${defaults[r] ?? ""} | ${String(descriptions[r]).replace(/\|/g, "\\|").replace(/\n/g, " ")} |`);
const out = [
  `# Harper rules (harper.js ${version}, \`getLintDescriptions()\`)`, "",
  "Generated from harper.js; regenerate with `bin/harper-rules`. Rules with default `false` are opt-in.", "",
  "| Rule | Default | Description |", "|---|---|---|", ...rows, "",
].join("\n");
fs.writeFileSync(path.join(root, "docs/appendix-harper-rules.md"), out);
console.log(`wrote docs/appendix-harper-rules.md (${rows.length} rules)`);
