# ds-build

A small React design system built on [Base UI](https://base-ui.com), plus a Vite sandbox with [DialKit](https://www.dialkit.dev) for tweaking components live.

Agent skills in `.cursor/skills` generate and check UI built from these components. `ds-prototype` turns text, images or code into a static single-page snippet; `ds-build`, `ds-lint` and `ds-ask` are planned. They all read the shared docs in `.cursor/skills/ds-reference`. See [.cursor/skills/README.md](.cursor/skills/README.md).

## Layout

```
packages/ui        @ds-build/ui: tokens, icons, components
  src/tokens.css   CSS variables (color, radius, spacing, type, motion)
  src/components/  one folder per component (tsx, CSS module, README)
apps/sandbox       Vite + React app for testing components with DialKit
.cursor/skills     agent skills; ds-reference holds the docs they share
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
```

## Components

| Component | Docs |
| --- | --- |
| DsButton | [packages/ui/src/components/Button/README.md](packages/ui/src/components/Button/README.md) |
| DsToggle | [packages/ui/src/components/Toggle/README.md](packages/ui/src/components/Toggle/README.md) |
| DsToggleGroup | [packages/ui/src/components/ToggleGroup/README.md](packages/ui/src/components/ToggleGroup/README.md) |
| DsTextInput | [packages/ui/src/components/TextInput/README.md](packages/ui/src/components/TextInput/README.md) |
| DsSelect | [packages/ui/src/components/Select/README.md](packages/ui/src/components/Select/README.md) |
| DsCheckbox | [packages/ui/src/components/Checkbox/README.md](packages/ui/src/components/Checkbox/README.md) |
| DsCheckboxGroup | [packages/ui/src/components/CheckboxGroup/README.md](packages/ui/src/components/CheckboxGroup/README.md) |
| DsField | [packages/ui/src/components/Field/README.md](packages/ui/src/components/Field/README.md) |
| DsFieldset | [packages/ui/src/components/Fieldset/README.md](packages/ui/src/components/Fieldset/README.md) |
| DsForm | [packages/ui/src/components/Form/README.md](packages/ui/src/components/Form/README.md) |
| DsRadioGroup, DsRadio | [packages/ui/src/components/RadioGroup/README.md](packages/ui/src/components/RadioGroup/README.md) |
| DsSwitch | [packages/ui/src/components/Switch/README.md](packages/ui/src/components/Switch/README.md) |
| DsTabs, DsTab | [packages/ui/src/components/Tabs/README.md](packages/ui/src/components/Tabs/README.md) |
| DsAccordion, DsAccordionItem | [packages/ui/src/components/Accordion/README.md](packages/ui/src/components/Accordion/README.md) |
| DsDialog, DsDialogClose | [packages/ui/src/components/Dialog/README.md](packages/ui/src/components/Dialog/README.md) |
| DsMenu, DsMenuItem, DsMenuSeparator | [packages/ui/src/components/Menu/README.md](packages/ui/src/components/Menu/README.md) |
| DsTooltip | [packages/ui/src/components/Tooltip/README.md](packages/ui/src/components/Tooltip/README.md) |
| DsSeparator | [packages/ui/src/components/Separator/README.md](packages/ui/src/components/Separator/README.md) |

## Using the package

The sandbox consumes `@ds-build/ui` from source through the pnpm workspace. Import the tokens once at the app root:

```tsx
import '@ds-build/ui/tokens.css';
import { DsButton } from '@ds-build/ui';

<DsButton color="blue" icon>New project</DsButton>
```

## Adding a component

1. Create `packages/ui/src/components/<Name>/` with `<Name>.tsx`, `<Name>.module.css`, `index.ts`, and `README.md`.
2. Build on the matching Base UI primitive when there is one, and style it with tokens from `tokens.css`.
3. Export it from `packages/ui/src/index.ts`.
4. Add a playground page in `apps/sandbox/src/pages/` that uses `useDialKit` for its props, and list it in `apps/sandbox/src/App.tsx`.
5. Run the `create-asset` skill to write its asset, then fill in its guideline and its row in `.cursor/skills/ds-reference/components.md`.
