# Running Pasqualina on Vercel

*Set up 2026-09-16. Deploy itself needs your Vercel login, so it was not
run from this session; everything up to that point was verified locally.*

## Shape of the deployment

- `public/index.html` is served as a static site (`outputDirectory:
  public`, no framework).
- `api/lint.mjs` is a Node serverless function with the same contract as
  the local server (`POST /api/lint {text}`); both call `lintAll()` in
  `lint.mjs`.
- **Harper** runs in-process through the `harper.js` npm package (WASM).
  Same engine locally and on Vercel, so results match.
- **Vale** is a Go binary. `npm run build` (the Vercel `buildCommand`)
  runs `scripts/fetch-vale.mjs`, which downloads the pinned release
  (3.14.2, SHA-256 checked) into `vendor/vale/`. `vercel.json` lists
  `vendor/vale/**`, `styles/**`, `.vale.ini` and the Harper `.wasm` in
  `includeFiles` so they ship inside the function bundle. At runtime the
  binary is copied to the temp dir and `chmod`ed once per cold start,
  because the deployment filesystem is read-only and may drop the exec bit.
- `engines.node` is `22.x` (Vercel's supported runtime); locally Node 24
  from nix works the same.

## First deploy

```
cd ~/Projects/pasqualina
nix-shell ~/Projects/shell.nix     # provides `vercel` (pinned npx wrapper)
vercel login
vercel link                        # or just `vercel`, which links interactively
vercel build                       # local build; inspect .vercel/output/functions/api/lint.func/
vercel --prod
```

After `vercel build`, the function folder
`.vercel/output/functions/api/lint.func/` physically holds only the traced
code (`lint.mjs`, `api/lint.mjs`, three harper.js files) and
`vendor/vale/vale`. **That is expected.** Everything from `includeFiles` is
recorded as a reference in `.vc-config.json` under `filePathMap`
(function path → path in the repo) and uploaded from the project tree when
you deploy; the CLI does this for every file it can point at on disk
instead of copying it (`filesWithoutFsRefs` in the CLI). So check:

```
jq .filePathMap .vercel/output/functions/api/lint.func/.vc-config.json
```

It must list `.vale.ini`, every `styles/**` file and
`node_modules/harper.js/dist/harper_wasm_bg.wasm` (verified 2026-09-16:
it does, including the dotfile). Missing entries mean the glob in
`vercel.json` did not match.

Then test:

```
curl -s -X POST https://<deployment>/api/lint -H 'content-type: application/json' \
  -d '{"text":"I have 30 years and I recieve emails."}'
```

## Limits and knobs

- Function `maxDuration` 30 s, `memory` 1024 MB (`vercel.json`). A check
  takes ~0.3 s warm; cold starts add WASM compile (~1 s).
- Text is capped at 200 KB by the handler.
- Bundle size: harper.js is ~72 MB unpacked but only `index.js`,
  `binary.js`, the module helper and one `.wasm` are traced; Vale is 40 MB.
  Well under the 250 MB unzipped limit.
- Region: whatever the project default is; nothing is region-specific.
- No auth. The page is public once deployed; add Vercel password
  protection or an auth layer if that matters.

## Local equivalents

- `npm start` — same handler logic through `server.mjs` on port 8321.
- `npm run build && VERCEL=1 bin/lint file.txt` — exercises the vendored
  binary and the temp-dir copy path without deploying.
- `vercel dev` also works once the project is linked.

## Tooling added on this machine

- `~/Projects/shell.nix` now provides `vercel` (59.19.0 via a pinned npx
  wrapper, same pattern as `dsh`). Login state lives under
  `~/.local/share/com.vercel.cli`.
- The official Claude Code plugin `vercel@claude-plugins-official`
  (v0.49.2) is installed at user scope (`~/.claude/settings.json`). It adds
  Vercel skills, three agents and slash commands such as
  `/vercel-plugin:deploy`, `/vercel-plugin:env`, `/vercel-plugin:status`.
  The Vercel MCP server (`claude mcp add --transport http vercel
  https://mcp.vercel.com`, OAuth via `/mcp`) was **not** added; it is
  optional and needs an interactive login.
