# Pasqualina

Type English in a local page; **Harper** checks grammar and spelling,
**Vale** checks for the mistakes Brazilian Portuguese speakers make in
English (false friends, calques, Portuguese-shaped spelling). Findings
are highlighted inline with one-click fixes.

```
nix-shell        # vale, node 24 from nixpkgs
npm install      # harper.js (Harper as WASM)
npm start        # http://127.0.0.1:8321
npm run dev      # restarts the server when files change
npm test         # fixtures through both linters
bin/pasqualina.mjs file.txt    # same pipeline from the terminal
vercel --prod    # deploy (see docs/07-vercel.md)
```

Runs locally or on Vercel with identical results; no network at run time.

- `docs/00-brief.md` — start here; index of all notes.
- `styles/BR/` — the Brazilian-mistakes Vale style (13 rule files). To
  extend: edit the YAML, add a line to `test/fixtures/br/<Rule>.txt` (and a
  correct counterpart to `clean.txt`), run `bin/check-styles.mjs && npm test`.
- `docs/03-brazilian-english-mistakes.md` — the catalogue behind the style.
