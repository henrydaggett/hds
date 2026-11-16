// Checks plain CSS (including CSS modules) for raw values that a variable covers,
// and for resets that would override hds because they're outside a cascade layer.

// Properties the hds reset and components rely on. An unlayered element rule setting one of
// these overrides hds; one that only sets, say, a background is a normal app base style.
const RESET_PROPS = /^(margin|padding|box-sizing|font|line-height|letter-spacing|border|list-style)/;

// Selectors made only of elements, `*` and pseudo-elements: `p`, `*::before`, `html, body`.
const ELEMENT_ONLY = /^(?:[a-z][a-z0-9-]*|\*)(?:::?[a-z-]+(?:\([^)]*\))?)*$/i;

function findUnlayeredResets(clean, report) {
  const stack = []; // preludes of the open blocks
  let start = 0;
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (ch === ';') start = i + 1;
    else if (ch === '}') {
      stack.pop();
      start = i + 1;
    } else if (ch === '{') {
      const raw = clean.slice(start, i);
      const prelude = raw.trim();
      const inLayer = stack.some((p) => p.startsWith('@layer'));
      const selectors = prelude.split(',').map((s) => s.trim());
      const end = clean.indexOf('}', i);
      const props = [...clean.slice(i + 1, end === -1 ? undefined : end).matchAll(/([\w-]+)\s*:/g)].map((m) => m[1]);
      if (
        !prelude.startsWith('@') &&
        !inLayer &&
        !stack.some((p) => !p.startsWith('@')) &&
        selectors.every((s) => ELEMENT_ONLY.test(s)) &&
        props.some((p) => RESET_PROPS.test(p))
      ) {
        const offset = start + raw.indexOf(prelude);
        const line = clean.slice(0, offset).split('\n').length;
        const column = offset - clean.lastIndexOf('\n', offset - 1);
        report('unlayered-reset', { line, column }, `'${selectors.join(', ')}' outside a layer overrides every hds style. hds ships a reset; remove this or move it into @layer reset { … }.`);
      }
      stack.push(prelude);
      start = i + 1;
    }
  }
}

export function lintCss(text, system, report) {
  // Blank out comments but keep line numbers.
  const clean = text.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));
  findUnlayeredResets(clean, report);
  clean.split('\n').forEach((line, i) => {
    const at = (index) => ({ line: i + 1, column: index + 1 });

    for (const m of line.matchAll(/var\((--hds-[\w-]+)/g)) {
      if (!system.variables.has(m[1])) report('unknown-variable', at(m.index), `'${m[1]}' isn't an hds variable.`);
    }

    const decl = line.match(/^\s*([\w-]+)\s*:\s*(.+?);?\s*$/);
    if (!decl) return;
    const [, prop, value] = decl;

    for (const m of value.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\([^)]*\)/g)) {
      const variables = system.colorVariables.get(m[0].toLowerCase());
      report(
        'hardcoded-color',
        at(line.indexOf(m[0])),
        variables ? `Use var(${variables[0]}) instead of ${m[0]}.` : `${m[0]} isn't a design system colour. Use a --hds-color-* variable.`,
      );
    }

    if (/^(gap|row-gap|column-gap|padding|margin)(-[\w-]+)?$/.test(prop)) {
      for (const m of value.matchAll(/\b(\d+)px\b/g)) {
        const variable = system.spacing.get(Number(m[1]));
        if (variable) report('hardcoded-spacing', at(line.indexOf(m[0])), `Use var(${variable}) instead of ${m[0]}.`);
      }
    }
  });
}
