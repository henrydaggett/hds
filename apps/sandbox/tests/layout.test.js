// Browser checks that hds renders at the sizes its docs promise, with only the
// hds reset (the sandbox adds none), and that the cascade layers behave.
// Runs the sandbox's dev server and renders snippets through the UI generator,
// then checks a production build, which bundles CSS differently from dev.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { after, before, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { build, createServer, preview } from 'vite';

const root = fileURLToPath(new URL('..', import.meta.url));
let server;
let browser;
let base;

before(async () => {
  server = await createServer({ root, logLevel: 'error', server: { port: 4390, strictPort: false } });
  await server.listen();
  base = server.resolvedUrls.local[0];
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  await server?.close();
});

/** Renders a snippet in the UI generator and returns the page. */
async function render(snippet) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await page.addInitScript((code) => localStorage.setItem('hds:generator', code), snippet);
  await page.goto(`${base}generator/`);
  await page.waitForSelector('.preview [data-ready]');
  return page;
}

const sizes = ['small', 'medium', 'large'];

/** Each control at each size, inside a 320px column, with its documented box. */
const controls = [
  { name: 'HdsButton', jsx: (s) => `<HdsButton size="${s}">Save</HdsButton>`, target: 'button', height: [28, 36, 44] },
  { name: 'HdsToggle', jsx: (s) => `<HdsToggle size="${s}">Bold</HdsToggle>`, target: 'button', height: [28, 36, 44] },
  { name: 'HdsTextInput', jsx: (s) => `<HdsTextInput size="${s}" aria-label="Name" />`, target: 'input', height: [28, 36, 44], fill: true },
  {
    name: 'HdsSelect',
    jsx: (s) => `<HdsSelect size="${s}" aria-label="Role" items={[{ value: 'a', label: 'A' }]} />`,
    target: 'button',
    height: [28, 36, 44],
    fill: true,
  },
  { name: 'HdsCheckbox', jsx: (s) => `<HdsCheckbox size="${s}" label="Terms" />`, target: '[role=checkbox]', height: [14, 16, 18], width: [14, 16, 18] },
  { name: 'HdsSwitch', jsx: (s) => `<HdsSwitch size="${s}" label="Sync" />`, target: '[role=switch]', height: [16, 20, 24], width: [26, 32, 40] },
  {
    name: 'HdsRadio',
    jsx: (s) => `<HdsRadioGroup size="${s}" aria-label="Plan"><HdsRadio value="a" label="A" /></HdsRadioGroup>`,
    target: '[role=radio]',
    height: [14, 16, 18],
    width: [14, 16, 18],
  },
  {
    name: 'HdsTab',
    jsx: (s) => `<HdsTabs size="${s}" aria-label="Views"><HdsTab value="a" label="Overview" /></HdsTabs>`,
    target: '[role=tab]',
    height: [28, 36, 44],
  },
];

const imports = `import { ${[...new Set(controls.map((c) => c.name).concat(['HdsRadioGroup', 'HdsTabs']))].join(', ')} } from '@hds/ui';`;

test('controls render at their documented sizes with only the hds reset', async () => {
  const cases = controls.flatMap((c) =>
    sizes.map((s) => `<div data-case="${c.name}-${s}" style={{ width: 320 }}>${c.jsx(s)}</div>`),
  );
  const page = await render(`${imports}
export default function App() {
  return <div data-ready="">${cases.join('\n')}</div>;
}`);

  const problems = [];
  for (const c of controls) {
    for (const [i, s] of sizes.entries()) {
      const box = await page.locator(`[data-case="${c.name}-${s}"] ${c.target}`).first().boundingBox();
      const got = { width: Math.round(box.width), height: Math.round(box.height) };
      const want = { height: c.height[i], width: c.width?.[i] ?? (c.fill ? 320 : undefined) };
      for (const dim of ['height', 'width']) {
        if (want[dim] !== undefined && got[dim] !== want[dim]) {
          problems.push(`${c.name} ${s}: ${dim} ${got[dim]}px, expected ${want[dim]}px`);
        }
      }
    }
  }
  await page.close();
  assert.deepEqual(problems, []);
});

test('the reset is applied and sits in the lowest layer', async () => {
  const page = await render(`import { HdsButton } from '@hds/ui';
export default function App() {
  return (
    <div data-ready="">
      <h2 id="heading">Plain heading</h2>
      <p id="spaced" className="hds-text-medium hds-mb-16">Spaced paragraph</p>
      <p id="plain">Plain paragraph</p>
      <HdsButton>Save</HdsButton>
    </div>
  );
}`);

  const styles = await page.evaluate(() => {
    const get = (sel) => getComputedStyle(document.querySelector(sel));
    return {
      bodyMargin: get('body').margin,
      boxSizing: get('#plain').boxSizing,
      plainMargin: get('#plain').marginBottom,
      headingWeight: get('#heading').fontWeight,
      spacedMargin: get('#spaced').marginBottom,
    };
  });
  assert.equal(styles.bodyMargin, '0px');
  assert.equal(styles.boxSizing, 'border-box');
  assert.equal(styles.plainMargin, '0px');
  assert.equal(styles.headingWeight, '400', 'headings start plain; typography classes style them');
  assert.equal(styles.spacedMargin, '16px', 'hds.spacing beats the typography margin reset');

  // App CSS outside a layer overrides the reset and hds variables (how apps theme).
  // With reduced motion on, the reset cuts transitions, so the new colour applies at once.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ content: 'body { margin: 7px; } :root { --hds-color-primary: rgb(1, 2, 3); }' });
  // A new style tag applies a moment after it's added, so wait for the values to settle.
  const settled = await page
    .waitForFunction(
      () =>
        getComputedStyle(document.body).marginTop === '7px' &&
        getComputedStyle(document.querySelector('.preview button')).backgroundColor === 'rgb(1, 2, 3)',
      undefined,
      { timeout: 5000 },
    )
    .then(() => true, () => false);
  const overridden = await page.evaluate(() => ({
    bodyMargin: getComputedStyle(document.body).marginTop,
    button: getComputedStyle(document.querySelector('.preview button')).backgroundColor,
  }));
  await page.close();
  assert.ok(settled, `app CSS outside a layer should win: got ${JSON.stringify(overridden)}`);
});

test('a production build loads the reset and variables on every page', async () => {
  // Pages that import named components let the bundler skip @hds/ui's entry
  // file; its CSS must still ship (package.json "sideEffects" keeps it).
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hds-sandbox-'));
  await build({ root, logLevel: 'error', build: { outDir, emptyOutDir: true } });
  const server = await preview({ root, logLevel: 'error', build: { outDir }, preview: { port: 4391, strictPort: false } });
  const url = server.resolvedUrls.local[0];
  const problems = [];
  try {
    for (const page of ['', 'generator/']) {
      const tab = await browser.newPage();
      await tab.goto(url + page);
      await tab.waitForLoadState('networkidle');
      const got = await tab.evaluate(() => ({
        primary: getComputedStyle(document.documentElement).getPropertyValue('--hds-color-primary').trim(),
        boxSizing: getComputedStyle(document.body).boxSizing,
        margin: getComputedStyle(document.body).marginTop,
      }));
      await tab.close();
      if (got.primary !== '#18181b') problems.push(`/${page}: --hds-color-primary is '${got.primary}'`);
      if (got.boxSizing !== 'border-box') problems.push(`/${page}: body box-sizing is ${got.boxSizing}`);
      if (got.margin !== '0px') problems.push(`/${page}: body margin is ${got.margin}`);
    }
  } finally {
    await new Promise((resolve) => server.httpServer.close(resolve));
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  assert.deepEqual(problems, []);
});
