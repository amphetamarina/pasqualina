{ pkgs ? import <nixpkgs> { } }:

# Pasqualina — a page for writing English with Harper (grammar + spelling)
# and Vale (a custom style for Brazilian-Portuguese-speaker mistakes).
#
#   nix-shell            # enter the environment
#   npm install          # harper.js (Harper as WASM; same engine as on Vercel)
#   npm start            # serve http://127.0.0.1:8321
#   npm run dev          # same, restarts the server on file changes
#   npm test             # fixtures through both linters
#   bin/lint.mjs file.txt # lint a file from the terminal (both tools)
#   vercel               # deploy (vercel CLI comes from ~/Projects/shell.nix)
#
# Vale comes from nixpkgs here; on Vercel `npm run build` downloads the
# pinned release binary instead (scripts/fetch-vale.mjs). Harper is the
# harper.js npm package in both places, so results match.

pkgs.mkShell {
  name = "pasqualina";

  packages = with pkgs; [
    vale          # vale: `vale --output=JSON --ext=.txt`
    nodejs_24
    jq            # handy for poking at the JSON the linters emit
  ];

  # Vale looks for .vale.ini upward from the cwd; the server pins it
  # explicitly, this is only for running `vale` by hand from subdirs.
  VALE_CONFIG_PATH = toString ./.vale.ini;

  shellHook = ''
    echo "pasqualina dev shell"
    echo "  $(vale --version)   node $(node --version)   harper.js $(node -p "try{require('./node_modules/harper.js/package.json').version}catch{'(run npm install)'}")"
    echo "  npm start  ->  http://127.0.0.1:8321"
  '';
}
