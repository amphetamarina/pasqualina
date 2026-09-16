# Vale — hands-on notes

*Verified 2026-09-16 against `vale 3.14.2` from nixpkgs.*

## What Vale is

Vale (https://vale.sh) is a syntax-aware prose linter. It has no built-in
opinion beyond a tiny `Vale` style (spelling, repetition, terms); all real
checks come from **styles**: directories of YAML rule files. Rules are
mostly regex-driven, which is exactly what a false-friend / calque
catalogue needs.

## Configuration (`.vale.ini`)

```ini
StylesPath = styles          # where style directories live
MinAlertLevel = suggestion   # suggestion | warning | error
Vocab = Pasqualina               # styles/config/vocabularies/Pasqualina/{accept,reject}.txt

[*]                          # glob over file names; stdin gets "stdin.<ext>"
BasedOnStyles = Vale, BR
Vale.Spelling = NO           # disable one rule of a style
```

- Vale looks upward from the cwd for `.vale.ini`, then falls back to
  `~/.vale.ini` / `~/.config/vale/.vale.ini`. The server passes
  `--config` and `--no-global` so only the project config applies.
- `[*.md]`-style sections let different formats use different styles.
  We only have `[*]`.
- `RuleName = YES|NO|suggestion|warning|error` after `BasedOnStyles`
  turns rules on/off or changes their level.
- `Vocab`: `accept.txt` lines are never flagged by `Vale.Terms`/
  `Vale.Spelling` (and are added as exceptions to every rule's
  `exceptions`); `reject.txt` lines are always flagged as errors.

## Linting stdin

```
vale --config .vale.ini --no-global --no-exit --output=JSON --ext=.txt < text
```

- `--ext` picks the format for stdin. `.txt` = plain text (no Markdown
  parsing, so `*` and `_` are not markup). Output key is `stdin.txt`.
- Passing a literal `-` as the input **breaks it** (returns `{}`). Just
  redirect stdin.
- `--no-exit` makes the exit code 0 even with errors; otherwise errors
  give exit 1. The server uses `--no-exit` and treats any non-zero as a
  real failure (bad YAML in a rule file, for example).
- Clean input prints `{}`.
- `--ignore-syntax` lints line by line ignoring the format; not needed
  for `.txt`.
- Time per call: ~0.1 s.

## JSON output shape

```json
{
  "stdin.txt": [
    {
      "Action": { "Name": "replace", "Params": ["intend to"] },
      "Span": [23, 32],
      "Check": "BR.FalseFriends",
      "Description": "",
      "Link": "",
      "Message": "'intend to' is a false friend; did you mean 'pretend to'?",
      "Severity": "warning",
      "Match": "pretend to",
      "Line": 1
    }
  ]
}
```

- `Line` is 1-based. `Span` is `[startCol, endCol]`, **1-based, inclusive,
  within the line, counted in characters**. `lint.mjs` converts to
  absolute UTF-16 offsets.
- `Action.Name` is whatever the rule's `action:` says (`replace`,
  `remove`, `edit`, `suggest`, or empty). For `substitution` with
  `action: {name: replace}` Vale fills `Params` with the replacement.
- `Check` is `Style.RuleFile` (file name without `.yml`).
- `Description` and `Link` come from the rule file's `description:` and
  `link:` keys.

## Writing rules

A style is a directory under `StylesPath`; each `*.yml` in it is one rule.
Names are `Style.File`. Keys shared by all rule types: `extends`,
`message`, `level` (suggestion|warning|error), `scope`, `link`,
`description`, `action`.

### `existence` — flag that a pattern exists

```yaml
extends: existence
message: "Age is expressed with 'be': 'I am 30 years old'."
level: error
ignorecase: true
nonword: true          # tokens are raw regex, not words
tokens:
  - '\b\w+\s+(?:have|has|had)\s+\d+\s+years?(?:\s+old)?\b'
```

Without `nonword: true` every token is wrapped in `\b...\b` and treated
as a word; with it you write the regex yourself. `raw:` lets you prepend
an unescaped regex fragment. `exceptions:` is a list of words that never
match. Message gets `%s` = the matched text.

### `substitution` — flag X, suggest Y

```yaml
extends: substitution
message: "'%s' is a false friend; did you mean '%s'?"   # 1st %s = suggestion, 2nd = match
level: warning
ignorecase: true
action:
  name: replace          # makes Vale emit Action.Params = [replacement] → fix button
swap:
  pretend to: intend to
  actually: currently
  '(?:make|made|making) a question': ask a question   # regex keys allowed
```

Verified: with `message: "'%s' ... '%s'"` the **first `%s` is the
replacement, the second the matched text** (counter-intuitive; the sample
run printed `'intend to' is a false friend; did you mean 'pretend to'`).
Keys may be regexes; values may reference groups with `$1`. Keys are
wrapped in `\b` unless `nonword: true`. Matching is case-insensitive only
with `ignorecase: true`; Vale then reports the original casing in
`Match`.

Gotcha: a `swap` value containing `%` or `:` needs quoting; a key
starting with `(` must be quoted too.

### Other types (not used yet)

`occurrence` (count of a pattern ≥/≤ N per scope — e.g. too many
`very`), `repetition` (doubled words), `conditional` (if A appears, B
must too — acronym definitions), `consistency` (pick one of two
spellings), `capitalization` (headings), `metric` (readability),
`spelling` (Hunspell dictionaries; off here), `sequence` (part-of-speech
patterns via NLP tags — potentially useful for calques, Vale docs mark it
experimental), `script` (Tengo scripts for anything else).

### Scopes

For `.txt` everything is `text`. For Markdown/HTML you can restrict rules
to `heading`, `paragraph`, `list`, `code`, etc. Not relevant yet.

## Packages

`Packages = write-good, proselint, Google, Microsoft, alex, Readability`
in `.vale.ini` + `vale sync` downloads them into `styles/`. Needs network,
which is why it is **not** part of the default setup; see roadmap. Vale's
own `Vale` style is built in and needs no sync.

## Gotchas hit while writing the BR style (all verified on 3.14.2)

- **YAML implicit keys are limited to 1024 characters.** A longer
  `swap` key fails with the useless `could not find expected ':'`.
  `bin/check-styles` reports offenders; split long alternations into
  several keys.
- **`matchcase` is rejected** by 3.14.2 (`has invalid keys: 'matchcase'`)
  even though the current docs list it. Replacements therefore come back
  in the casing written in the rule; the page applies them verbatim.
- **Regex engine is not RE2.** Lookahead `(?=…)`, lookbehind `(?<=…)`
  and `(?m)` all work (Vale uses a .NET-style engine for rules). This
  matters for sentence-start anchors: `(?:^|[.!?]\s+)` swallows the
  previous sentence's period and newline, so the alert lands on the
  **previous line**. Use `(?m)(?:^|(?<=[.!?]\s))` instead.
- A literal `-` argument for stdin returns `{}`; just redirect stdin.
- JSON alerts also carry a `Suggestions` array (same content as
  `Action.Params` for `replace`); `lint.mjs` reads `Action`.
- With `ignorecase: true` the `Match` keeps the original casing and
  `$n` groups copy it, so "Actually I live" → "currently I live". Fine
  for the fix button, slightly off for sentence starts.
- `BasedOnStyles` in a later matching section **replaces** earlier
  ones; per-rule toggles accumulate.
- Exit code 2 means Vale itself failed (bad rule file). `lint.mjs`
  surfaces the stderr JSON so the page shows which file/line.

## Vale and non-ASCII

Vale counts `Span` columns in characters, so `ç`, `ã` and emoji do not
break offsets. Regex `\w` in Go's RE2 is ASCII-only, so `\w+` will not
match `coração`; use `\p{L}+` when a rule must span Portuguese letters.
