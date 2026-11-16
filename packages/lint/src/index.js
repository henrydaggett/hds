// Runs every rule over a set of files and returns the findings.
import fs from 'node:fs';
import path from 'node:path';
import { lintCss } from './css.js';
import { parseScript, position } from './parse.js';
import { rules } from './rules.js';
import { loadSystem } from './system.js';

export { rules };

const SCRIPT = /\.(tsx|jsx|ts|js|mjs|cjs)$/;
const STYLE = /\.css$/;
const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', '.git', 'coverage']);

function collect(target, ignore, out) {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(target)) {
      if (SKIP_DIRS.has(entry)) continue;
      collect(path.join(target, entry), ignore, out);
    }
  } else if ((SCRIPT.test(target) || STYLE.test(target)) && !target.endsWith('.d.ts')) {
    if (!ignore.some((part) => target.includes(part))) out.push(target);
  }
  return out;
}

/**
 * Comments that switch rules off:
 *   hds-lint-disable [rule, …]            whole file (all rules if none listed)
 *   hds-lint-disable-next-line [rule, …]  the next line
 * Add a reason after ' -- '.
 * They work in // , /* *\/ and {/* *\/} comments.
 */
function suppressions(text) {
  const file = new Set();
  const lines = new Map();
  let fileAll = false;
  text.split('\n').forEach((line, i) => {
    const m = line.match(/hds-lint-disable(-next-line)?\b([^*\n]*)/);
    if (!m) return;
    // Anything after ' -- ' is a reason, not a rule id.
    const ids = m[2].split(' -- ')[0].replace(/[}/]/g, ' ').split(/[\s,]+/).filter((s) => /^[a-z][a-z-]+$/.test(s));
    if (m[1]) lines.set(i + 2, ids.length ? new Set(ids) : null);
    else if (ids.length) ids.forEach((id) => file.add(id));
    else fileAll = true;
  });
  return (rule, line) => {
    if (fileAll || file.has(rule)) return true;
    if (!lines.has(line)) return false;
    const ids = lines.get(line);
    return ids === null || ids.has(rule);
  };
}

/**
 * @param {string[]} targets files or directories
 * @param {{ cwd?: string, ignore?: string[], categories?: string[], rules?: string[] }} options
 */
export function lint(targets, options = {}) {
  const cwd = options.cwd ?? process.cwd();
  const system = loadSystem(cwd);
  // The design system's own source defines the variables and raw elements, so it's never linted.
  const ignore = [...(options.ignore ?? []), path.join(system.root, 'src')];
  const active = rules.filter(
    (r) =>
      (!options.categories || options.categories.includes(r.category)) &&
      (!options.rules || options.rules.includes(r.id)),
  );
  const byId = new Map(rules.map((r) => [r.id, r]));
  const cssRules = new Set(['unknown-variable', 'hardcoded-color', 'hardcoded-spacing', 'unlayered-reset'].filter((id) => active.some((r) => r.id === id)));

  const files = [];
  for (const t of targets) collect(path.resolve(cwd, t), ignore, files);

  const findings = [];
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    const suppressed = suppressions(text);
    const rel = path.relative(cwd, file);

    const push = (rule, pos, message, docs) => {
      if (suppressed(rule.id, pos.line)) return;
      findings.push({
        file: rel,
        line: pos.line,
        column: pos.column,
        rule: rule.id,
        category: rule.category,
        severity: rule.severity,
        message,
        docs: path.relative(cwd, path.join(system.docs, docs ?? rule.docs ?? 'README.md')),
      });
    };

    if (STYLE.test(file)) {
      lintCss(text, system, (id, pos, message) => {
        if (cssRules.has(id)) push(byId.get(id), pos, message);
      });
      continue;
    }

    const parsed = parseScript(file, text);
    for (const rule of active) {
      rule.check({
        parsed,
        system,
        report: (node, message, docs) => push(rule, position(parsed.sf, node), message, docs),
      });
    }
  }

  const order = { error: 0, warning: 1, info: 2 };
  findings.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.column - b.column || order[a.severity] - order[b.severity]);
  return { files: files.length, findings };
}
