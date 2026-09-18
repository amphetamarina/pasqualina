# Pasqualina — project brief

*Written 2026-09-16.*

## What it is

A local web page where you type English. Behind it two linters run over
what you wrote and their findings are highlighted inline and listed on
the side:

1. **Harper** — grammar, spelling, and typo checking (fast, offline,
   Rust). Runs as `harper-cli lint --format json` from nixpkgs.
2. **Vale** — a prose linter driven by YAML rule files. We ship our own
   style, `BR`, that targets the mistakes Brazilian Portuguese speakers
   make in English: false friends, grammar calques, spelling shaped by
   Portuguese, punctuation and register habits.

Harper answers *"is this correct English?"*; Vale answers *"is this the
English a Brazilian would write by accident?"*. They overlap a little on
spelling, which is why `Vale.Spelling` is off in `.vale.ini`.

## Why the name

The user asked for an unpopular 19th-century British female name.
**Pasqualina** (Hebrew, "shade") turns up in English parish registers and
censuses through the 1800s but never made the common-name lists — it was
a Nonconformist / rural favourite alongside Keziah, Hephzibah, Mehetabel
and Keturah. Short enough to type as a package name.

## Goals

- Zero-friction local use: `nix-shell`, `npm install`, `npm start`, open a
  browser. Deployable to Vercel with `vercel --prod`.
- One npm dependency (`harper.js`); Vale from nixpkgs locally and as a
  pinned release binary on Vercel. No network at run time.
- Findings must map exactly onto the typed text (inline highlights that
  survive emoji and multi-line text).
- The Brazilian-mistakes style must be easy to extend: one YAML file per
  category, examples in `test/fixtures`, and a catalogue in
  `docs/03-brazilian-english-mistakes.md` that says where each rule came
  from.

## Non-goals (for now)

- Not a text editor: no formatting, no documents, no accounts.
- No LLM in the loop. Both tools are deterministic; that is the point.
- Not a general style guide (Google/Microsoft Vale packages exist for
  that and could be added with `Packages =` + `vale sync`).

## Layout

```
pasqualina/
  shell.nix            nix-shell with vale, nodejs_24, jq
  package.json         harper.js dependency; scripts start / dev / build / test
  server.mjs           local loopback server: static ./public + POST /api/lint
  api/lint.mjs         the same endpoint as a Vercel serverless function
  lint.mjs             harper.js in-process + vale binary, normalizes both outputs
  scripts/fetch-vale.mjs  downloads the pinned Vale release (Vercel build step)
  vercel.json          static public/ + api function with bundled files
  bin/pasqualina.mjs    CLI: lint files or stdin through lint.mjs
  bin/harper-rules.mjs  regenerates docs/appendix-harper-rules.md
  bin/check-styles.mjs  catches YAML-key-too-long and broken rule files
  public/index.html    the page (single file, no build step)
  .vale.ini            Vale config used by the server
  styles/BR/*.yml      the Brazilian-mistakes Vale style (13 rules: Age, FalseFriends,
                       FalseFriendsWords, Collocations, Prepositions, Uncountable, Syntax,
                       Spelling, Numbers, Capitalization, Titles, Register, WordOrder)
  styles/config/vocabularies/Pasqualina/   accept/reject word lists
  test/                node:test suites + fixtures
  docs/                everything we learned; read before changing things
```

## Docs index

- `01-harper.md` — how harper-cli behaves, verified by running it.
- `02-vale.md` — Vale config, stdin, JSON, and rule authoring.
- `03-brazilian-english-mistakes.md` — the catalogue that drives the style.
- `04-architecture.md` — request flow, API contract, offset math.
- `05-decisions.md` — decision log.
- `06-roadmap.md` — ideas that were considered and parked.
- `07-vercel.md` — how the Vercel deployment is put together and how to ship it.
- `appendix-harper-rules.md` — every Harper rule with its default.
