# Decision log

Newest first. One entry per decision that someone might later want to
undo; say what was chosen and what it was chosen over.

## 2026-09-16 — Harper via harper.js, Vale as a bundled binary (Vercel)
The user asked to run the app on Vercel, where nix binaries do not exist.
Harper moved to the `harper.js` npm package (WASM, in-process), used
locally too so results match; this also upgraded Harper 2.3.0 → 2.10.0.
Vale has no JS port, so the build step downloads the pinned Linux release
(checksum verified) and the function bundles it. Alternatives rejected:
running Harper in the browser (would split the pipeline), porting the BR
rules to JS (loses Vale), the vale-cli/Harper Vale package (loses spell
check). The "no npm" goal from the brief is retired.

## 2026-09-16 — Project renamed Zillah → Pasqualina
User request; the Vale vocab folder and localStorage keys followed.

## 2026-09-16 — American English only
The first build exposed Harper's four dialects in the page and CLI. The
user asked to remove everything but American, so `lint.mjs` hard-codes
`--dialect american` and the selector, `--dialect` flag and API field are
gone. To bring another dialect back, change the constant in `lint.mjs`.

## 2026-09-16 — Node stdlib server instead of harper.js in the browser
*(Superseded the same day by the harper.js decision above.)* Vale must run
as a process anyway, so a server exists regardless. Using `harper-cli`
from nixpkgs kept the toolchain reproducible with no npm.

## 2026-09-16 — Node over Python for the server
Both are dependency-free options. Node 24 is already the house runtime in
`~/Projects/shell.nix`, `node --watch` gives a reloading dev server, and
`node:test` gives tests. Nothing else in the choice matters.

## 2026-09-16 — Vale reads stdin as `.txt`, not `.md`
Plain text means `*`, `_`, `#` and `>` in what the user types are just
characters. If Markdown editing is ever wanted, switch `--ext` and let
scopes (`heading`, `code`) take effect.

## 2026-09-16 — `Vale.Spelling = NO`
Harper's spell check is better (real suggestions, dialect aware) and
double-reporting every typo is noise. `Vale.Terms` + the `Pasqualina` vocab
stay on for project words.

## 2026-09-16 — One YAML file per mistake category, not one huge substitution
`BR.FalseFriends`, `BR.Calques`, `BR.Uncountable`, ... give the page a
meaningful rule name per finding, let each file carry its own message
template and level, and can be switched off individually in `.vale.ini`.

## 2026-09-16 — Severity mapping
Vale levels are used as-is. Harper `kind`s are mapped in `lint.mjs`
(`Spelling/Grammar/Typo/Agreement/BoundaryError` → error,
`Formatting/Readability/Style/Miscellaneous/...` → suggestion, rest →
warning). Arbitrary but visible in one table.

## 2026-09-16 — No initial commit
The user asked for `git init`; the tree is staged but not committed so the
first commit message is theirs.
