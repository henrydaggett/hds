// Checks plain CSS (including CSS modules) for raw values that a token covers.
export function lintCss(text, system, report) {
  // Blank out comments but keep line numbers.
  const clean = text.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));
  clean.split('\n').forEach((line, i) => {
    const at = (index) => ({ line: i + 1, column: index + 1 });

    for (const m of line.matchAll(/var\((--hds-[\w-]+)/g)) {
      if (!system.tokens.has(m[1])) report('unknown-token', at(m.index), `'${m[1]}' isn't an hds token.`);
    }

    const decl = line.match(/^\s*([\w-]+)\s*:\s*(.+?);?\s*$/);
    if (!decl) return;
    const [, prop, value] = decl;

    for (const m of value.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\([^)]*\)/g)) {
      const tokens = system.colorTokens.get(m[0].toLowerCase());
      report(
        'hardcoded-color',
        at(line.indexOf(m[0])),
        tokens ? `Use var(${tokens[0]}) instead of ${m[0]}.` : `${m[0]} isn't a design system colour. Use a --hds-color-* token.`,
      );
    }

    if (/^(gap|row-gap|column-gap|padding|margin)(-[\w-]+)?$/.test(prop)) {
      for (const m of value.matchAll(/\b(\d+)px\b/g)) {
        const token = system.spacing.get(Number(m[1]));
        if (token) report('hardcoded-spacing', at(line.indexOf(m[0])), `Use var(${token}) instead of ${m[0]}.`);
      }
    }
  });
}
