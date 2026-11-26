# hds

A small React design system built on [Base UI](https://base-ui.com), plus a Vite sandbox with [DialKit](https://www.dialkit.dev) for tweaking components live.

**Live sandbox:** https://henrydaggett.github.io/hds/ (playgrounds) and https://henrydaggett.github.io/hds/generator/ (UI generator). It redeploys on every push to `main` once the tests and `hds-lint` pass; see [`.github/workflows/pages.yml`](.github/workflows/pages.yml).

Agent skills in `.claude/skills` prototype, build, lint and answer questions about UI built from these components. They all read one knowledge base, the docs in [`packages/ui/docs`](packages/ui/docs/README.md), which ship with the package. See [.claude/skills/README.md](.claude/skills/README.md).

## Layout

```
packages/ui        @hds/ui: variables, icons, components
  docs/            the design system docs every skill reads (catalog, assets, guidelines)
  src/styles/      the reset, and one CSS file per concept: color, spacing, typography, radius, focus, motion
  src/components/  one folder per component (tsx, CSS module, README)
packages/lint      @hds/lint: the hds-lint command (technical and usage rules)
apps/sandbox       Vite + React app for testing components with DialKit
.claude/skills     agent skills: hds-prototype, hds-build, hds-lint, hds-ask, create-asset
```

## Run locally

Requires Node 20+ and pnpm 10.

```bash
pnpm install
pnpm dev          # sandbox at http://127.0.0.1:4317
```

Other scripts:

```bash
pnpm typecheck    # typecheck every package
pnpm build        # typecheck the UI package and build the sandbox
pnpm lint:hds     # check apps/ against the design system (see packages/lint)
pnpm test         # linter tests, and browser tests for component sizes and the reset
```

## Components

| Component | Docs |
| --- | --- |
| HdsButton | [packages/ui/src/components/Button/README.md](packages/ui/src/components/Button/README.md) |
| HdsToggle | [packages/ui/src/components/Toggle/README.md](packages/ui/src/components/Toggle/README.md) |
| HdsToggleGroup | [packages/ui/src/components/ToggleGroup/README.md](packages/ui/src/components/ToggleGroup/README.md) |
| HdsTextInput | [packages/ui/src/components/TextInput/README.md](packages/ui/src/components/TextInput/README.md) |
| HdsSelect | [packages/ui/src/components/Select/README.md](packages/ui/src/components/Select/README.md) |
| HdsCheckbox | [packages/ui/src/components/Checkbox/README.md](packages/ui/src/components/Checkbox/README.md) |
| HdsCheckboxGroup | [packages/ui/src/components/CheckboxGroup/README.md](packages/ui/src/components/CheckboxGroup/README.md) |
| HdsField | [packages/ui/src/components/Field/README.md](packages/ui/src/components/Field/README.md) |
| HdsFieldset | [packages/ui/src/components/Fieldset/README.md](packages/ui/src/components/Fieldset/README.md) |
| HdsForm | [packages/ui/src/components/Form/README.md](packages/ui/src/components/Form/README.md) |
| HdsRadioGroup, HdsRadio | [packages/ui/src/components/RadioGroup/README.md](packages/ui/src/components/RadioGroup/README.md) |
| HdsSwitch | [packages/ui/src/components/Switch/README.md](packages/ui/src/components/Switch/README.md) |
| HdsTabs, HdsTab | [packages/ui/src/components/Tabs/README.md](packages/ui/src/components/Tabs/README.md) |
| HdsAccordion, HdsAccordionItem | [packages/ui/src/components/Accordion/README.md](packages/ui/src/components/Accordion/README.md) |
| HdsDialog, HdsDialogClose | [packages/ui/src/components/Dialog/README.md](packages/ui/src/components/Dialog/README.md) |
| HdsMenu, HdsMenuItem, HdsMenuSeparator | [packages/ui/src/components/Menu/README.md](packages/ui/src/components/Menu/README.md) |
| HdsTooltip | [packages/ui/src/components/Tooltip/README.md](packages/ui/src/components/Tooltip/README.md) |
| HdsSeparator | [packages/ui/src/components/Separator/README.md](packages/ui/src/components/Separator/README.md) |

## Using the package

The sandbox consumes `@hds/ui` from source through the pnpm workspace. The CSS, including a modern reset, loads with any import, so there's no stylesheet to add and no reset to write (see [Reset and cascade layers](packages/ui/docs/README.md#reset-and-cascade-layers)):

```tsx
import { HdsButton } from '@hds/ui';

<HdsButton color="blue" icon>New project</HdsButton>
```

## Adding a component

1. Create `packages/ui/src/components/<Name>/` with `<Name>.tsx`, `<Name>.module.css`, `index.ts`, and `README.md`.
2. Build on the matching Base UI primitive when there is one, and style it with the variables in `packages/ui/src/styles/`. It can rely on the reset (border-box sizing, no browser margins, unstyled buttons).
3. Export it from `packages/ui/src/index.ts`.
4. Add a playground page in `apps/sandbox/src/pages/` that uses `useDialKit` for its props, and list it in `apps/sandbox/src/App.tsx`. If it has sizes, add them to `apps/sandbox/tests/layout.test.js`.
5. Run the `create-asset` skill to write its asset, then fill in its guideline and its row in `packages/ui/docs/components.md`.
6. If it has structural rules (a required parent or child), add them to `packages/lint/src/rules.js` with a test fixture.
