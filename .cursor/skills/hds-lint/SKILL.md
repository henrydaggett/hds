---
name: hds-lint
description: Checks code against the hds design system in two passes - the hds-lint script for technical and structural rules, then a review against the guidelines for things a script can't judge (content, variant and component choice). Use when the user asks to lint, check, audit or review code for design system issues, or invokes /hds-lint. Reports by default; fixes only when asked.
disable-model-invocation: true
---

# hds-lint

Finds where code breaks or misuses the hds design system.

## Two kinds of finding

| Kind | Found by | Examples | Certainty |
| ---- | -------- | -------- | --------- |
| **Technical** | `hds-lint` script | Unknown export or class, sub-path import, raw colour or spacing, raw `<button>`, `className` on a component | Certain |
| **Usage** | `hds-lint` script | Radio outside its group, group inside a field, two primary buttons together, separator at the edge of a menu | Certain |
| **Review** | You, against the guidelines | Red button for a non-destructive action, labels that don't start with a verb, a select with three options that should be radios, a dialog for content that belongs on the page | Judgement |

Script findings are facts. Review findings are opinions backed by a guideline. Keep them apart in the report, and never present a review finding as certain.

## The docs

The docs root is `packages/ui/docs/` in this repo, or `node_modules/@hds/ui/docs/` in a project that installs `@hds/ui`. Each script finding includes a `docs` path to the file it enforces. For the review pass, read `guidelines/<name>.md` for each component used, plus `assets/<name>.md` for its "Not supported" list.

## Scope

Lint the paths the user gives. With none, lint the files changed on the current branch (`git diff --name-only` against the default branch, plus uncommitted changes); if there are none, ask which folder to lint.

## Steps

```
- [ ] 1. Run the script
- [ ] 2. Typecheck
- [ ] 3. Review against the guidelines
- [ ] 4. Report
- [ ] 5. Fix (only if asked)
```

### 1. Run the script

```bash
pnpm exec hds-lint <paths> --json
```

In this repo, `node packages/lint/bin/hds-lint.js <paths> --json` also works. `--list-rules` shows every rule. If the command isn't available, tell the user `@hds/lint` isn't installed and continue with steps 2 and 3 only.

Each finding has `file`, `line`, `column`, `rule`, `category` (`technical` or `usage`), `severity` (`error`, `warning`, `info`), `message` and `docs`.

If a finding is wrong (the code is correct and the rule misfired), don't report it as a problem. List it under "Possible false positives" with why, so the rule can be fixed in `packages/lint/src/rules.js`.

### 2. Typecheck

Run the project's typecheck. TypeScript is what catches unknown props and invalid prop values on `Hds*` components, so the script doesn't repeat it. Report those errors as technical findings.

### 3. Review against the guidelines

Read each file that uses `Hds*` components, and the guideline for each component it uses. Look for what the script can't see:

- **Variant choice**: primary vs outline, red only for destructive actions, blue only for an accent.
- **Component choice**: the guideline's "When to use" (a select for four or more options, radios for a few, a switch for settings that apply immediately, a checkbox for submitted choices, tabs vs toggle group).
- **Content**: labels, titles and messages against the guideline's "Content" rules (verbs first, sentence case, short, no punctuation on buttons).
- **Layout**: the guideline's "Layout" rules (button order, same sizes side by side, actions at the end of a form).
- **Faked features**: wrappers, styles or other components used to approximate something the asset lists under "Not supported".
- **Accessibility**: controls with no visible label and no `aria-label`; tooltips used as the only name of an icon button.

Only report what a guideline or asset actually says. Quote the line and give the file, e.g. `guidelines/button.md: "Use red only for destructive actions"`. If something looks off but no doc covers it, leave it out, or mention it as a question.

### 4. Report

```markdown
**hds-lint:** <n> files · <e> errors · <w> warnings · <i> info · <r> review notes

### <file>
- **error** `line:col` <message> — `<rule>` · <docs path>
- **warning** …
- **review** `line` <what and why> — <guideline file>: "<quoted rule>"

**Possible false positives:** <script findings that look wrong, and why>
```

- Group by file; within a file, errors first, then warnings, info, review.
- Leave out info findings unless the user asks or there are only a few.
- End with the top two or three things to fix first if there are many findings.

### 5. Fix (only if asked)

Fix errors first, then warnings, then the review notes the user agrees with. Re-run the script and the typecheck afterwards and report what's left. For a deliberate exception, add a disable comment with a reason instead of changing the code:

```tsx
{/* hds-lint-disable-next-line raw-element -- reason */}
```
