// Every fixture under test/fixtures/br/<Rule>.txt must trigger BR.<Rule>
// on every non-empty line; clean.txt must trigger no BR rule at all.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { runVale } from "../src/lint.mjs";

const dir = new URL("./fixtures/br/", import.meta.url);
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".txt"));

for (const file of files) {
  const rule = "BR." + path.basename(file, ".txt");
  const text = fs.readFileSync(new URL(file, dir), "utf8");
  const lines = text.split("\n");

  if (file === "clean.txt") {
    test("clean.txt triggers no BR rule (except FalseFriendsWords)", async () => {
      // FalseFriendsWords flags legitimate English by design (suggestion level), so it is exempt here.
      const issues = (await runVale(text)).filter((i) => i.rule.startsWith("BR.") && i.rule !== "BR.FalseFriendsWords");
      assert.deepEqual(issues.map((i) => `${i.line}: ${i.rule} '${i.matched}'`), []);
    });
    continue;
  }

  test(`${rule} fires on every line of ${file}`, async () => {
    const issues = await runVale(text);
    const missing = /** @type {string[]} */ ([]);
    lines.forEach((line, idx) => {
      if (!line.trim()) return;
      if (!issues.some((i) => i.rule === rule && i.line === idx + 1)) missing.push(`${idx + 1}: ${line}`);
    });
    assert.deepEqual(missing, [], `lines not flagged by ${rule}`);
  });
}
