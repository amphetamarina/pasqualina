# Architecture

```
browser (public/index.html)
   │  POST /api/lint {text}
   ▼
server.mjs (local, 127.0.0.1:8321)   or   api/lint.mjs (Vercel function)
   │  lintAll(text)                          lint.mjs
   ├── harper.js LocalLinter.organizedLints(text)      (in-process WASM, American)
   └── spawn vale --config .vale.ini --no-global --no-exit --output=JSON --ext=.txt  ← stdin: text
   │        vale = $PASQUALINA_VALE_BIN | vendor/vale/vale | PATH
   │  both in parallel; ~0.3 s warm
   ▼
{ issues: [...], counts: {harper, vale}, ms }
```

## API contract

`POST /api/lint`, JSON body `{ "text": string }`. Max body 200 KB (413 above).
Harper always runs in American English.

Response `200`:

```json
{
  "issues": [
    {
      "tool": "harper" | "vale",
      "rule": "SpellCheck" | "BR.FalseFriends" | ...,
      "kind": "<tool-specific category>",
      "severity": "error" | "warning" | "suggestion",
      "message": "...",
      "start": 22, "end": 29,          // UTF-16 offsets into text, end exclusive
      "line": 1, "column": 23,         // 1-based
      "matched": "recieve",
      "suggestions": ["receive", "relieve"],   // "" means "remove"
      "link": "https://..."            // vale only, optional
    }
  ],
  "counts": { "harper": 1, "vale": 1 },
  "ms": 559
}
```

Issues are sorted by `start`. They **may overlap** (Harper and Vale can
flag the same span); the page cuts the text at every boundary and colours
each segment by the strongest severity covering it.

## Offset math (the part that bites)

| Source | Unit | Base | End |
|---|---|---|---|
| harper.js `span()` | UTF-16 code units, whole document | 0 | exclusive |
| Vale `Span` | characters within `Line` | 1 | inclusive |
| Browser `textarea.setSelectionRange` | UTF-16 code units | 0 | exclusive |

`lint.mjs` builds a code-point → UTF-16 table per line for Vale; Harper
needs none. Reported `column`s are code points for both tools. Everything the page sees is UTF-16, so
`setSelectionRange` and `setRangeText` are exact. Test:
`test/lint.test.mjs` asserts `text.slice(start, end) === matched` for
every issue on a fixture containing an emoji.

## Page behaviour

- Highlights use the classic "transparent textarea over a backdrop"
  trick: same font, padding and wrapping; the backdrop holds `<mark>`s.
  Scroll is mirrored. Keep the two elements' CSS identical or highlights
  drift.
- Auto-check debounces 700 ms after the last keystroke; Ctrl/Cmd+Enter
  forces a run. While a run is in flight a newer edit aborts it.
- While typing, highlights whose text no longer matches are dropped
  (positions are not shifted; the follow-up check repairs everything).
- Fix buttons call `setRangeText` and shift later issues by the length
  delta, then re-check.
- Text and the auto toggle persist in `localStorage`.

## Security posture

Personal tool. The local server binds to loopback, refuses paths outside `public/`,
caps the body, spawns the linters without a shell and with a 15 s
timeout. There is no auth; do not bind to `0.0.0.0` without adding one.
On Vercel the endpoint is public; see `07-vercel.md`.
