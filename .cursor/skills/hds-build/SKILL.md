---
name: hds-build
description: Writes production code of any kind with the hds design system - components, pages, features and forms, with state, handlers, data and multiple files - following the project's own conventions. Use when the user asks to build, implement, add or refactor UI with hds components in a real codebase, or invokes /hds-build. For a quick static mock-up, use hds-prototype instead.
disable-model-invocation: true
---

# hds-build

Builds real, working UI with the hds design system: whatever the task needs, in whatever files and structure the project uses.

## How this differs from hds-prototype

| | hds-prototype | hds-build |
| --- | --- | --- |
| Output | One static snippet | Any code: new files, edits, several files |
| State and handlers | Never | Yes, using each component's runtime API |
| Something the system doesn't have | Left out and reported | Built from plain elements with hds variables and classes, and reported |
| Checked with | Its own review checklist | `tsc` and `hds-lint` |

## The docs

Everything about the system is in the docs root: `packages/ui/docs/` in this repo, or `node_modules/@hds/ui/docs/` in a project that installs `@hds/ui`. Read [its README](../../../packages/ui/docs/README.md) once to see what's where.

- `components.md`: what exists and what each component replaces. The only components there are.
- `assets/<name>.md`: exact props and values, valid combinations, what's not supported.
- `guidelines/<name>.md`: when and how to use it.
- `../src/components/<Name>/README.md`: the runtime API, including controlled props (`value`, `checked`, `open`) and handlers (`onValueChange`, `onCheckedChange`, `onOpenChange`, `onFormSubmit`). Assets leave these out because they're written for static output.

## Rules

1. **Use the system for everything it covers.** If `components.md` has a component for an element, use it. Never rebuild one with raw HTML.
2. **Import from `@hds/ui` only**, never from sub-paths. The CSS (reset, variables and classes) loads with any import from `@hds/ui`, so there's no stylesheet to add. Don't add a reset: hds ships one. Remove any app reset outside a layer (`* { … }`, `p { margin: 0 }`), because it overrides hds styles; extra base rules go in `@layer reset { … }` (see "Reset and cascade layers" in the docs README).
3. **Only documented props.** Check the asset and the runtime README. Don't pass `className` or `style` to `Hds*` components; wrap them in a layout element instead.
4. **Follow the guidelines**, not just the API: one primary button per section, red only for destructive actions, the right component for the number of options, sentence-case labels.
5. **Gaps get built, not faked.** For UI the system doesn't have (see "Not in the system" in `components.md`), build it from plain elements styled only with `var(--hds-*)` variables and `hds-*` classes, and list it in your report. Never approximate a missing component by misusing another (e.g. a toggle group as tabs).
6. **Fit the codebase.** Match its file layout, naming, state management, data fetching and tests. Read neighbouring code before writing.
7. **Prefer uncontrolled props** (`defaultValue`, `defaultChecked`, `defaultOpen`) unless the code needs to read or set the value. Then use the controlled pair from the runtime README.

## Steps

Copy this checklist and track progress:

```
- [ ] 1. Understand the task and the codebase
- [ ] 2. Map the UI to components
- [ ] 3. Read the docs for each component
- [ ] 4. Write the code
- [ ] 5. Typecheck and lint
- [ ] 6. Report
```

### 1. Understand the task and the codebase

Find where the change belongs, how similar features are built, and how the project runs, typechecks and tests. Check that `@hds/ui` is a dependency, and that the app has no reset of its own outside `@layer reset`.

### 2. Map the UI to components

List each piece of UI → component (from `components.md`) → the props and state it needs. Mark anything with no component as a gap.

### 3. Read the docs

For every component on the list, read its asset, guideline and runtime README. Read `assets/typography.md` and `assets/spacing.md` for text and layout. Don't rely on memory.

### 4. Write the code

Compose with the documented props. Lay out with plain elements and `hds-*` spacing classes; style text with typography classes. Keep state as close to where it's used as the codebase's conventions allow.

### 5. Typecheck and lint

Run the project's typecheck (TypeScript rejects unknown props and invalid values). Then lint the files you changed:

```bash
pnpm exec hds-lint <changed files or folders> --json
```

In this repo the command is also available as `pnpm lint:hds`. Fix every error and warning. If one is a deliberate exception (a third-party widget, a gap you built), add a disable comment with the reason:

```tsx
{/* hds-lint-disable-next-line raw-element -- date picker isn't in the system yet */}
```

If `hds-lint` isn't installed, say so in the report and review the code against the assets and guidelines by hand.

### 6. Report

Keep it short:

- What you built and the files changed
- Typecheck and lint results (and any disable comments you added, with reasons)
- **Not in the system:** UI you built yourself because no component exists. These are candidates for new components.
- **Differences:** where the docs made you change what was asked, and why
