import { parseArgs } from "./args.mjs";
import { formatJson, formatText, toEntry } from "./format.mjs";

const STDIN_LABEL = "<stdin>";

const HELP = `Usage: pasqualina [options] [file ...]

Lint English text with Harper and Vale (Brazilian-Portuguese-speaker rules).
Reads stdin when no files are given or when a file is "-".

Options:
  --format text|json                     output format (default text)
  --severity error|warning|suggestion    minimum severity to report (default suggestion)
  --tool harper|vale                     restrict to one tool
  --quiet                                no summary line on stderr
  --help                                 show this help
  --version                              show the version
`;

/**
 * @typedef {import("../issues.mjs").Issue} Issue
 * @typedef {{ issues: Issue[], counts: { harper: number, vale: number } }} LintResult
 * @typedef {object} Io
 * @property {AsyncIterable<string | Uint8Array>} stdin
 * @property {(text: string) => void} stdout
 * @property {(text: string) => void} stderr
 * @property {(path: string) => string} readFile
 * @property {(text: string) => Promise<LintResult>} lint
 * @property {string} version
 */

/**
 * @param {unknown} error
 * @returns {string}
 */
function message(error) {
  return error instanceof Error ? error.message : String(error);
}

/**
 * @param {AsyncIterable<string | Uint8Array>} stdin
 * @returns {Promise<string>}
 */
async function readStdin(stdin) {
  const chunks = [];
  for await (const chunk of stdin) {
    chunks.push(typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf8"));
  }
  return chunks.join("");
}

/**
 * @param {string[]} files
 * @param {import("./args.mjs").LintOptions} options
 * @param {Io} io
 * @returns {Promise<import("./format.mjs").FileEntry[]>}
 */
async function collectEntries(files, options, io) {
  const stdin = files.includes("-") ? await readStdin(io.stdin) : "";
  const entries = [];
  for (const file of files) {
    const result = await io.lint(file === "-" ? stdin : io.readFile(file));
    entries.push(toEntry(file === "-" ? STDIN_LABEL : file, result, options));
  }
  return entries;
}

/**
 * @param {import("./format.mjs").FileEntry[]} entries
 * @param {import("./args.mjs").LintOptions} options
 * @param {Io} io
 */
function emitText(entries, options, io) {
  const prefix = entries.length > 1;
  for (const entry of entries) {
    for (const line of formatText(entry.file, entry, { ...options, prefix })) io.stdout(`${line}\n`);
  }
}

/**
 * @param {import("./format.mjs").FileEntry[]} entries
 * @returns {string}
 */
function summary(entries) {
  const counts = entries.reduce(
    (acc, entry) => ({ harper: acc.harper + entry.counts.harper, vale: acc.vale + entry.counts.vale }),
    { harper: 0, vale: 0 },
  );
  return `harper: ${counts.harper}  vale: ${counts.vale}`;
}

/**
 * @param {import("./format.mjs").FileEntry[]} entries
 * @param {import("./args.mjs").LintOptions} options
 * @param {Io} io
 */
function emit(entries, options, io) {
  if (options.format === "json") io.stdout(`${formatJson(entries)}\n`);
  else emitText(entries, options, io);
  if (!options.quiet) io.stderr(`${summary(entries)}\n`);
}

/**
 * @param {import("./args.mjs").LintOptions} options
 * @param {Io} io
 * @returns {Promise<number>}
 */
async function lintFiles(options, io) {
  const files = options.files.length ? options.files : ["-"];
  let entries;
  try {
    entries = await collectEntries(files, options, io);
  } catch (error) {
    io.stderr(`${message(error)}\n`);
    return 2;
  }
  emit(entries, options, io);
  return entries.some((entry) => entry.issues.length > 0) ? 1 : 0;
}

/**
 * @param {string[]} argv
 * @param {Io} io
 * @returns {Promise<number>}
 */
export async function run(argv, io) {
  const args = parseArgs(argv);
  if (args.kind === "error") {
    io.stderr(`${args.message}\n`);
    return 2;
  }
  if (args.kind === "help") {
    io.stdout(HELP);
    return 0;
  }
  if (args.kind === "version") {
    io.stdout(`pasqualina ${io.version}\n`);
    return 0;
  }
  return lintFiles(args, io);
}
