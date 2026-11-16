---
name: create-asset
description: Creates or updates a component asset file in the hds docs (packages/ui/docs/assets/<component>.md) from the component's source in packages/ui. Use when the user asks to create, add, document, or update an asset for a design system component, or invokes /create-asset.
disable-model-invocation: true
---

# Create Asset

Writes `packages/ui/docs/assets/<component>.md` for one design system component, so every hds skill (prototype, build, lint and ask) can use it without guessing.

The finished HdsButton asset is the reference example: [packages/ui/docs/assets/button.md](../../../packages/ui/docs/assets/button.md). The section template is in [template.md](template.md).

## Rules

1. **Source is the truth.** Every import, prop, value, default and visual value must trace back to a file in the repo. Never add a prop because it would probably work.
2. **Asset = API, guideline = usage.** The asset says what the component *can* do and how to write it. When to use which variant, grouping, ordering and content advice go in `guidelines/<component>.md`.
3. **Write for the generator, not for people.** Show exact JSX, not TypeScript types. Optimise for a model translating user input into props.
4. **List what's impossible.** Anything a user might plausibly ask for that the component can't do goes in "Not supported", so the generator reports it instead of approximating it.

## Workflow

Copy this checklist and track progress:

```
- [ ] 1. Gather sources
- [ ] 2. Extract the API
- [ ] 3. Extract visual values
- [ ] 4. Write the asset
- [ ] 5. Verify
- [ ] 6. Hand off
```

### 1. Gather sources

Read all that exist for the component (`<Name>` = the PascalCase folder name without the prefix, e.g. `Button`; the component is exported as `Ds<Name>`, e.g. `HdsButton`):

- `packages/ui/src/components/<Name>/<Name>.tsx`: props, types, defaults, constraints
- `packages/ui/src/components/<Name>/index.ts` and `packages/ui/src/index.ts`: public exports and import path
- `packages/ui/src/components/<Name>/<Name>.module.css`: sizes, colours, states (via `data-*` attributes)
- `packages/ui/src/components/<Name>/README.md`: documented usage, rules, examples
- `packages/ui/src/*.css` (`color.css`, `spacing.css`, `typography.css`, `radius.css`, `focus.css`, `motion.css`): resolve every `var(--hds-*)` to a real value
- `packages/ui/src/icons/index.tsx`: if the component accepts icons
- `apps/sandbox/src/pages/<Name>Playground.tsx`: how the team composes and serialises it
- `packages/ui/package.json`: package name and `exports`

If the component isn't exported from `packages/ui/src/index.ts`, stop and tell the user. The generator can't import it.

### 2. Extract the API

From the `.tsx`, record for each prop: name, allowed values, default, and constraints. Look closely for:

- **Destructured defaults** (`size = 'medium'`): these values get omitted in output.
- **Type unions / `never`**: props that can't combine (e.g. HdsButton's `color` is `never` with `appearance="outline"`).
- **Props that depend on another** (e.g. `iconNode` only renders when `icon` is true).
- **Pass-through props** (`...rest`, Base UI props): leave these out of the asset. The generator produces static output, so handlers, `className`, `style`, `type` and `aria-*` are excluded.
- **`children`**: plain text, specific subcomponents, or free content?
- **Compound parts** (e.g. `Card.Header`): document the required nesting in a "Structure" section.

### 3. Extract visual values

For image input, resolve the CSS through the variable files to concrete values for each variant and state:

- Fill, text and border colour as hex
- Size scale: height, font size, corner radius, padding
- Disabled/other state looks, especially where states look identical (e.g. all disabled filled Buttons are the same grey, so colour can't be read)
- Icon set and position

### 4. Write the asset

Write `packages/ui/docs/assets/<name>.md` (lowercase file name) using [template.md](template.md). Drop sections that don't apply (e.g. no "Icon" table if there are no icons); don't leave empty headings.

Key requirements:

- **Props table** has a "Write as" column with exact JSX and a "Default (omit)" column.
- **Base setup** starts from the minimal valid usage and lists props to add in a fixed order. No inline comments inside JSX, no props set to their defaults.
- **Composing rules** cover omitting defaults, bare boolean attributes (`disabled`, not `disabled={true}`), invalid combinations, and prop dependencies.
- **Input-to-prop mapping** includes the synonyms users actually say (e.g. "secondary" → outline, "danger" → red). Map the user's *description*, not the content: a button labelled "Delete" isn't automatically red.
- **Not supported** lists common requests from other design systems that this component lacks (loading, full width, links, extra variants, extra sizes, custom styling, etc.) with what to do instead.
- **Code snippet translation** shows a realistic non-design-system snippet (Bootstrap, Tailwind or plain HTML) converted, including one dropped element.

### 5. Verify

- [ ] Every prop, value and default matches the `.tsx`
- [ ] Every hex/px value traces to a variable file in `packages/ui/src/` or the module CSS
- [ ] Import path and export names match `packages/ui/src/index.ts`
- [ ] No example sets a prop to its default or uses an invalid combination
- [ ] No handlers, `className`, `style` or pass-through props in examples
- [ ] Usage advice moved out to the guideline (not in the asset)
- [ ] Terminology matches other assets (variant, size, state, "Differences", "Not available")

### 6. Hand off

- If `packages/ui/docs/guidelines/<name>.md` doesn't exist, create it empty.
- Add or update the component's row in `packages/ui/docs/components.md` (exports, use for, what it replaces, Base UI part, links).
- Search the other assets for the component's name and for what it does (e.g. "switch", "radio"). Update any "Not supported", mapping or translation entry that sends users elsewhere for it.
- In your response, list usage rules you found (e.g. in the README) that belong in the guideline, and any source inconsistencies (README vs `.tsx`). Don't silently pick one.
- No change to any skill's `SKILL.md` is needed; they discover assets by globbing `packages/ui/docs/assets/*.md`.
- If the component adds a structural rule the linter can check (a required parent or child, an invalid combination), add it to `packages/lint/src/rules.js`, with a fixture in `packages/lint/test/`.
