// Turns a JS/TS(X) file into a light tree of JSX elements for the rules.
import ts from 'typescript';

function scriptKind(file) {
  if (file.endsWith('.tsx')) return ts.ScriptKind.TSX;
  if (file.endsWith('.jsx')) return ts.ScriptKind.JSX;
  if (file.endsWith('.ts')) return ts.ScriptKind.TS;
  return ts.ScriptKind.JSX;
}

/** A literal value, or `{ kind: 'expr' }` when it can't be known statically. */
function valueOf(expr) {
  if (!expr) return { kind: 'expr' };
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return { kind: 'string', value: expr.text };
  if (ts.isNumericLiteral(expr)) return { kind: 'number', value: Number(expr.text) };
  if (expr.kind === ts.SyntaxKind.TrueKeyword) return { kind: 'boolean', value: true };
  if (expr.kind === ts.SyntaxKind.FalseKeyword) return { kind: 'boolean', value: false };
  if (ts.isArrayLiteralExpression(expr)) return { kind: 'array', length: expr.elements.length, node: expr };
  if (ts.isObjectLiteralExpression(expr)) return { kind: 'object', node: expr };
  if (ts.isParenthesizedExpression(expr)) return valueOf(expr.expression);
  return { kind: 'expr', node: expr };
}

const isJsxElement = (n) => ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n);

/**
 * @returns {{
 *   sf: ts.SourceFile,
 *   imports: { source: string, names: { imported: string, local: string, typeOnly: boolean, node: ts.Node }[], node: ts.Node }[],
 *   elements: object[],
 *   strings: ts.Node[],
 * }}
 */
export function parseScript(file, text) {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, scriptKind(file));
  const imports = [];
  const local = new Map(); // local identifier → exported @hds/ui name

  for (const stmt of sf.statements) {
    if (!ts.isImportDeclaration(stmt) || !ts.isStringLiteral(stmt.moduleSpecifier)) continue;
    const source = stmt.moduleSpecifier.text;
    const names = [];
    const bindings = stmt.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) {
      for (const el of bindings.elements) {
        const imported = (el.propertyName ?? el.name).text;
        const typeOnly = Boolean(stmt.importClause.isTypeOnly || el.isTypeOnly);
        names.push({ imported, local: el.name.text, typeOnly, node: el });
        if (source === '@hds/ui' && !typeOnly) local.set(el.name.text, imported);
      }
    }
    imports.push({ source, names, node: stmt });
  }

  const elements = [];
  const strings = [];

  function makeElement(node, parent, slot) {
    const opening = ts.isJsxElement(node) ? node.openingElement : node;
    const tag = opening.tagName.getText(sf);
    const el = {
      tag,
      component: local.get(tag) ?? null,
      attrs: new Map(),
      hasSpread: false,
      children: [],
      text: '',
      dynamicChildren: false,
      parent,
      slot,
      node: opening,
    };
    elements.push(el);
    if (parent) (slot ? parent.slotted ?? (parent.slotted = []) : parent.children).push(el);

    for (const attr of opening.attributes.properties) {
      if (!ts.isJsxAttribute(attr)) {
        el.hasSpread = true;
        visit(attr, el, '...');
        continue;
      }
      const name = attr.name.getText(sf);
      const init = attr.initializer;
      let value;
      if (!init) value = { kind: 'boolean', value: true };
      else if (ts.isStringLiteral(init)) value = { kind: 'string', value: init.text };
      else if (ts.isJsxExpression(init)) {
        value = valueOf(init.expression);
        if (init.expression) visit(init.expression, el, name);
      } else value = { kind: 'expr' };
      el.attrs.set(name, { ...value, attr });
    }

    if (ts.isJsxElement(node)) visitChildren(node.children, el, undefined);
    return el;
  }

  /** `slot` is set when the children belong to a prop of `el` (e.g. `footer={<>…</>}`). */
  function visitChildren(children, el, slot) {
    for (const child of children) {
      if (ts.isJsxText(child)) {
        const t = child.text.replace(/\s+/g, ' ').trim();
        if (t && !slot) el.text += (el.text ? ' ' : '') + t;
      } else if (isJsxElement(child)) {
        makeElement(child, el, slot);
      } else if (ts.isJsxFragment(child)) {
        visitChildren(child.children, el, slot);
      } else if (ts.isJsxExpression(child) && child.expression) {
        const v = valueOf(child.expression);
        if (!slot) {
          if (v.kind === 'string') el.text += (el.text ? ' ' : '') + v.value;
          else if (!isJsxElement(child.expression)) el.dynamicChildren = true;
        }
        visit(child.expression, el, slot);
      }
    }
  }

  function visit(node, parent, slot) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateExpression(node)) {
      strings.push(node);
    }
    if (isJsxElement(node)) {
      makeElement(node, parent, slot);
      return;
    }
    if (ts.isJsxFragment(node)) {
      if (parent) visitChildren(node.children, parent, slot);
      else {
        // A top-level fragment: its children are roots.
        for (const c of node.children) visit(c, null, undefined);
      }
      return;
    }
    ts.forEachChild(node, (c) => visit(c, parent, slot));
  }

  for (const stmt of sf.statements) visit(stmt, null, undefined);

  return { sf, imports, elements, strings };
}

/** Every ancestor element, nearest first. */
export function ancestors(el) {
  const out = [];
  for (let p = el.parent; p; p = p.parent) out.push(p);
  return out;
}

/** Position of a node as 1-based line and column. */
export function position(sf, node) {
  const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
  return { line: line + 1, column: character + 1 };
}
