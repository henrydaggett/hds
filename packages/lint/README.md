# @hds/lint

Checks code against the hds design system. Each rule is either:

- **technical**: the code breaks the system's API or bypasses its variables (unknown exports and classes, sub-path imports, raw colours, raw `<button>`s).
- **usage**: the code works, but uses a component the way the docs advise against (a radio outside its group, a group inside a field, two primary buttons side by side).

What it knows about the system (exports, variables, classes, prop defaults) is read from the installed `@hds/ui` package, not kept here, so it can't drift from the components. Every finding links to the doc in `@hds/ui/docs` that it enforces.

## Run it

```bash
pnpm lint:hds                       # from the repo root: lints apps/
pnpm exec hds-lint src --quiet      # any folder; --quiet hides info findings
pnpm exec hds-lint src --json       # for tools and the hds-lint skill
pnpm exec hds-lint --list-rules
```

It lints `.tsx`, `.jsx`, `.ts`, `.js` and `.css` files and skips `node_modules`, `dist`, `build` and the `@hds/ui` source. The exit code is 1 when there's at least one error.

Options: `--category technical|usage`, `--rule <id>`, `--ignore <text>` (each repeatable), `--json`, `--quiet`.

## Turning a rule off

Say why after ` -- `:

```tsx
{/* hds-lint-disable-next-line raw-element -- part of the code editor chrome */}
<button>Copy</button>
```

```css
/* hds-lint-disable hardcoded-color -- third-party theme */
```

With no rule ids, a comment turns off every rule.

## Rules

### Technical

| Rule | Severity | Checks |
| ---- | -------- | ------ |
| `no-subpath-import` | error | Import from the package root, `@hds/ui`, not its internal files. |
| `unknown-export` | error | `@hds/ui` has no export with this name. |
| `unknown-class` | error | An `hds-*` class that @hds/ui doesn't define. |
| `unknown-variable` | error | A `--hds-*` variable that @hds/ui doesn't define. |
| `hardcoded-color` | warning | A raw colour where a colour variable should be used. |
| `hardcoded-spacing` | warning | Inline margin, padding or gap where a spacing class should be used. |
| `hardcoded-typography` | warning | Inline font styles where a typography class should be used. |
| `raw-element` | warning | A native element that a design system component replaces. |
| `unlayered-reset` | warning | An unlayered element rule that sets margins, padding, fonts, borders or box sizing, which would override hds styles (hds ships its own reset). Other base styles, like a body background, are fine. |
| `no-custom-styling` | warning | `className` or `style` on a design system component. |

### Usage

| Rule | Severity | Checks |
| ---- | -------- | ------ |
| `requires-parent` | error | A component used outside the component it belongs to. |
| `allowed-children` | error | A child that the parent component doesn't accept. |
| `field-control` | error | HdsField must wrap exactly one supported control. |
| `field-label-ignored` | warning | An HdsField label around a control that names itself. |
| `invalid-needs-error` | warning | `invalid` without an `error` message. |
| `form-actions-last` | warning | HdsFormActions should be the last child of HdsForm. |
| `submit-outside-form` | warning | A submit button that isn't inside an HdsForm. |
| `one-primary-button` | warning | More than one primary button side by side. |
| `tooltip-child` | warning | HdsTooltip needs one enabled HdsButton or HdsToggle child. |
| `checkbox-indeterminate-checked` | warning | A checkbox that is both indeterminate and checked. |
| `nested-dialog` | warning | A dialog opened from inside another dialog. |
| `menu-separator-edge` | warning | A menu separator at the start or end of a menu. |
| `option-count` | info | A choice component with a number of options its guideline advises against. |
| `redundant-default` | info | A prop set to its default value. |
| `button-label-case` | info | A button label in Title Case. |

`unknown-variable`, `hardcoded-color` and `hardcoded-spacing` also run on CSS files. `unlayered-reset` runs only on CSS files.

## What it can't check

The script reads one file at a time and only checks what's certain from the code. It doesn't judge content or intent: whether a red button is really destructive, whether labels start with a verb, whether a dialog was the right choice. The `hds-lint` skill runs this script and then reviews those things against the guidelines.

TypeScript already rejects unknown props and invalid prop values on `Hds*` components, so this linter doesn't repeat that. Run `tsc` alongside it.

## Adding a rule

1. Add it to `src/rules.js` with an `id`, `category`, `severity`, `summary` and the doc it enforces.
2. Add a case that triggers it to `test/fixtures/bad.tsx` and an assertion to `test/lint.test.js`. The tests fail if any rule never fires.
3. Run `pnpm test`.
