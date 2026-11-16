import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { lint, rules } from '../src/index.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixture = (name) => path.join(here, 'fixtures', name);
const run = (name, options) => lint([fixture(name)], { cwd: here, ...options }).findings;
const ids = (findings) => new Set(findings.map((f) => f.rule));

test('a file that follows the system has no findings', () => {
  assert.deepEqual(run('good.tsx'), []);
});

test('every script rule fires on the bad fixture', () => {
  const found = ids(run('bad.tsx'));
  for (const id of rules.filter((r) => !r.cssOnly).map((r) => r.id)) assert.ok(found.has(id), `expected rule ${id} to fire`);
});

test('specific findings', () => {
  const findings = run('bad.tsx');
  const messages = findings.map((f) => `${f.rule}: ${f.message}`);
  const expect = (rule, text) =>
    assert.ok(messages.some((m) => m.startsWith(`${rule}:`) && m.includes(text)), `${rule} with "${text}"\n${messages.join('\n')}`);

  expect('unknown-export', "'HdsCard'");
  expect('no-subpath-import', '@hds/ui/components/Switch');
  expect('unknown-class', "'hds-gap-10'");
  expect('hardcoded-spacing', 'className="hds-p-16"');
  expect('hardcoded-spacing', 'off the spacing scale');
  expect('hardcoded-color', 'var(--hds-color-neutral-900)');
  expect('raw-element', 'HdsCheckbox instead of <input>');
  expect('raw-element', 'HdsSeparator instead of <hr>');
  expect('requires-parent', 'HdsRadio only works inside HdsRadioGroup');
  expect('allowed-children', 'not <p>');
  expect('field-control', "Don't put HdsRadioGroup in an HdsField");
  expect('field-control', 'exactly one child');
  expect('field-label-ignored', 'HdsCheckbox');
  expect('invalid-needs-error', 'HdsField');
  expect('tooltip-child', 'disabled');
  expect('menu-separator-edge', 'between groups');
  expect('option-count', 'Only 2 options');
  expect('nested-dialog', 'another dialog');
  expect('submit-outside-form', 'type="submit"');
  expect('redundant-default', 'size="medium"');
  expect('button-label-case', '"Create New Project"');
  expect('unknown-variable', '--hds-color-txt');
  expect('form-actions-last', 'last');
  expect('hardcoded-typography', 'fontSize');
});

test('disable comments switch a rule off for the next line', () => {
  const selects = run('bad.tsx').filter((f) => f.rule === 'raw-element' && f.message.includes('<select>'));
  assert.equal(selects.length, 0);
});

test('a radio at the root of a component is not flagged', () => {
  // It may be rendered inside a group somewhere else.
  const lost = run('bad.tsx').filter((f) => f.rule === 'requires-parent');
  assert.equal(lost.length, 1);
});

test('css checks', () => {
  const messages = run('bad.css').map((f) => `${f.rule}: ${f.message}`);
  for (const text of [
    'hardcoded-spacing: Use var(--hds-space-4) instead of 16px.',
    'hardcoded-spacing: Use var(--hds-space-3) instead of 12px.',
    'hardcoded-color: Use var(--hds-color-neutral-900) instead of #18181b.',
    "hardcoded-color: rgb(0 0 0 / 0.5) isn't a design system colour. Use a --hds-color-* variable.",
    "unknown-variable: '--hds-color-bordr' isn't an hds variable.",
    "unlayered-reset: Put 'p, h1' in @layer reset { … }. Outside a layer it overrides every hds style.",
    "unlayered-reset: Put '*, *::before' in @layer reset { … }. Outside a layer it overrides every hds style.",
  ]) {
    assert.ok(messages.includes(text), `missing: ${text}\n${messages.join('\n')}`);
  }
  assert.equal(messages.length, 7);
});

test('categories filter rules', () => {
  const findings = run('bad.tsx', { categories: ['usage'] });
  assert.ok(findings.length > 0);
  assert.ok(findings.every((f) => f.category === 'usage'));
});

test('every rule links to a docs file that exists', async () => {
  const fs = await import('node:fs');
  for (const f of run('bad.tsx')) assert.ok(fs.existsSync(path.resolve(here, f.docs)), `${f.rule}: ${f.docs}`);
});
