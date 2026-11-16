// Loads what the linter knows about the design system from the installed
// @hds/ui package itself: its exports, variables, classes, prop defaults
// and docs. Nothing here is hand-maintained, so it can't drift.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

/** Finds @hds/ui from the project being linted, falling back to the linter's own copy. */
export function resolveUiRoot(cwd = process.cwd()) {
  const tries = [path.join(cwd, 'package.json'), import.meta.url];
  for (const from of tries) {
    try {
      const require = createRequire(from);
      return path.dirname(require.resolve('@hds/ui/package.json'));
    } catch {
      // try the next location
    }
  }
  throw new Error('Could not find @hds/ui. Install it in the project you are linting.');
}

function walk(dir, test, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, test, out);
    else if (test(entry.name)) out.push(full);
  }
  return out;
}

function parse(file) {
  return ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
}

const hasExport = (node) =>
  ts.canHaveModifiers(node) &&
  (ts.getModifiers(node) ?? []).some((m) => m.kind === ts.SyntaxKind.ExportKeyword);

/** Every name the package exports (components, icons, types). */
function readExports(srcDir) {
  const names = new Set();
  for (const file of walk(srcDir, (n) => /\.tsx?$/.test(n) && !n.endsWith('.d.ts'))) {
    for (const stmt of parse(file).statements) {
      if (ts.isExportDeclaration(stmt) && stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
        for (const el of stmt.exportClause.elements) names.add(el.name.text);
      } else if (hasExport(stmt)) {
        if (ts.isVariableStatement(stmt)) {
          for (const d of stmt.declarationList.declarations) if (ts.isIdentifier(d.name)) names.add(d.name.text);
        } else if (stmt.name && ts.isIdentifier(stmt.name)) {
          names.add(stmt.name.text);
        }
      }
    }
  }
  return names;
}

/** The first parameter's destructured defaults, e.g. `{ size = 'medium' }`. */
function bindingDefaults(fn) {
  const defaults = {};
  const param = fn?.parameters?.[0];
  if (!param || !ts.isObjectBindingPattern(param.name)) return defaults;
  for (const el of param.name.elements) {
    if (!el.initializer || !ts.isIdentifier(el.name)) continue;
    const name = (el.propertyName ?? el.name).getText();
    const init = el.initializer;
    if (ts.isStringLiteral(init)) defaults[name] = init.text;
    else if (init.kind === ts.SyntaxKind.FalseKeyword) defaults[name] = false;
  }
  return defaults;
}

/** Prop defaults per component, read from each component's source. */
function readDefaults(componentsDir) {
  const result = {};
  for (const file of walk(componentsDir, (n) => /^[A-Z]\w*\.tsx$/.test(n))) {
    for (const stmt of parse(file).statements) {
      if (!hasExport(stmt)) continue;
      if (ts.isFunctionDeclaration(stmt) && stmt.name?.text.startsWith('Hds')) {
        result[stmt.name.text] = bindingDefaults(stmt);
      }
      if (ts.isVariableStatement(stmt)) {
        for (const d of stmt.declarationList.declarations) {
          if (!ts.isIdentifier(d.name) || !d.name.text.startsWith('Hds')) continue;
          // forwardRef(function HdsX({ ... }) { ... })
          const call = d.initializer;
          const fn = call && ts.isCallExpression(call) ? call.arguments[0] : undefined;
          if (fn && (ts.isFunctionExpression(fn) || ts.isArrowFunction(fn))) {
            result[d.name.text] = bindingDefaults(fn);
          }
        }
      }
    }
  }
  return result;
}

/** The global CSS in src/styles/: the reset and one file per concept (color.css, spacing.css…). */
function styleFiles(src) {
  const dir = path.join(src, 'styles');
  return fs.readdirSync(dir).filter((f) => f.endsWith('.css')).map((f) => path.join(dir, f));
}

/** `--hds-*` variables and their raw values. */
function readVariables(files) {
  const variables = new Map();
  for (const file of files) {
    for (const m of fs.readFileSync(file, 'utf8').matchAll(/(--hds-[\w-]+)\s*:\s*([^;]+);/g)) {
      variables.set(m[1], m[2].trim());
    }
  }
  return variables;
}

/** `hds-*` class names (typography and spacing). */
function readClasses(files) {
  const classes = new Set();
  for (const file of files) {
    for (const m of fs.readFileSync(file, 'utf8').matchAll(/\.(hds-[\w-]+)/g)) classes.add(m[1]);
  }
  return classes;
}

export function loadSystem(cwd) {
  const root = resolveUiRoot(cwd);
  const src = path.join(root, 'src');
  const docs = path.join(root, 'docs');
  const files = styleFiles(src);
  const variables = readVariables(files);

  // Raw colour value → variable names, so a hardcoded colour can suggest its variable.
  const colorVariables = new Map();
  for (const [name, value] of variables) {
    const v = value.toLowerCase();
    if (/^#[0-9a-f]{3,8}$/.test(v)) colorVariables.set(v, [...(colorVariables.get(v) ?? []), name]);
  }

  // Pixel value → spacing variable, e.g. 16 → '--hds-space-4'.
  const spacing = new Map();
  for (const [name, value] of variables) {
    const m = name.match(/^--hds-space-(\d+)$/);
    const px = value.match(/^(\d+)px$/);
    if (m && px) spacing.set(Number(px[1]), name);
  }

  const assets = new Set(
    fs.existsSync(path.join(docs, 'assets'))
      ? fs.readdirSync(path.join(docs, 'assets')).map((f) => f.replace(/\.md$/, ''))
      : [],
  );

  return {
    root,
    docs,
    exports: readExports(src),
    defaults: readDefaults(path.join(src, 'components')),
    cssFiles: files.map((f) => path.basename(f)),
    variables,
    colorVariables,
    spacing,
    classes: readClasses(files),
    assets,
  };
}

/** `HdsAccordionItem` → `accordion`, `HdsTab` → `tabs`, `HdsCheckboxGroup` → `checkbox-group`. */
export function docName(system, component) {
  const words = component.replace(/^Hds/, '').match(/[A-Z][a-z]*/g) ?? [];
  for (let n = words.length; n > 0; n--) {
    const name = words.slice(0, n).join('-').toLowerCase();
    if (system.assets.has(name)) return name;
    if (system.assets.has(`${name}s`)) return `${name}s`;
  }
  return null;
}
