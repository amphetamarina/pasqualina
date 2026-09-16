# Roadmap and parked ideas

*2026-09-16.* Things considered during the initial build and deliberately
not done, with enough detail to pick them up later.

## Upgrade Harper (2.3.0 in nixpkgs → 2.10.0 upstream)

Harper adds rules "daily"; the nixpkgs build is ~7 minor versions behind.
Two observed gaps in 2.3.0: `IAmAgreement` did not fire on "I am agree
with you" and `OpenTheLight` did not fire on "Close the light". Options:
override the nixpkgs derivation to a newer `rev`, or take `harper` from a
newer nixpkgs pin (the pattern in `~/Projects/shell.nix` for
`nixos-unstable`). After upgrading, re-run the calque sentences in
`docs/01-harper.md` and drop Vale rules that Harper now covers.

## harper.js in the browser

Would remove the ~0.5 s spawn per check for the Harper half. Snippet from
the official example (the jsdelivr `/npm/` path serves the same files):

```html
<script type="module">
  import { binaryInlined } from 'https://unpkg.com/harper.js@2.10.0/dist/binaryInlined.js';
  import { WorkerLinter } from 'https://unpkg.com/harper.js@2.10.0/dist/index.js';
  const linter = new WorkerLinter({ binary: binaryInlined });
  const lints = await linter.lint(textarea.value);
  for (const l of lints) console.log(l.span().start, l.span().end, l.message(), l.suggestions());
</script>
```

Node variant: `new LocalLinter({ binary })` from `harper.js/binary`. API
is marked "early access, not stable". Would need npm or a vendored copy
(~75 MB unpacked package; `binaryInlined.js` is the single-file build).
Trade-off: results may drift from the editor's `harper-ls`.

## Vale packages

`Packages = write-good, proselint` in `.vale.ini` + `vale sync` (network)
would add weasel words, passive voice, clichés, hedging — relevant to the
register section. `Packages = Harper` (vale-cli/Harper) is a Vale port of
455 Harper rules; it could replace `harper-cli` entirely if the spawn
cost or the version gap ever matters, at the price of losing spell check.

## Vale `sequence` rules

Vale's part-of-speech `sequence` check could express calques that regex
cannot ("adjective after noun" in general, "very + past participle").
Marked experimental in the Vale docs.

## Harper Weir packs

Harper's own rule DSL (`--weirpacks`, `harper-cli test file.weir`). Could
host the Brazilian rules with POS context inside Harper instead of Vale.
Not explored.

## Page

- Show Harper `priority` and let the user mute a rule for the session
  (server would pass `--ignore`).
- Per-rule toggles that write `.vale.ini` overrides.
- Markdown mode: `--ext=.md` and Vale scopes.
- Keyboard navigation between issues (F8-style).
- A "why" panel that links each Vale finding to its row in
  `docs/03-brazilian-english-mistakes.md`.

## Research log (URLs)

Vale: https://docs.vale.sh/topics/.vale.ini.md · /topics/cli.md ·
/topics/styles.md · /topics/scopes.md · /topics/actions.md ·
/checks/existence.md · /checks/substitution.md · /checks/spelling.md ·
/checks/occurrence.md · /checks/conditional.md · /checks/consistency.md ·
/checks/repetition.md · /checks/capitalization.md · /checks/metric.md ·
/checks/readability.md · /checks/sequence.md · /checks/script.md ·
/fixes/replace.md · /keys/vocabularies.md · /keys/packages.md ·
/keys/basedonstyles.md · /formats/text.md ·
https://raw.githubusercontent.com/errata-ai/vale/v3/internal/core/alert.go ·
https://github.com/vale-cli/packages · https://github.com/vale-cli/Harper

Harper: https://github.com/Automattic/harper · /releases ·
https://writewithharper.com/docs/about · /docs/rules ·
/docs/integrations/language-server · /docs/harperjs/introduction ·
/docs/harperjs/linting · /docs/harperjs/node · /docs/harperjs/CDN ·
/docs/harperjs/configurerules ·
https://github.com/Automattic/harper/blob/master/harper-cli/src/lint.rs ·
https://github.com/Automattic/harper/blob/master/packages/harper.js/src/Linter.ts ·
https://www.npmjs.com/package/harper.js · https://gribnau.dev/posts/harper-cli/

Brazilian errors: https://onlineteachersuk.com/false-friends-english-portuguese/ ·
https://onlineteachersuk.com/40-most-common-mistakes-english-portuguese/ ·
https://reallifeglobal.com/the-17-most-dangerous-brazilian-false-cognate-errors-in-english/ ·
https://www.londonschool.com/blog/from-brazilian-to-english-or-how-not-to-speak-brazinglish/ ·
https://www.londonschool.com/blog/from-brazinglish-to-english-part-2/ ·
https://www.italki.com/en/article/1073/7-common-mistakes-that-brazilians-make-in-english ·
https://www.italki.com/en/article/1228/5-common-english-errors-made-by-portuguese-speakers ·
https://heatherhughes.co.uk/top-10-mistakes-that-portuguese-speakers-make-in-advanced-english/ ·
https://brazilusatranslations.com/tools/portuguese-english-false-friends/ ·
https://learn-portuguese.org/false-friends-portuguese-english ·
https://portuguesepedia.com/english-portuguese-false-friends/ ·
https://www.practiceportuguese.com/learning-notes/false-cognates/ ·
https://blogs.transparent.com/portuguese/false-friends-in-portuguese-and-english/ ·
https://www.aje.com/arc/editing-tip-portuguese-english-false-cognates ·
https://www.speakingbrazilian.com/false-friends-portuguese-english/ ·
https://migaku.com/blog/language-fun/portuguese-false-friends ·
https://languagesnaps.com/english/learning-tips-esl/false-friends-brazilian-portuguese/ ·
https://ai.glossika.com/blog/false-friends-between-portuguese-and-english ·
https://www.internationalschooltutors.de/English/advice/language/differences/portuguese.html ·
https://elon.io/grammar/portuguese-brazil/errors/false-friends-english ·
https://elon.io/grammar/portuguese-brazil/spelling/capitalization-rules ·
https://www.scielo.br/j/clin/a/zcs47Q4bsW6yk7D86XQCVss/?lang=en ·
https://pmc.ncbi.nlm.nih.gov/articles/PMC5175292/ ·
https://blog.gymglish.com/2021/06/29/10-grammar-mistakes-english-portuguese-make ·
https://www.cambridge.org/elt/blog/wp-content/uploads/2020/03/Portuguese.pdf ·
https://github.com/languagetool-org/languagetool/blob/master/languagetool-core/src/main/resources/org/languagetool/rules/false-friends.xml
