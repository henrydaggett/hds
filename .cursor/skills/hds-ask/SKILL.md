---
name: hds-ask
description: Answers questions about the hds design system - which component to use, what props and variants exist, usage rules, variables and classes - using only the hds docs. Read-only. Use when the user asks how the design system works, what it supports, or which component fits a need, or invokes /hds-ask.
disable-model-invocation: true
---

# hds-ask

Answers questions about the hds design system from its docs, and nothing else. It never edits files.

## The docs

The docs root is `packages/ui/docs/` in this repo, or `node_modules/@hds/ui/docs/` in a project that installs `@hds/ui`.

Where to look, in order:

| Question is about | Read |
| ----------------- | ---- |
| Whether something exists, or which component fits | `components.md`, then the candidates' guidelines |
| Props, values, variants, what it can't do | `assets/<name>.md` |
| When and how to use it, content and layout | `guidelines/<name>.md` |
| State, events, controlled props | `../src/components/<Name>/README.md` |
| Colour, spacing, type, radius, focus and motion values | `../src/styles/<concept>.css` (`color.css`, `spacing.css`…), `assets/typography.md`, `assets/spacing.md` |
| The reset and cascade layers | "Reset and cascade layers" in `README.md`, then `../src/styles/reset.css` |
| What the linter checks | `packages/lint/README.md` (or `node_modules/@hds/lint/README.md`) |

Always start with `components.md`, and read the files rather than answering from memory.

## Rules

1. **Answer only from the docs.** Don't fill gaps with general knowledge of Base UI, React or other design systems.
2. **Say when the docs don't cover it.** "The hds docs don't cover X" is a complete answer. Then give the closest documented option if there is one (most assets list alternatives under "Not supported").
3. **Cite your sources.** Name the files the answer came from.
4. **Docs disagree?** Say so, quote both, and treat the component's source (`../src/components/<Name>/<Name>.tsx`) as the deciding fact. Suggest fixing the doc that's wrong.
5. **Read-only.** Don't change files. If the user wants something built, point them to `/hds-prototype` for a static mock-up or `/hds-build` for working code; to check code, `/hds-lint`.

## Answer format

- Lead with the direct answer in a sentence or two.
- Add a short code example when it helps, copied from or consistent with the asset (exact prop names and values, nothing undocumented).
- Use a small table when comparing components or listing variants.
- End with the sources:

```markdown
Sources: `assets/radio-group.md`, `guidelines/select.md`
```

Keep it short. Answer the question that was asked; don't summarise the whole component.

## Examples

**"Should I use a select or radio buttons for 3 options?"** → Radio group: `guidelines/select.md` says a select is for about four or more options, and `guidelines/radio-group.md` says radios are for two to five options that should all be visible. Show a three-option `HdsRadioGroup`.

**"Can a button be icon-only?"** → No: `assets/button.md` lists icon-only buttons as not supported. For an icon-only control, use an `HdsToggle` with `iconNode` and `aria-label` (`assets/toggle.md`), or keep a text label.

**"Is there a date picker?"** → No. Date pickers are listed under "Not in the system" in `components.md`, and no asset covers them.
