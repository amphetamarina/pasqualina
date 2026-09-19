#!/usr/bin/env node
import fs from "node:fs";
import { run } from "../src/cli/run.mjs";
import { lintAll } from "../src/lint.mjs";

const pkg = JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"));

process.stdout.on("error", (error) => {
  if (error.code === "EPIPE") process.exit(0);
  throw error;
});

process.exitCode = await run(process.argv.slice(2), {
  stdin: process.stdin,
  stdout: (text) => process.stdout.write(text),
  stderr: (text) => process.stderr.write(text),
  readFile: (path) => fs.readFileSync(path, "utf8"),
  lint: lintAll,
  version: pkg.version,
});
