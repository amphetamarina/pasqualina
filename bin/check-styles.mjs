#!/usr/bin/env node
// Sanity checks for styles/BR/*.yml that Vale's own errors make hard to read:
//  - YAML implicit keys longer than 1024 chars ("could not find expected ':'")
//  - Vale can load the config (lints an empty string)
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "styles", "BR");
let bad = 0;
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".yml"))) {
  const lines = fs.readFileSync(path.join(dir, f), "utf8").split("\n");
  lines.forEach((l, i) => {
    const m = /^ {2}'((?:[^']|'')*)':/.exec(l) || /^ {2}([^'#][^:]*):/.exec(l);
    if (m && m[1].length > 1024) { bad++; console.log(`${f}:${i + 1}: key is ${m[1].length} chars (max 1024)`); }
  });
}
const r = spawnSync("vale", ["--config", path.join(root, ".vale.ini"), "--no-global", "--no-exit", "--output=JSON", "--ext=.txt"], { input: "ok\n", encoding: "utf8" });
if (r.status !== 0) { bad++; console.log(r.stderr || r.stdout); }
console.log(bad ? `${bad} problem(s)` : "styles OK");
process.exit(bad ? 1 : 0);
