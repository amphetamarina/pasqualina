import { parseArgs as nodeParseArgs } from "node:util";

const FORMATS = ["text", "json"];
const SEVERITIES = ["error", "warning", "suggestion"];
const TOOLS = ["harper", "vale"];

/**
 * @typedef {object} LintOptions
 * @property {"lint"} kind
 * @property {string[]} files
 * @property {"text" | "json"} format
 * @property {"error" | "warning" | "suggestion"} severity
 * @property {"harper" | "vale" | null} tool
 * @property {boolean} quiet
 */

/**
 * @typedef {LintOptions | { kind: "help" } | { kind: "version" } | { kind: "error", message: string }} CliArgs
 */

/**
 * @param {string} flag
 * @param {string} value
 * @param {readonly string[]} allowed
 * @returns {{ kind: "error", message: string }}
 */
function invalidChoice(flag, value, allowed) {
  return { kind: "error", message: `invalid --${flag} "${value}" (expected ${allowed.join("|")})` };
}

/**
 * @param {string} value
 * @returns {"text" | "json" | null}
 */
function asFormat(value) {
  return value === "text" || value === "json" ? value : null;
}

/**
 * @param {string} value
 * @returns {"error" | "warning" | "suggestion" | null}
 */
function asSeverity(value) {
  return value === "error" || value === "warning" || value === "suggestion" ? value : null;
}

/**
 * @param {string | undefined} value
 * @returns {"harper" | "vale" | null}
 */
function asTool(value) {
  return value === "harper" || value === "vale" ? value : null;
}

/**
 * @param {{ format?: string, severity?: string, tool?: string, quiet?: boolean }} values
 * @param {string[]} positionals
 * @returns {LintOptions | { kind: "error", message: string }}
 */
function buildOptions(values, positionals) {
  const rawFormat = values.format ?? "text";
  const rawSeverity = values.severity ?? "suggestion";
  const format = asFormat(rawFormat);
  const severity = asSeverity(rawSeverity);
  const tool = asTool(values.tool);

  if (format === null) return invalidChoice("format", rawFormat, FORMATS);
  if (severity === null) return invalidChoice("severity", rawSeverity, SEVERITIES);
  if (tool === null && values.tool !== undefined) return invalidChoice("tool", values.tool, TOOLS);

  return { kind: "lint", files: positionals, format, severity, tool, quiet: values.quiet ?? false };
}

/**
 * @param {string[]} argv
 * @returns {CliArgs}
 */
export function parseArgs(argv) {
  let parsed;
  try {
    parsed = nodeParseArgs({
      args: argv,
      options: {
        format: { type: "string" },
        severity: { type: "string" },
        tool: { type: "string" },
        quiet: { type: "boolean" },
        help: { type: "boolean" },
        version: { type: "boolean" },
      },
      allowPositionals: true,
    });
  } catch (error) {
    return { kind: "error", message: error instanceof Error ? error.message : String(error) };
  }

  if (parsed.values.help) return { kind: "help" };
  if (parsed.values.version) return { kind: "version" };
  return buildOptions(parsed.values, parsed.positionals);
}
