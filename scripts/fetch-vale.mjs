// Downloads the pinned Vale release into vendor/vale/ (used by the Vercel
// build; locally nix-shell provides vale on PATH, so this is optional).
// Verifies the SHA-256 published in the release's checksums file.
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const VALE_VERSION = "3.14.2";
const ASSET = `vale_${VALE_VERSION}_Linux_64-bit.tar.gz`;
const URL_ = `https://github.com/errata-ai/vale/releases/download/v${VALE_VERSION}/${ASSET}`;
// From vale_3.14.2_checksums.txt on the GitHub release (verified 2026-09-16).
const SHA256 = "469cf88ec58a374dca14b2564c4391d2c9a1c632210aa0b642758b794082e05f";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "vendor", "vale");
const bin = path.join(dir, "vale");
const stamp = path.join(dir, "VERSION");

if (fs.existsSync(bin) && fs.existsSync(stamp) && fs.readFileSync(stamp, "utf8").trim() === VALE_VERSION) {
  console.log(`vale ${VALE_VERSION} already in vendor/vale`);
  process.exit(0);
}
fs.mkdirSync(dir, { recursive: true });
console.log(`downloading ${URL_}`);
const res = await fetch(URL_);
if (!res.ok) { console.error(`download failed: ${res.status}`); process.exit(1); }
const buf = Buffer.from(await res.arrayBuffer());
const sum = createHash("sha256").update(buf).digest("hex");
if (sum !== SHA256) { console.error(`checksum mismatch: got ${sum}, expected ${SHA256}`); process.exit(1); }
const tgz = path.join(dir, ASSET);
fs.writeFileSync(tgz, buf);
const tar = spawnSync("tar", ["-xzf", tgz, "-C", dir, "vale"], { stdio: "inherit" });
if (tar.status !== 0) { console.error("tar failed"); process.exit(1); }
fs.unlinkSync(tgz);
fs.chmodSync(bin, 0o755);
fs.writeFileSync(stamp, VALE_VERSION + "\n");
console.log(`vale ${VALE_VERSION} -> ${bin}`);
