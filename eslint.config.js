import js from "@eslint/js";
import globals from "globals";

// Quality gate: clean-code thresholds and import boundaries.
//
// Boundary model:
//   src/harper/**, src/vale/**  — tool adapters; may not import each other
//   src/lint.mjs                — compose entry; the only thing consumers use
//   src/http/**                 — request handling, may not import adapters
//   src/cli/**                  — imports only src/lint.mjs and src/issues.mjs
//   bin/*, server.mjs, api/**, bench/** — enter through the compose entry
//     (lint.mjs / src/lint.mjs), never an adapter directly
//
// Thresholds are targets: they are never loosened to fit the code; violations
// are fixed in their own commits instead.

export default [
  {
    ignores: ["node_modules/", "vendor/", "coverage/", ".vercel/"],
  },
  js.configs.recommended,
  {
    files: ["**/*.mjs", "**/*.js"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      // clean code targets
      complexity: ["error", 10],
      "max-depth": ["error", 3],
      "max-lines-per-function": ["error", { max: 60, skipBlankLines: true, skipComments: true }],
      "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
      "no-param-reassign": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

      // architecture: adapters may import only the pure modules; nothing
      // else reaches them except the compose entry src/lint.mjs
      "no-restricted-imports": ["error", {
        patterns: [
          {
            group: ["**/src/harper/*", "**/src/vale/*"],
            message: "import the compose entry (lint.mjs / src/lint.mjs), not an adapter",
          },
        ],
      }],
    },
  },
  {
    // the page runs in the browser
    files: ["public/**"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["src/harper/**", "src/vale/**"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [{
          regex: "^(?!(?:\\./normalize\\.mjs$|\\.\\./offsets\\.mjs$|\\.\\./issues\\.mjs$|\\.\\./memo\\.mjs$|harper\\.js(?:/binary)?$|node:|\\.\\./http/)).+$",
          message: "adapters import only the pure modules (offsets, issues, memo), their own normalize, their tool, node builtins, and src/http",
        }],
      }],
    },
  },
  {
    // the compose entry is the only place allowed to reach adapters
    files: ["src/lint.mjs"],
    rules: { "no-restricted-imports": "off" },
  },
  {
    files: ["src/cli/**"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [{
          regex: "^(?!(?:\\./|\\.\\./issues\\.mjs$|\\.\\./lint\\.mjs$|node:)).+$",
          message: "src/cli imports only lint.mjs, issues.mjs, node builtins, and its own modules",
        }],
      }],
    },
  },
  {
    // tests use describe/it closures as containers, not logic; a length
    // limit on them measures grouping, which is the wrong thing. Keep
    // complexity/max-depth so test logic stays simple.
    files: ["test/**"],
    rules: {
      "max-lines-per-function": "off",
    },
  },
  {
    // unit specs test the pure modules directly; integration specs and
    // everything else still enter through the compose entry
    files: ["test/**"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [{
          group: ["**/src/harper/linter.mjs", "**/src/vale/linter.mjs"],
          message: "tests import the compose entry (lint.mjs / src/lint.mjs) or the pure normalize modules",
        }],
      }],
    },
  },
];
