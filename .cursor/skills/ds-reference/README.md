# ds-reference

Shared design system knowledge for every ds-build skill. This folder isn't a skill. Skills read from it, and nothing here is specific to one of them.

## Contents

| Path | What it is | Source of truth for |
| ---- | ---------- | ------------------- |
| [components.md](components.md) | Catalog of every component: exports, purpose, the HTML or patterns it replaces, and links to its docs. | Which component exists for a job. |
| `assets/<name>.md` | The static API: exact JSX, allowed props and values, visual identification, input-to-prop mapping, what's not supported. Written for generating code without state or handlers. | How to write a component. |
| `guidelines/<name>.md` | Usage rules: when to use it, content, layout. | Whether a usage is right. |
| `packages/ui/src/components/<Name>/README.md` (in the repo, not this folder) | The full runtime API, including controlled props and event handlers. | Interactive code. |
| `packages/ui/src/tokens.css` and `utilities.css` (in the repo) | Design tokens (`--ds-*`) and the typography and spacing classes. | Raw values. |

File names are the lowercase component name without the `Ds` prefix: `DsCheckboxGroup` → `checkbox-group.md`. Typography and spacing are documented as `typography.md` and `spacing.md` but aren't components.

## Which skill reads what

| Skill | Status | Reads |
| ----- | ------ | ----- |
| `ds-prototype` | Ready | `assets/` and `guidelines/`. Static output only, so it never needs the runtime READMEs. |
| `ds-build` | Planned | `components.md`, `guidelines/`, then each component's runtime README for state and handlers. Uses `assets/` for exact prop values and visual identification. |
| `ds-lint` | Planned | `components.md` (the "Replaces" column finds raw HTML that should be a component), `assets/` (allowed props and values, invalid combinations) and `guidelines/` (usage rules). Checks for hardcoded values that should be tokens. |
| `ds-ask` | Planned | `components.md` first, then whichever asset, guideline or runtime README answers the question. Answers only from these files. |

## Rules for every skill

- Only the components in [components.md](components.md) exist. Never invent a component, prop, class or import path.
- Import everything from the package root, `@ds-build/ui`. Never from sub-paths.
- Style text with the typography classes and space with the spacing classes. Never hardcode colours, sizes or spacing that a token or class covers.
- When the input asks for something the system can't do, say so instead of approximating it.

## Keeping it in sync

When a component is added or changed, update in this order (the `create-asset` skill does the asset):

1. The component's runtime `README.md` in `packages/ui`
2. `assets/<name>.md`
3. `guidelines/<name>.md`
4. Its row in [components.md](components.md)
5. Any other asset that listed it under "Not supported" or pointed elsewhere for it
