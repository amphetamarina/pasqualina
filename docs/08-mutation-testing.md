# 08 — Mutation Testing

Stryker mutates production code and checks that unit tests catch each change.
It runs only the pure modules that have no WASM or child_process dependency.

## Running

```bash
npm run mutate
```

This is **not** part of `npm run check`. It takes ~6 s for 234 mutants and is
meant for local verification before review, not CI gating.

## Scope

Seven files, all pure:

| File | Specs |
|---|---|
| `src/offsets.mjs` | `test/unit/offsets.test.mjs` |
| `src/issues.mjs` | `test/unit/issues.test.mjs` |
| `src/memo.mjs` | `test/unit/memo.test.mjs` |
| `src/harper/normalize.mjs` | `test/unit/harper-normalize.test.mjs` |
| `src/vale/normalize.mjs` | `test/unit/vale-normalize.test.mjs` |
| `src/http/lint-request.mjs` | `test/unit/lint-request.test.mjs` |
| `public/backdrop.js` | `test/unit/build-backdrop.test.mjs` |

Out of scope (not pure): `src/lint.mjs` (imports adapters with WASM/spawn),
`src/harper/linter.mjs` (harper.js), `src/vale/linter.mjs` (child_process),
`server.mjs`, `api/lint.mjs` (HTTP plumbing).

## Final score (234 mutants, after spec additions)

| File | Score | Killed | Survived | NoCov |
|---|---|---|---|---|
| `issues.mjs` | 100% | 9 | 0 | 0 |
| `memo.mjs` | 100% | 7 | 0 | 0 |
| `backdrop.js` | 96.77% | 59 | 2 | 0 |
| `harper/normalize.mjs` | 97.73% | 43 | 1 | 0 |
| `http/lint-request.mjs` | 97.67% | 42 | 1 | 0 |
| `offsets.mjs` | 93.94% | 25 | 2 | 0 |
| `vale/normalize.mjs` | 97.22% | 35 | 1 | 0 |
| **Overall** | **97.01%** | 220 | 7 | 0 |

## Thresholds

Set from the e54fdb8 run (97.01%, 7 equivalent mutants).

- `break`: 95 — CI would fail below this
- `low`: 97 — warning
- `high`: 97 — matches achievable ceiling (all survivors are equivalent)

## Equivalent mutants (by design, not fixed)

All 7 survivors are provably equivalent — no test can kill them because the
mutated code produces identical observable output:

| Mutant | File:Line | Why equivalent |
|---|---|---|
| `>` → `>=` in severity comparison | `backdrop.js:18` | Equal severities: first-wins vs last-wins picks a different object but `top.severity` is the same string |
| `<` → `<=` in loop bound | `backdrop.js:43` | Extra iteration: `src.slice(src.length, undefined)` = `""`, all issues already dropped |
| `insertAfter` → `true` | `harper/normalize.mjs:40` | Replace and remove are checked first; insertAfter is the only remaining variant |
| `payload !== null` → `true` | `lint-request.mjs:21` | With `payload = null`: `obj = null` (typeof null is "object"), then same fallthrough path |
| `?? text.length` → `&& text.length` | `vale/normalize.mjs:16` | For in-bounds lines `lineStarts[Line]` is a positive number; both `??` and `&&` with truthy LHS return the same value |
| `< text.length` → `<= text.length` | `offsets.mjs:12` | Extra iteration reads past string end, returns undefined ≠ `"\n"` |
| `hi = length - 1` → `length + 1` | `offsets.mjs:24` | Binary search still correct: `lineStarts[length]` is undefined, `offset < undefined` is false |

## Interpreting the report

The HTML report lands in `reports/mutation/index.html` (gitignored).

- **Killed**: test caught the mutation. Good.
- **Survived**: no test caught it. Either a real gap (add a spec) or equivalent.
- **NoCoverage**: no test imports the mutated code path. Add specs.
- **Timeout**: test took >10 s under the mutant. Rare; usually infinite loops.
