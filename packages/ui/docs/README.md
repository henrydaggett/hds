# hds docs

The one knowledge base for the hds design system. Every skill reads from here, and nothing here is specific to one of them.

It ships inside the `@hds/ui` package, so the docs always match the code next to them:

- In this repo: `packages/ui/docs/`
- In a project that installs the package: `node_modules/@hds/ui/docs/`

## Contents

| Path | What it is | Source of truth for |
| ---- | ---------- | ------------------- |
| [components.md](components.md) | Catalog of every component: exports, purpose, the HTML or patterns it replaces, and links to its docs. | Which component exists for a job. |
| `assets/<name>.md` | The static API: exact JSX, allowed props and values, visual identification, input-to-prop mapping, what's not supported. Written for generating code without state or handlers. | How to write a component. |
| `guidelines/<name>.md` | Usage rules: when to use it, content, layout. | Whether a usage is right. |
| [`../src/components/<Name>/README.md`](../src/components) | The full runtime API, including controlled props and event handlers. | Interactive code. |
| [`../src/color.css`](../src/color.css), [`spacing.css`](../src/spacing.css), [`typography.css`](../src/typography.css), [`radius.css`](../src/radius.css), [`focus.css`](../src/focus.css), [`motion.css`](../src/motion.css) | One file per concept: its `--hds-*` variables, plus the classes for typography and spacing. | Raw values. |

File names are the lowercase component name without the `Ds` prefix: `HdsCheckboxGroup` → `checkbox-group.md`. Typography and spacing are documented as `typography.md` and `spacing.md` but aren't components.

## Which skill reads what

The skills live in `.cursor/skills/`. Each reads from here and keeps no copy of its own.

| Skill | Does | Reads |
| ----- | ---- | ----- |
| `hds-prototype` | One static single-page snippet from text, an image or code. | `components.md`, `assets/`, `guidelines/`. Never the runtime READMEs: output is static. |
| `hds-build` | Working code of any kind: state, handlers, several files. | `components.md`, `assets/`, `guidelines/`, then each component's runtime README for controlled props and handlers. |
| `hds-lint` | Runs the `hds-lint` script, then reviews code against the guidelines. | Script findings link to the doc they enforce; the review pass reads `guidelines/` and the "Not supported" lists in `assets/`. |
| `hds-ask` | Answers questions from these docs only. | `components.md` first, then whichever file answers the question. |
| `create-asset` | Writes a component's asset from its source. | The component source; writes to `assets/`. |

The `@hds/lint` package (`packages/lint`) is the script behind `hds-lint`. It reads exports, variables, classes and prop defaults from this package, so it stays in sync on its own.

## Rules for every skill

- Only the components in [components.md](components.md) exist. Never invent a component, prop, class or import path.
- Import everything from the package root, `@hds/ui`. Never from sub-paths.
- Style text with the typography classes and space with the spacing classes. Never hardcode colours, sizes or spacing that a variable or class covers.
- When the input asks for something the system can't do, say so instead of approximating it.

## Keeping it in sync

When a component is added or changed, update in this order (the `create-asset` skill does the asset):

1. The component's runtime `README.md` in `packages/ui`
2. `assets/<name>.md`
3. `guidelines/<name>.md`
4. Its row in [components.md](components.md)
5. Any other asset that listed it under "Not supported" or pointed elsewhere for it
6. Lint rules in `packages/lint/src/rules.js`, if it has a structural rule (a required parent or child, an invalid combination)
