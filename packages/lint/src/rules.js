// Every rule the linter runs on scripts (JS/TS/JSX/TSX). CSS checks live in css.js.
//
// category: 'technical' — the code is wrong or breaks the system's API and variables.
//           'usage'     — the code works but uses a component in a way the docs advise against.
// severity: 'error' fails the run; 'warning' and 'info' don't.
import ts from 'typescript';
import { ancestors } from './parse.js';
import { docName } from './system.js';

const SPACING_PROPS = {
  gap: 'hds-gap',
  rowGap: 'hds-gap',
  columnGap: 'hds-gap',
  padding: 'hds-p',
  paddingInline: 'hds-px',
  paddingBlock: 'hds-py',
  margin: 'hds-m',
  marginTop: 'hds-mt',
  marginBottom: 'hds-mb',
};
const OTHER_SPACING = /^(padding|margin)(Top|Right|Bottom|Left|InlineStart|InlineEnd|BlockStart|BlockEnd)$/;
const TYPE_PROPS = new Set(['fontSize', 'fontWeight', 'lineHeight', 'fontFamily', 'letterSpacing']);
const COLOR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\(/;

const RAW_ELEMENTS = {
  button: (el) => (el.attrs.has('aria-pressed') ? 'HdsToggle' : 'HdsButton'),
  select: () => 'HdsSelect',
  hr: () => 'HdsSeparator',
  dialog: () => 'HdsDialog',
  details: () => 'HdsAccordion',
  form: () => 'HdsForm',
  fieldset: () => 'HdsFieldset',
  input: (el) => {
    const type = el.attrs.get('type');
    const t = type?.kind === 'string' ? type.value : type ? null : 'text';
    if (t === null) return null;
    if (t === 'checkbox') return el.attrs.get('role')?.value === 'switch' ? 'HdsSwitch' : 'HdsCheckbox';
    if (t === 'radio') return 'HdsRadioGroup';
    if (t === 'submit' || t === 'button') return 'HdsButton';
    if (['text', 'email', 'password', 'number', 'search', 'tel', 'url'].includes(t)) return 'HdsTextInput';
    return null;
  },
};

/** Parents a component must sit inside (any ancestor, not only the direct parent). */
const REQUIRED_PARENT = {
  HdsRadio: 'HdsRadioGroup',
  HdsTab: 'HdsTabs',
  HdsAccordionItem: 'HdsAccordion',
  HdsMenuItem: 'HdsMenu',
  HdsMenuSeparator: 'HdsMenu',
  HdsFormActions: 'HdsForm',
  HdsDialogClose: 'HdsDialog',
};

/** The only components allowed as direct children. */
const ALLOWED_CHILDREN = {
  HdsTabs: ['HdsTab'],
  HdsAccordion: ['HdsAccordionItem'],
  HdsMenu: ['HdsMenuItem', 'HdsMenuSeparator'],
  HdsRadioGroup: ['HdsRadio'],
  HdsCheckboxGroup: ['HdsCheckbox'],
  HdsToggleGroup: ['HdsToggle'],
};

const FIELD_CONTROLS = ['HdsTextInput', 'HdsSelect', 'HdsCheckbox', 'HdsSwitch'];
const SELF_LABELLED = ['HdsCheckbox', 'HdsSwitch'];
const WITH_ERROR = ['HdsField', 'HdsCheckboxGroup', 'HdsRadioGroup'];

const str = (el, name) => {
  const a = el.attrs.get(name);
  return a?.kind === 'string' ? a.value : undefined;
};
const isTrue = (el, name) => {
  const a = el.attrs.get(name);
  return a?.kind === 'boolean' && a.value === true;
};
const has = (el, name) => el.attrs.has(name);
const named = (els, name) => els.filter((e) => e.component === name);

function assetLink(system, component, folder = 'assets') {
  const name = component && docName(system, component);
  return name ? `${folder}/${name}.md` : undefined;
}

/** Walks the properties of a `style={{ … }}` object. */
function styleProps(el) {
  const style = el.attrs.get('style');
  if (style?.kind !== 'object') return [];
  return style.node.properties
    .filter((p) => ts.isPropertyAssignment(p) && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)))
    .map((p) => {
      const init = p.initializer;
      let value;
      if (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) value = init.text;
      else if (ts.isNumericLiteral(init)) value = Number(init.text);
      return { name: p.name.text, value, node: p };
    });
}

const px = (v) => (typeof v === 'number' ? v : typeof v === 'string' && /^\d+px$/.test(v) ? parseInt(v, 10) : null);

export const rules = [
  // ---------------------------------------------------------------- technical
  {
    id: 'no-subpath-import',
    category: 'technical',
    severity: 'error',
    summary: 'Import from the package root, `@hds/ui`, not its internal files.',
    docs: 'README.md',
    check({ parsed, system, report }) {
      const allowed = new Set(system.cssFiles.map((f) => `@hds/ui/${f}`));
      for (const imp of parsed.imports) {
        if (imp.source.startsWith('@hds/ui/') && !allowed.has(imp.source)) {
          report(imp.node, `Import from '@hds/ui', not '${imp.source}'.`);
        }
      }
    },
  },
  {
    id: 'unknown-export',
    category: 'technical',
    severity: 'error',
    summary: '`@hds/ui` has no export with this name.',
    docs: 'components.md',
    check({ parsed, system, report }) {
      for (const imp of parsed.imports) {
        if (imp.source !== '@hds/ui') continue;
        for (const n of imp.names) {
          if (!system.exports.has(n.imported)) report(n.node, `'${n.imported}' isn't exported by @hds/ui.`);
        }
      }
    },
  },
  {
    id: 'unknown-class',
    category: 'technical',
    severity: 'error',
    summary: 'An `hds-*` class that @hds/ui doesn\'t define.',
    docs: 'assets/spacing.md',
    check({ parsed, system, report }) {
      for (const el of parsed.elements) {
        const cls = el.attrs.get('className');
        if (cls?.kind !== 'string') continue;
        for (const name of cls.value.split(/\s+/)) {
          if (name.startsWith('hds-') && !system.classes.has(name)) {
            const hint = /^hds-(h\d|text)/.test(name) ? 'assets/typography.md' : 'assets/spacing.md';
            report(cls.attr, `'${name}' isn't an hds class. See ${hint} for the classes that exist.`);
          }
        }
      }
    },
  },
  {
    id: 'unknown-variable',
    category: 'technical',
    severity: 'error',
    summary: 'A `--hds-*` variable that @hds/ui doesn\'t define.',
    docs: 'README.md',
    check({ parsed, system, report }) {
      for (const node of parsed.strings) {
        for (const m of node.getText(parsed.sf).matchAll(/--hds-[\w-]+/g)) {
          if (!system.variables.has(m[0])) report(node, `'${m[0]}' isn't an hds variable.`);
        }
      }
    },
  },
  {
    id: 'hardcoded-color',
    category: 'technical',
    severity: 'warning',
    summary: 'A raw colour where a colour variable should be used.',
    docs: '../src/color.css',
    check({ parsed, system, report }) {
      for (const el of parsed.elements) {
        for (const p of styleProps(el)) {
          if (typeof p.value !== 'string' || !COLOR.test(p.value)) continue;
          const hex = p.value.trim().toLowerCase();
          const variables = system.colorVariables.get(hex);
          report(
            p.node,
            variables
              ? `Use var(${variables[0]}) instead of ${p.value}.`
              : `${p.value} isn't a design system colour. Use a --hds-color-* variable.`,
          );
        }
      }
    },
  },
  {
    id: 'hardcoded-spacing',
    category: 'technical',
    severity: 'warning',
    summary: 'Inline margin, padding or gap where a spacing class should be used.',
    docs: 'assets/spacing.md',
    check({ parsed, system, report }) {
      for (const el of parsed.elements) {
        if (el.component) continue; // custom styling on components is its own rule
        for (const p of styleProps(el)) {
          const prefix = SPACING_PROPS[p.name];
          if (!prefix && !OTHER_SPACING.test(p.name)) continue;
          const value = px(p.value);
          if (value === null) continue;
          if (prefix && system.classes.has(`${prefix}-${value}`)) {
            report(p.node, `Use className="${prefix}-${value}" instead of ${p.name}: ${JSON.stringify(p.value)}.`);
          } else if (value === 0) {
            continue;
          } else if (prefix) {
            report(p.node, `${p.name}: ${JSON.stringify(p.value)} is off the spacing scale (4, 8, 12, 16, 20, 24, 32, 48).`);
          } else {
            report(p.node, `${p.name} has no spacing class. Use ${p.name.startsWith('padding') ? 'hds-p/px/py' : 'hds-m/mt/mb'} classes.`);
          }
        }
      }
    },
  },
  {
    id: 'hardcoded-typography',
    category: 'technical',
    severity: 'warning',
    summary: 'Inline font styles where a typography class should be used.',
    docs: 'assets/typography.md',
    check({ parsed, report }) {
      for (const el of parsed.elements) {
        if (el.component) continue;
        for (const p of styleProps(el)) {
          if (TYPE_PROPS.has(p.name)) {
            report(p.node, `Style text with a typography class (hds-h1…hds-h6, hds-text-*) instead of ${p.name}.`);
          }
        }
      }
    },
  },
  {
    id: 'unlayered-reset',
    category: 'technical',
    severity: 'warning',
    summary: 'A global reset outside `@layer reset`, which would override hds styles.',
    docs: 'README.md',
    cssOnly: true,
    check() {}, // runs in css.js
  },
  {
    id: 'raw-element',
    category: 'technical',
    severity: 'warning',
    summary: 'A native element that a design system component replaces.',
    docs: 'components.md',
    check({ parsed, system, report }) {
      for (const el of parsed.elements) {
        const suggest = RAW_ELEMENTS[el.tag]?.(el);
        if (suggest) {
          const doc = assetLink(system, suggest);
          report(el.node, `Use ${suggest} instead of <${el.tag}>.`, doc);
        }
      }
    },
  },
  {
    id: 'no-custom-styling',
    category: 'technical',
    severity: 'warning',
    summary: '`className` or `style` on a design system component.',
    docs: 'README.md',
    check({ parsed, report }) {
      for (const el of parsed.elements) {
        if (!el.component) continue;
        for (const name of ['className', 'style']) {
          if (has(el, name)) {
            report(el.attrs.get(name).attr, `Don't restyle ${el.component} with ${name}. Use its props, or wrap it in a layout element.`);
          }
        }
      }
    },
  },

  // ---------------------------------------------------------------- usage
  {
    id: 'requires-parent',
    category: 'usage',
    severity: 'error',
    summary: 'A component used outside the component it belongs to.',
    check({ parsed, system, report }) {
      for (const el of parsed.elements) {
        const needs = REQUIRED_PARENT[el.component];
        if (!needs || !el.parent) continue; // a JSX root may be rendered inside its parent elsewhere
        if (!ancestors(el).some((a) => a.component === needs)) {
          report(el.node, `${el.component} only works inside ${needs}.`, assetLink(system, el.component));
        }
      }
    },
  },
  {
    id: 'allowed-children',
    category: 'usage',
    severity: 'error',
    summary: 'A child that the parent component doesn\'t accept.',
    check({ parsed, system, report }) {
      for (const el of parsed.elements) {
        const allowed = ALLOWED_CHILDREN[el.component];
        if (!allowed) continue;
        for (const child of el.children) {
          if (!allowed.includes(child.component)) {
            report(child.node, `${el.component} only takes ${allowed.join(' and ')} as children, not <${child.tag}>.`, assetLink(system, el.component));
          }
        }
      }
    },
  },
  {
    id: 'field-control',
    category: 'usage',
    severity: 'error',
    summary: 'HdsField must wrap exactly one supported control.',
    docs: 'assets/field.md',
    check({ parsed, report }) {
      for (const el of named(parsed.elements, 'HdsField')) {
        const groups = el.children.filter((c) => ['HdsCheckboxGroup', 'HdsRadioGroup'].includes(c.component));
        for (const g of groups) report(g.node, `Don't put ${g.component} in an HdsField. It has its own label, description and error.`);
        if (el.dynamicChildren || groups.length) continue;
        const controls = el.children.filter((c) => FIELD_CONTROLS.includes(c.component));
        const others = el.children.filter((c) => !FIELD_CONTROLS.includes(c.component));
        if (controls.length !== 1 || others.length) {
          report(el.node, `HdsField takes exactly one child: ${FIELD_CONTROLS.join(', ')}.`);
        }
      }
    },
  },
  {
    id: 'field-label-ignored',
    category: 'usage',
    severity: 'warning',
    summary: 'An HdsField label around a control that names itself.',
    docs: 'assets/field.md',
    check({ parsed, report }) {
      for (const el of named(parsed.elements, 'HdsField')) {
        if (el.dynamicChildren) continue; // the control is chosen at runtime
        const child = el.children.find((c) => SELF_LABELLED.includes(c.component));
        if (child && has(el, 'label')) {
          report(el.attrs.get('label').attr, `HdsField doesn't show a label around ${child.component}. Put the text in ${child.component}'s own label.`);
        }
      }
    },
  },
  {
    id: 'invalid-needs-error',
    category: 'usage',
    severity: 'warning',
    summary: '`invalid` without an `error` message.',
    check({ parsed, system, report }) {
      for (const el of parsed.elements) {
        if (WITH_ERROR.includes(el.component) && isTrue(el, 'invalid') && !has(el, 'error')) {
          report(el.attrs.get('invalid').attr, `${el.component} is invalid but has no error message to explain why.`, assetLink(system, el.component));
        }
      }
    },
  },
  {
    id: 'form-actions-last',
    category: 'usage',
    severity: 'warning',
    summary: 'HdsFormActions should be the last child of HdsForm.',
    docs: 'assets/form.md',
    check({ parsed, report }) {
      for (const el of named(parsed.elements, 'HdsForm')) {
        if (el.dynamicChildren) continue;
        el.children.forEach((c, i) => {
          if (c.component === 'HdsFormActions' && i !== el.children.length - 1) {
            report(c.node, 'Put HdsFormActions last in the form.');
          }
        });
      }
    },
  },
  {
    id: 'submit-outside-form',
    category: 'usage',
    severity: 'warning',
    summary: 'A submit button that isn\'t inside an HdsForm.',
    docs: 'assets/button.md',
    check({ parsed, report }) {
      for (const el of named(parsed.elements, 'HdsButton')) {
        if (str(el, 'type') === 'submit' && el.parent && !ancestors(el).some((a) => a.component === 'HdsForm' || a.tag === 'form')) {
          report(el.attrs.get('type').attr, 'type="submit" only does something inside an HdsForm.');
        }
      }
    },
  },
  {
    id: 'one-primary-button',
    category: 'usage',
    severity: 'warning',
    summary: 'More than one primary button side by side.',
    docs: 'guidelines/button.md',
    check({ parsed, report }) {
      const isPrimary = (b) => b.component === 'HdsButton' && !has(b, 'appearance') && (!has(b, 'color') || str(b, 'color') === 'primary');
      const seen = new Set();
      for (const el of parsed.elements) {
        if (!isPrimary(el) || !el.parent || seen.has(el.parent)) continue;
        const siblings = (el.slot ? el.parent.slotted : el.parent.children).filter(isPrimary);
        if (siblings.length > 1) {
          seen.add(el.parent);
          report(siblings[1].node, `${siblings.length} primary buttons together. Keep one for the main action and make the others appearance="outline".`);
        }
      }
    },
  },
  {
    id: 'tooltip-child',
    category: 'usage',
    severity: 'warning',
    summary: 'HdsTooltip needs one enabled HdsButton or HdsToggle child.',
    docs: 'assets/tooltip.md',
    check({ parsed, report }) {
      for (const el of named(parsed.elements, 'HdsTooltip')) {
        if (el.dynamicChildren) continue;
        const [child, ...rest] = el.children;
        if (!child || rest.length || el.text || !['HdsButton', 'HdsToggle'].includes(child.component)) {
          report(el.node, 'HdsTooltip wraps exactly one HdsButton or HdsToggle.');
        } else if (isTrue(child, 'disabled')) {
          report(child.node, "A disabled button can't be hovered or focused, so its tooltip never shows.");
        }
      }
    },
  },
  {
    id: 'checkbox-indeterminate-checked',
    category: 'usage',
    severity: 'warning',
    summary: 'A checkbox that is both indeterminate and checked.',
    docs: 'assets/checkbox.md',
    check({ parsed, report }) {
      for (const el of named(parsed.elements, 'HdsCheckbox')) {
        if (isTrue(el, 'indeterminate') && (isTrue(el, 'defaultChecked') || isTrue(el, 'checked'))) {
          report(el.node, 'indeterminate hides the tick, so defaultChecked/checked has no visible effect.');
        }
      }
    },
  },
  {
    id: 'nested-dialog',
    category: 'usage',
    severity: 'warning',
    summary: 'A dialog opened from inside another dialog.',
    docs: 'guidelines/dialog.md',
    check({ parsed, report }) {
      for (const el of named(parsed.elements, 'HdsDialog')) {
        if (ancestors(el).some((a) => a.component === 'HdsDialog')) report(el.node, "Don't open a dialog from another dialog.");
      }
    },
  },
  {
    id: 'menu-separator-edge',
    category: 'usage',
    severity: 'warning',
    summary: 'A menu separator at the start or end of a menu.',
    docs: 'assets/menu.md',
    check({ parsed, report }) {
      for (const el of named(parsed.elements, 'HdsMenu')) {
        if (el.dynamicChildren) continue;
        const items = el.children;
        for (const i of [0, items.length - 1]) {
          if (items[i]?.component === 'HdsMenuSeparator') report(items[i].node, 'Use HdsMenuSeparator only between groups of items.');
        }
      }
    },
  },
  {
    id: 'option-count',
    category: 'usage',
    severity: 'info',
    summary: 'A choice component with a number of options its guideline advises against.',
    check({ parsed, report }) {
      for (const el of parsed.elements) {
        if (el.component === 'HdsSelect') {
          const items = el.attrs.get('items');
          if (items?.kind === 'array' && items.length < 4) {
            report(el.node, `Only ${items.length} options: an HdsRadioGroup or HdsToggleGroup shows them all at once.`, 'guidelines/select.md');
          }
        }
        if (el.component === 'HdsRadioGroup' && !el.dynamicChildren) {
          const n = named(el.children, 'HdsRadio').length;
          if (n > 5) report(el.node, `${n} radios: an HdsSelect is easier to scan with more than five options.`, 'guidelines/radio-group.md');
        }
        if (el.component === 'HdsTabs' && !el.dynamicChildren) {
          const n = named(el.children, 'HdsTab').length;
          if (n > 6) report(el.node, `${n} tabs: more than six needs a different layout.`, 'guidelines/tabs.md');
        }
      }
    },
  },
  {
    id: 'redundant-default',
    category: 'usage',
    severity: 'info',
    summary: 'A prop set to its default value.',
    check({ parsed, system, report }) {
      for (const el of parsed.elements) {
        const defaults = system.defaults[el.component];
        if (!defaults) continue;
        for (const [name, value] of Object.entries(defaults)) {
          const a = el.attrs.get(name);
          if (a && (a.kind === 'string' || a.kind === 'boolean') && a.value === value) {
            report(a.attr, `${name}=${JSON.stringify(value)} is the default. Leave it out.`, assetLink(system, el.component));
          }
        }
      }
    },
  },
  {
    id: 'button-label-case',
    category: 'usage',
    severity: 'info',
    summary: 'A button label in Title Case.',
    docs: 'guidelines/button.md',
    check({ parsed, report }) {
      for (const el of parsed.elements) {
        if (!['HdsButton', 'HdsMenuItem', 'HdsToggle'].includes(el.component) || !el.text) continue;
        const words = el.text.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w));
        const small = new Set(['a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'the']);
        const titled = words.slice(1).filter((w) => !small.has(w.toLowerCase()) && w.length > 1 && /^[A-Z][a-z]/.test(w));
        // Two or more capitalised words after the first; one could be a proper noun ("Sign in with Google").
        if (titled.length >= 2) {
          report(el.node, `Use sentence case: "${el.text}" → "${words[0]} ${words.slice(1).join(' ').toLowerCase()}".`);
        }
      }
    },
  },
];
