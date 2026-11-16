# HdsCheckboxGroup

A labelled set of `HdsCheckbox`es that share one value (the list of ticked options). Has its own label, helper text and error, so it never goes inside a `HdsField`. Renders a `<fieldset>` with a legend.

## Quick reference

```tsx
import { HdsCheckboxGroup, HdsCheckbox } from '@hds/ui';

<HdsCheckboxGroup label="Label">
  <HdsCheckbox value="one" label="One" />
  <HdsCheckbox value="two" label="Two" />
</HdsCheckboxGroup>
```

Allowed props: `label`, `aria-label` (no visible label only), `description`, `error`, `invalid`, `size`, `orientation`, `defaultValue`, `name`, `disabled`, and `HdsCheckbox` children. Nothing else.

## Import

Use one import line from `@hds/ui`, shared with the other components in the snippet. Always import `HdsCheckbox` with it:

```tsx
import { HdsCheckboxGroup, HdsCheckbox } from '@hds/ui';
```

Never import from sub-paths. No CSS import is needed.

## Structure

Children are `HdsCheckbox`es only, each with a unique `value` and a `label`. Inside a group, a HdsCheckbox takes only `value`, `label` and `disabled`. HdsCheckbox props are in [checkbox.md](checkbox.md).

```tsx
<HdsCheckboxGroup label="…">
  <HdsCheckbox value="a" label="A" />
  <HdsCheckbox value="b" label="B" />
</HdsCheckboxGroup>
```

## Props

| Prop           | Write as                                        | Default (omit) | Notes                                                    |
| -------------- | ----------------------------------------------- | -------------- | -------------------------------------------------------- |
| `label`        | `label="Notifications"`                         | –              | Heading above the checkboxes.                            |
| `aria-label`   | `aria-label="Columns"`                          | –              | Only when there's no visible heading. Required then.     |
| `description`  | `description="Choose how we contact you."`      | –              | Grey helper text under the checkboxes.                   |
| `error`        | `error="Choose at least one."`                  | –              | Red text under the description. See composing rules.     |
| `invalid`      | `invalid`                                       | off            | Shows `error` immediately.                               |
| `size`         | `size="small"`, `size="large"`                  | `medium`       | Sizes every checkbox.                                    |
| `orientation`  | `orientation="horizontal"`                      | `vertical`     | Puts the checkboxes in a wrapping row.                   |
| `defaultValue` | `defaultValue={['email']}`, `defaultValue={['email', 'sms']}` | nothing ticked | `value`s of the ticked checkboxes. Always an array. |
| `name`         | `name="notifications"`                          | –              | Only inside a [`HdsForm`](form.md).                         |
| `disabled`     | `disabled`                                      | off            | Disables every checkbox.                                 |

These are the only props to use. No `value`, `onValueChange`, `className`, `style` or event handlers.

## Base setup

Start from the minimal group:

```tsx
<HdsCheckboxGroup label="Label">
  <HdsCheckbox value="one" label="One" />
  <HdsCheckbox value="two" label="Two" />
</HdsCheckboxGroup>
```

Then add only the props the input needs, in this order:

1. `label="…"`, or `aria-label="…"` if there's no visible heading
2. `name="…"` if it's inside a `HdsForm`
3. `description="…"` if there's helper text
4. `size="small"` or `size="large"` if it isn't medium
5. `orientation="horizontal"` if the checkboxes sit in a row
6. `defaultValue={[…]}` if any are ticked
7. `invalid` and `error="…"` if an error is shown
8. `disabled` if the whole group is disabled

Every compatible prop at once, for reference only:

```tsx
<HdsCheckboxGroup
  label="Interests"
  name="interests"
  description="Pick as many as you like."
  size="large"
  orientation="horizontal"
  defaultValue={['design']}
  invalid
  error="Choose at least one interest."
  disabled
>
  <HdsCheckbox value="design" label="Design" />
  <HdsCheckbox value="code" label="Code" />
</HdsCheckboxGroup>
```

### Composing rules

- Leave out props set to their defaults. Never write `size="medium"` or `orientation="vertical"`.
- Tick checkboxes through the group's `defaultValue`, never `defaultChecked` on a child. Every entry must match a child's `value`.
- Each `value` is a short lowercase id derived from the label (`"Push notifications"` → `"push"`).
- `error` without `invalid` only appears after a failed submit, so it's invisible in a static snippet. Write `invalid` with `error` when the error is shown in the input; write `error` alone only when the user describes a validation message for a form.
- To disable one option, put `disabled` on that `HdsCheckbox`; to disable all, put it on the group.
- Never wrap a HdsCheckboxGroup in a `HdsField`.
- Open tag on one line if it fits in ~100 characters, otherwise one attribute per line.

## Valid variants

| Variant      | Write as                                            |
| ------------ | --------------------------------------------------- |
| Vertical     | `<HdsCheckboxGroup label="…">`                         |
| Horizontal   | `<HdsCheckboxGroup label="…" orientation="horizontal">` |
| Invalid      | `<HdsCheckboxGroup label="…" invalid error="…">`       |

## Visual identification

Use this to match groups of checkboxes in an image.

| Looks like                                                                | Means                    |
| ------------------------------------------------------------------------- | ------------------------ |
| A 14px medium-weight heading `#18181b`, then checkboxes 8px apart         | `label` + vertical group |
| Checkboxes side by side, 20px apart, wrapping onto new lines              | `orientation="horizontal"` |
| 13px grey text `#7d7d86` under the checkboxes                             | `description`            |
| 13px red text `#dc2626` under the checkboxes                              | `invalid error="…"`      |
| Grey heading and checkboxes                                               | `disabled`               |

Two or more checkboxes with no heading and no shared meaning are separate `HdsCheckbox`es, not a group. HdsCheckbox box sizes are in [checkbox.md](checkbox.md); use them to pick `size`.

## Input-to-prop mapping

| User says                                                  | Write as                      |
| ---------------------------------------------------------- | ----------------------------- |
| checkbox list, "choose any", "select all that apply", options under a heading | `<HdsCheckboxGroup>` |
| inline, in a row, side by side                             | `orientation="horizontal"`    |
| "X and Y are ticked/selected"                              | `defaultValue={['x', 'y']}`   |
| helper text, hint                                          | `description="…"`             |
| error, "must choose one", validation message shown         | `invalid error="…"`           |
| small, compact / large, big                                | `size="small"` / `size="large"` |
| disabled, greyed out                                       | `disabled`                    |

## Not supported

The HdsCheckboxGroup can't do any of the following. Don't approximate them. Build the closest supported group (or leave it out) and report it under "Differences" or "Not available":

- Radio groups (pick exactly one, round inputs). Use a [`HdsRadioGroup`](radio-group.md).
- A "select all" parent that controls the others (it can't be wired up statically). Build it as a separate `HdsCheckbox` with `indeterminate` above the group only if the user asks, and report that it isn't connected.
- Nested groups or indented sub-options.
- Columns or grid layouts beyond the wrapping row.
- Description text under each option.
- Children other than `HdsCheckbox`.
- Any custom `className` or `style`.

## label and description

```tsx
<HdsCheckboxGroup label="Notifications" description="We'll only send what you choose.">
  <HdsCheckbox value="email" label="Email" />
  <HdsCheckbox value="sms" label="SMS" />
</HdsCheckboxGroup>
```

## orientation

```tsx
<HdsCheckboxGroup label="Days" orientation="horizontal">
  <HdsCheckbox value="mon" label="Mon" />
  <HdsCheckbox value="tue" label="Tue" />
  <HdsCheckbox value="wed" label="Wed" />
</HdsCheckboxGroup>
```

## defaultValue

```tsx
<HdsCheckboxGroup label="Notifications" defaultValue={['email', 'push']}>
  <HdsCheckbox value="email" label="Email" />
  <HdsCheckbox value="sms" label="SMS" />
  <HdsCheckbox value="push" label="Push notifications" />
</HdsCheckboxGroup>
```

## size

```tsx
<HdsCheckboxGroup label="Filters" size="small">
  <HdsCheckbox value="open" label="Open" />
  <HdsCheckbox value="closed" label="Closed" />
</HdsCheckboxGroup>
```

## invalid and error

```tsx
<HdsCheckboxGroup label="Interests" invalid error="Choose at least one interest.">
  <HdsCheckbox value="design" label="Design" />
  <HdsCheckbox value="code" label="Code" />
</HdsCheckboxGroup>
```

## disabled

```tsx
<HdsCheckboxGroup label="Sync" defaultValue={['calendar']} disabled>
  <HdsCheckbox value="calendar" label="Calendar" />
  <HdsCheckbox value="contacts" label="Contacts" />
</HdsCheckboxGroup>

<HdsCheckboxGroup label="Sync">
  <HdsCheckbox value="calendar" label="Calendar" />
  <HdsCheckbox value="contacts" label="Contacts" disabled />
</HdsCheckboxGroup>
```

## Combined example

```tsx
<HdsCheckboxGroup
  label="Toppings"
  description="Up to three."
  orientation="horizontal"
  defaultValue={['cheese', 'basil']}
>
  <HdsCheckbox value="cheese" label="Cheese" />
  <HdsCheckbox value="basil" label="Basil" />
  <HdsCheckbox value="olives" label="Olives" />
  <HdsCheckbox value="anchovies" label="Anchovies" disabled />
</HdsCheckboxGroup>
```

## Code snippet translation

Input:

```html
<fieldset>
  <legend>Contact preferences</legend>
  <label><input type="checkbox" name="contact" value="email" checked> Email</label>
  <label><input type="checkbox" name="contact" value="phone"> Phone</label>
  <label><input type="checkbox" name="contact" value="post" disabled> Post</label>
  <small class="text-muted">You can change this later.</small>
  <button type="button" onclick="selectAll()">Select all</button>
</fieldset>
```

Output:

```tsx
import { HdsCheckboxGroup, HdsCheckbox } from '@hds/ui';

<HdsCheckboxGroup label="Contact preferences" description="You can change this later." defaultValue={['email']}>
  <HdsCheckbox value="email" label="Email" />
  <HdsCheckbox value="phone" label="Phone" />
  <HdsCheckbox value="post" label="Post" disabled />
</HdsCheckboxGroup>
```

- `<fieldset>` + `<legend>` → `HdsCheckboxGroup label`; `<small>` → `description`.
- Each `<input type="checkbox">` becomes a `HdsCheckbox`; its `value` is kept and `checked` moves to the group's `defaultValue`.
- `name` is dropped because there's no `HdsForm` around it.
- The "Select all" button is left out: **Not available:** "Select all" action (can't be wired up statically).
