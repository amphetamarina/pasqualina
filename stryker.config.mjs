// Stryker mutation testing config.
//
// Why tsconfigFile points to a nonexistent path:
//   TypeScript 7.x removed the parseConfigFileTextToJson API that Stryker's
//   TSConfigPreprocessor calls. Pointing at a file that doesn't exist in the
//   sandbox makes the preprocessor skip rewriting (project.files.get returns
//   undefined). Remove this workaround when Stryker supports TS 7.
//
// Why --test-reporter=tap in nodeArgs:
//   Node 23+ changed the default --test-reporter from "tap" to "spec".
//   The tap-runner plugin (v9+) prepends it by default, but pinning it here
//   makes the requirement explicit and guards against future defaults.

export default {
  testRunner: "tap",
  tap: {
    testFiles: ["test/unit/**/*.test.mjs"],
    // -r {{hookFile}} loads Stryker's coverage hook; --test-reporter tap
    // ensures TAP output regardless of the Node default.
    nodeArgs: ["-r", "{{hookFile}}", "--test-reporter", "tap", "{{testFile}}"],
    forceBail: true,
  },
  coverageAnalysis: "perTest",
  tsconfigFile: "tsconfig.stryker.json",
  mutate: [
    "src/offsets.mjs",
    "src/issues.mjs",
    "src/memo.mjs",
    "src/harper/normalize.mjs",
    "src/vale/normalize.mjs",
    "src/http/*.mjs",
    "public/backdrop.js",
  ],
  reporters: ["clear-text", "html"],
  htmlReporter: { fileName: "reports/mutation/index.html" },
  timeoutMS: 10000,
  tempDirName: "node_modules/.temp/stryker",
  cleanTempDir: true,
  thresholds: { break: 90, low: 93, high: 97 },
};
