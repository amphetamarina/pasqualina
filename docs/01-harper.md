# Harper — hands-on notes

*Verified 2026-09-16 against `harper-cli 2.3.0` from nixpkgs. **Since the
Vercel move later that day, Pasqualina runs Harper through the `harper.js`
npm package (2.10.0) instead of `harper-cli`**; the CLI notes below are
kept because the JSON shape and behaviour are the reference for what the
WASM build returns. See "harper.js in practice" at the end.*

## What Harper is

Harper (https://writewithharper.com, https://github.com/Automattic/harper)
is a grammar checker written in Rust by Automattic. It runs entirely
offline, starts in milliseconds and ships as a language server
(`harper-ls`), a CLI (`harper-cli`), a WASM package (`harper.js`), and
editor/browser extensions. It has a curated dictionary, a rule engine with
several hundred hand-written rules (see `appendix-harper-rules.md`), and
dialect awareness.

## CLI surface we rely on

```
harper-cli lint [OPTIONS] [INPUTS]...
  --format json|compact|default    JSON is what the server consumes
  -d, --dialect <DIALECT>          us (default) | british | australian | canadian
  --only <RULES> / --ignore <RULES>
  -u, --user-dict-path             default ~/.config/harper-ls/dictionary.txt
  -f, --file-dict-path             default ~/.local/share/harper-ls/file_dictionaries/
  -o, --keep-overlapping-lints     by default overlapping lints are dropped
  --weirpacks <FILE>               extra rule packs (Weir DSL, see below)
```

If no input is given the text is read from **stdin**. Other useful
subcommands: `config` (every rule + default + description as JSON — that
is how `appendix-harper-rules.md` is built), `parse`, `spans`, `metadata
<word>`, `words`, `test <weir-file>`.

## Behaviour observed

- **Exit code is 1 when lints were found**, 0 when clean, with `Error:
  Lints were found` printed to stderr. The server ignores the code and
  parses stdout.
- stderr also gets `Note: There is no user dictionary at ...` when the
  user dictionary file is absent. Harmless. Create the file (one word per
  line) to silence it and to whitelist words.
- Time per call on this machine: **~0.5 s** for a short text (dictionary
  load dominates). Vale is ~0.1 s. So a debounce of ~700 ms in the page is
  right; anything more aggressive just queues work.
- `--dialect british` accepts `organise`, `colour`; the default flags them.
  Pasqualina always passes `--dialect american` (decision 2026-09-16 in
  `05-decisions.md`); other dialects are not exposed.

## JSON output shape (`--format json`)

```json
[
  {
    "file": "<stdin>",
    "lint_count": 2,
    "lints": [
      {
        "rule": "SpellCheck",
        "kind": "Spelling",
        "span": { "char_start": 76, "char_end": 83 },
        "line": 1,
        "column": 77,
        "message": "Did you mean to spell `recieve` this way?",
        "priority": 63,
        "suggestions": [
          "Replace with: “receive”",
          "Replace with: “relieve”"
        ],
        "matched_text": "recieve"
      }
    ]
  }
]
```

Details that matter:

- `span.char_start` / `char_end` are **0-based Unicode scalar (code
  point) offsets into the whole document**, end exclusive. Not bytes,
  not UTF-16 units. `lint.mjs` converts them to UTF-16 for the browser
  (`test/lint.test.mjs` covers a 🙂 before a misspelling).
- `line` / `column` are 1-based.
- `suggestions` are human strings, not structured. Formats seen:
  `Replace with: “x”` (curly quotes) and `Remove ...`. `lint.mjs` parses
  the first into a replacement and the second into an empty replacement;
  anything else is dropped from the fix buttons but stays in the message.
- `kind` values seen so far: `Spelling`, `Typo`, `Grammar`, `Formatting`,
  `Capitalization`, `Punctuation`, `Agreement`, `Repetition`,
  `Readability`, `Style`, `Usage`, `Miscellaneous`, `Enhancement`,
  `WordChoice`, `Redundancy`, `Regionalism`, `Nonstandard`, `Eggcorn`,
  `Malapropism`, `BoundaryError`. The server maps them to
  error/warning/suggestion in `HARPER_SEVERITY`; unknown kinds become
  warnings.
- `priority`: lower is more important (Harper uses it to order
  overlapping lints). Not used by the page yet.
- Lints are **not sorted** by position in the output; the server sorts.

## Things Harper gets wrong that Vale must cover

- `informations` → Harper suggests `in formations` (SplitWords) instead
  of "information is uncountable". Vale's `BR.Uncountable` rule wins here.
- Real-word errors (`pretend` for `intend`, `actually` for `currently`)
  are, by definition, correct English words; Harper is silent. That is
  the whole reason Vale is in the stack.
- French/double spaces are flagged as `NoFrenchSpaces` (Formatting) —
  useful but noisy after `applyFix` edits; it maps to `suggestion`.

## Rule configuration

- Every rule name in `appendix-harper-rules.md` can be passed to
  `--only`/`--ignore` (comma-separated). Defaults are `true` except a
  handful (`AvoidContractions`, `BoringWords`, `NoOxfordComma`,
  `PossessiveNoun`, `SpelledNumbers`, `AnotherThinkComing`, `ViciousCycle`
  variants).
- `harper-ls` reads the same settings from the editor config; the CLI
  has no config file, so Pasqualina would pass `--ignore` explicitly if we
  ever want to mute rules (see roadmap).
- **Weir**: Harper's own rule DSL (`--weirpacks`, `harper-cli test`).
  Worth a look if a Brazilian-mistake rule needs part-of-speech context
  that Vale's regexes cannot express. Parked, see `06-roadmap.md`.

## harper.js (the browser alternative)

Harper is also published as `harper.js` on npm: a WASM build with
`LocalLinter` (same thread) and `WorkerLinter` (web worker), plus a
`binaryInlined` variant that embeds the WASM so a single ESM file works
from a CDN. That would make the Harper half of Pasqualina run in the browser
with no server round trip and no 0.5 s spawn. We did **not** go that way
for v1 because (a) Vale needs a process anyway, (b) nixpkgs pins one
`harper-core` version for CLI and LS, which keeps results consistent with
what an editor would show, and (c) no npm. Details and the ESM snippet
are in the research report section of `06-roadmap.md`.

## Version gap

nixpkgs ships **2.3.0**; upstream is at **2.10.0** (2026-09-09) and adds
rules constantly. All Harper components are version-locked (harper.js,
harper-core, harper-ls). `harper-cli` is not on crates.io; it comes from
the git repo or release binaries. `lint --format json` is **undocumented**
upstream (the CLI README still lists machine-readable output as a future
feature); the shape above comes from running the binary and from
`harper-cli/src/lint.rs`, so re-check it after any upgrade.

## What Harper 2.3.0 catches among the Brazilian calques

Run on 2026-09-16 (sentences in `docs/03-brazilian-english-mistakes.md`):
flagged — do a mistake (`DoMistake`), since 3 years (`SinceDuration`),
arrived to (`ArriveTo`), discussed about (`Discuss`), more easy / more
better (`MoreAdjective`, `AdjectiveDoubleDegree`), lowercase i
(`CapitalizePersonalPronouns`), lowercase english/monday (as
`SpellCheck`), plural uncountables (as `SpellCheck`/`SplitWords`, with
wrong suggestions). **Not** flagged despite a rule existing: "I am agree
with you" (`IAmAgreement`), "Close the light" (`OpenTheLight`), "Give a
look" (`HaveTakeALook`). Everything else in the calque list is silent,
which is what the Vale style covers.

## harper.js in practice (what `lint.mjs` does now)

- `new LocalLinter({ binary, dialect: Dialect.American })` then
  `await setup()`; one instance is cached per process.
- `linter.lint(text)` returns lints that expose only the **kind**
  (`lint_kind()`), not the rule name. `linter.organizedLints(text)`
  returns `{ RuleName: Lint[] }` for all 885 rules, so that is what we
  call; empty arrays are skipped.
- `span()` gives **UTF-16 offsets** (verified with an emoji before the
  match), so no conversion is needed for the browser.
- Suggestions: `s.kind()` is `SuggestionKind.Replace`, `Remove` or
  `InsertAfter`; `get_replacement_text()` holds the text.
- 2.10.0 still does not flag "I am agree with you" or "Close the light",
  so the Vale rules for those stay.
- `bin/harper-rules` regenerates the appendix from
  `getLintDescriptions()` + `getDefaultLintConfig()`.

## License

Harper is Apache-2.0 (`nix eval nixpkgs#harper.meta.license` and the repo).
