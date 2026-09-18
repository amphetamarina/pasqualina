#!/usr/bin/env node
// Lint a file (or stdin) through Harper + Vale from the terminal.
//   bin/lint draft.txt            bin/lint --json draft.txt
//   echo "I have 30 years" | bin/lint
import fs from "node:fs";
import { lintAll } from "../src/lint.mjs";

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const files = args.filter((a) => !a.startsWith("--"));

const text = files.length ? fs.readFileSync(files[0], "utf8") : fs.readFileSync(0, "utf8");
const { issues, counts } = await lintAll(text);
if (asJson) { console.log(JSON.stringify({ issues, counts }, null, 2)); process.exit(issues.length ? 1 : 0); }
for (const i of issues) {
  const sug = i.suggestions.length ? `  →  ${i.suggestions.map((s) => JSON.stringify(s)).join(" | ")}` : "";
  console.log(`${i.line}:${i.column}  [${i.tool} ${i.rule} ${i.severity}]  ${i.message}${sug}`);
}
console.error(`harper: ${counts.harper}  vale: ${counts.vale}`);
process.exit(issues.length ? 1 : 0);
