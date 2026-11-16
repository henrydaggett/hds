#!/usr/bin/env node
import { lint, rules } from '../src/index.js';

const help = `Usage: hds-lint [paths…] [options]

Checks code against the hds design system. Paths default to the current folder.

Options
  --json                 Print findings as JSON
  --category <name>      Only run 'technical' or 'usage' rules (repeatable)
  --rule <id>            Only run this rule (repeatable)
  --ignore <text>        Skip files whose path contains this text (repeatable)
  --quiet                Hide info findings
  --list-rules           List the rules and exit
  -h, --help             Show this help

Exit code is 1 when there's at least one error.

Turn a rule off with a comment:
  // hds-lint-disable-next-line raw-element
  /* hds-lint-disable hardcoded-color -- reason */   (whole file)`;

const args = process.argv.slice(2);
const opts = { targets: [], categories: [], rules: [], ignore: [] };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '-h' || a === '--help') {
    console.log(help);
    process.exit(0);
  } else if (a === '--json') opts.json = true;
  else if (a === '--quiet') opts.quiet = true;
  else if (a === '--list-rules') opts.list = true;
  else if (a === '--category') opts.categories.push(args[++i]);
  else if (a === '--rule') opts.rules.push(args[++i]);
  else if (a === '--ignore') opts.ignore.push(args[++i]);
  else if (a.startsWith('-')) {
    console.error(`Unknown option ${a}\n\n${help}`);
    process.exit(2);
  } else opts.targets.push(a);
}

if (opts.list) {
  for (const category of ['technical', 'usage']) {
    console.log(`\n${category}`);
    for (const r of rules.filter((r) => r.category === category)) {
      console.log(`  ${r.id.padEnd(32)} ${r.severity.padEnd(8)} ${r.summary}`);
    }
  }
  process.exit(0);
}

let result;
try {
  result = lint(opts.targets.length ? opts.targets : ['.'], {
    categories: opts.categories.length ? opts.categories : undefined,
    rules: opts.rules.length ? opts.rules : undefined,
    ignore: opts.ignore,
  });
} catch (error) {
  console.error(`hds-lint: ${error.message}`);
  process.exit(2);
}

const findings = opts.quiet ? result.findings.filter((f) => f.severity !== 'info') : result.findings;
const count = (s) => findings.filter((f) => f.severity === s).length;

if (opts.json) {
  console.log(JSON.stringify({ files: result.files, findings }, null, 2));
} else {
  let current;
  for (const f of findings) {
    if (f.file !== current) {
      current = f.file;
      console.log(`\n${f.file}`);
    }
    console.log(`  ${`${f.line}:${f.column}`.padEnd(8)} ${f.severity.padEnd(8)} ${f.message}`);
    console.log(`  ${''.padEnd(8)} ${''.padEnd(8)} ${f.rule} (${f.category}) · ${f.docs}`);
  }
  console.log(`\n${result.files} files checked: ${count('error')} errors, ${count('warning')} warnings, ${count('info')} info.`);
}

process.exit(count('error') ? 1 : 0);
