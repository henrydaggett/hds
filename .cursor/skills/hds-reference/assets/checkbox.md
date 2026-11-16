# HdsCheckbox

A checkbox with its label to the right. Clicking the label toggles the box. Can be ticked, unticked or indeterminate (a dash).

## Quick reference

```tsx
import { HdsCheckbox } from '@hds/ui';

<HdsCheckbox label="Label" />
```

Allowed props: `label`, `aria-label` (no visible label only), `size`, `defaultChecked`, `indeterminate`, `disabled`, `required`, `name`, `value` (inside a `HdsCheckboxGroup`). Nothing else.

## Import

Use one import line from `@hds/ui`, shared with the other components in the snippet:

```tsx
import { HdsCheckbox } from '@hds/ui';
```

Never import from sub-paths. No CSS import is needed. Don't import `HdsCheckIcon` or `HdsMinusIcon`: the box draws its own.

## Structure

A HdsCheckbox is used in one of three places:

- **On its own** (e.g. "Remember me"): `<HdsCheckbox label="…" />`.
- **In a `HdsCheckboxGroup`** for a labelled set of options: give it a `value` and leave out `size`, `defaultChecked` and `name`. See [checkbox-group.md](checkbox-group.md).
- **In a `HdsField`**, only when it needs helper text or an error message (e.g. "You must accept the terms"). The text stays on the checkbox's `label`; the HdsField adds `description`/`error` and gets no `label`. See [field.md](field.md).

```tsx
<HdsCheckbox label="Remember me" />

<HdsField error="You must accept the terms.">
  <HdsCheckbox label="I agree to the terms" required />
</HdsField>
```

## Props

| Prop             | Write as                           | Default (omit) | Notes                                                            |
| ---------------- | ---------------------------------- | -------------- | ---------------------------------------------------------------- |
| `label`          | `label="Remember me"`              | –              | The visible text. Plain text.                                    |
| `aria-label`     | `aria-label="HdsSelect row"`          | –              | Only when there's no visible text. Required then, and never with `label`. |
| `size`           | `size="small"`, `size="large"`     | `medium`       | Box 14/16/18px. Never inside a `HdsCheckboxGroup`.                  |
| `defaultChecked` | `defaultChecked`                   | unticked       | Starts ticked. Never inside a `HdsCheckboxGroup` (use the group's `defaultValue`). |
| `indeterminate`  | `indeterminate`                    | off            | Shows a dash (e.g. a "Select all" with some selected).           |
| `disabled`       | `disabled`                         | off            | Disabled state.                                                  |
| `required`       | `required`                         | off            | Must be ticked to submit a [`HdsForm`](form.md).                    |
| `name`           | `name="terms"`                     | –              | Only for a checkbox directly inside a `HdsForm` (no `HdsField` or group around it; otherwise `name` goes on the wrapper). |
| `value`          | `value="email"`                    | –              | Only inside a `HdsCheckboxGroup`, where it's required and unique.   |

These are the only props to use. No `checked`, `onCheckedChange`, `className`, `style` or event handlers. No children: the tag is always self-closing and the text goes in `label`.

## Base setup

Start from the minimal checkbox:

```tsx
<HdsCheckbox label="Label" />
```

Then add only the props the input needs, in this order:

1. `value="…"` if it's inside a `HdsCheckboxGroup`
2. `name="…"` if it's directly inside a `HdsForm`
3. `label="…"`, or `aria-label="…"` if there's no visible text
4. `size="small"` or `size="large"` if it isn't medium (not in a group)
5. `defaultChecked` if it's ticked (not in a group)
6. `indeterminate` if it shows a dash
7. `required` if it must be ticked
8. `disabled` if it's disabled

Every compatible prop at once, for reference only:

```tsx
<HdsCheckbox name="terms" label="I agree to the terms" size="large" defaultChecked required disabled />
```

### Composing rules

- Leave out any prop that's set to its default. Never write `size="medium"` or `defaultChecked={false}`.
- Write boolean props as bare attributes.
- Use `label` for the text. Never wrap a HdsCheckbox in a `<label>`, `<span>` or `HdsField label`.
- `indeterminate` overrides the tick visually, so don't combine it with `defaultChecked`.
- Several related checkboxes under one heading go in a `HdsCheckboxGroup`, not separate Fields.

## Valid variants

| Variant       | Write as                                    |
| ------------- | ------------------------------------------- |
| Unticked      | `<HdsCheckbox label="…" />`                    |
| Ticked        | `<HdsCheckbox label="…" defaultChecked />`     |
| Indeterminate | `<HdsCheckbox label="…" indeterminate />`      |
| No visible label | `<HdsCheckbox aria-label="…" />`            |

Each works in every size and can be disabled.

## Visual identification

Use this to match checkboxes in an image. A round control is a radio button: use a [`HdsRadioGroup`](radio-group.md). A pill with a sliding knob is a [`HdsSwitch`](switch.md).

| Looks like                                                       | Means             |
| ---------------------------------------------------------------- | ----------------- |
| Small white square, 1px grey border `#c4c4ca`                    | Unticked          |
| Near-black square `#18181b` with a white tick                    | `defaultChecked`  |
| Near-black square `#18181b` with a white dash                    | `indeterminate`   |
| Light grey square `#eeeef0`, light border `#dcdce0`, grey tick or empty, grey label `#7d7d86` | `disabled` (ticked if the tick shows) |
| Red border `#dc2626` with red text below                         | In a `HdsField` with `invalid error="…"` |

A ticked checkbox in any other colour (blue, green) is still `defaultChecked`; report the colour under "Differences".

**Size** (pick the nearest; measure the box):

| Size   | Box  | Label text | Box radius | Gap to label |
| ------ | ---- | ---------- | ---------- | ------------ |
| small  | 14px | 13px       | 3px        | 6px          |
| medium | 16px | 14px       | 4px        | 8px          |
| large  | 18px | 16px       | 5px        | 10px         |

If unclear, use medium (omit `size`).

## Input-to-prop mapping

| User says                                         | Write as                     |
| ------------------------------------------------- | ---------------------------- |
| checkbox, tick box, check box, opt-in             | `<HdsCheckbox label="…" />`     |
| checked, ticked, selected, on                     | `defaultChecked`             |
| unchecked, empty, off                             | no props                     |
| partially selected, mixed, some selected, dash    | `indeterminate`              |
| required, must accept                             | `required`                   |
| disabled, greyed out                              | `disabled`                   |
| small, compact / large, big                       | `size="small"` / `size="large"` |
| list of checkboxes, "choose any", multiple options under a heading | `HdsCheckboxGroup`, see [checkbox-group.md](checkbox-group.md) |
| switch, on/off slider                             | [`HdsSwitch`](switch.md)      |
| radio buttons, choose one                         | [`HdsRadioGroup`](radio-group.md) |

## Not supported

The HdsCheckbox can't do any of the following. Don't approximate them with other props, wrappers, raw HTML or styles. Build the closest supported checkbox (or leave it out) and report it under "Differences" or "Not available":

- Radio buttons (single choice, round). Use a [`HdsRadioGroup`](radio-group.md); don't substitute checkboxes.
- Switches. Use a [`HdsSwitch`](switch.md).
- HdsCheckbox cards or tiles (a bordered box around the checkbox and text).
- A description line under the label. Wrap in a `HdsField` with `description` if the user asks for helper text.
- Links or bold text inside the label. Use plain text and report it.
- Label on the left of the box.
- Colours other than black for the ticked box.
- Sizes other than small, medium and large.
- Any custom `className` or `style`.

## label and aria-label

```tsx
<HdsCheckbox label="Remember me" />
<HdsCheckbox aria-label="HdsSelect row" />
```

## size

```tsx
<HdsCheckbox size="small" label="Small" />
<HdsCheckbox label="Medium" />
<HdsCheckbox size="large" label="Large" />
```

## defaultChecked and indeterminate

```tsx
<HdsCheckbox label="Email me updates" defaultChecked />
<HdsCheckbox label="Select all" indeterminate />
```

## disabled

```tsx
<HdsCheckbox label="Sync contacts" disabled />
<HdsCheckbox label="Sync contacts" defaultChecked disabled />
```

## required and name

```tsx
<HdsForm>
  <HdsCheckbox name="remember" label="Remember me" />
  <HdsField name="terms" error="You must accept the terms.">
    <HdsCheckbox label="I agree to the terms" required />
  </HdsField>
</HdsForm>
```

## Combined example

```tsx
<HdsCheckbox size="small" label="Include archived projects" defaultChecked disabled />
```

## Code snippet translation

Input:

```html
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="remember" checked>
  <label class="form-check-label" for="remember">Remember me</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="terms" required>
  <label class="form-check-label" for="terms">I accept the <a href="/terms">terms</a></label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="plan" id="free">
  <label class="form-check-label" for="free">Free</label>
</div>
```

Output:

```tsx
import { HdsCheckbox } from '@hds/ui';

<HdsCheckbox label="Remember me" defaultChecked />
<HdsCheckbox label="I accept the terms" required />
```

- Each `form-check` becomes one `HdsCheckbox`; the `<label>` text moves to `label`; `checked` → `defaultChecked`.
- The link is flattened to text: **Differences:** "terms" is plain text, not a link.
- The radio button belongs in a [`HdsRadioGroup`](radio-group.md) with the other plan options. On its own here it has no group label or siblings, so it's left out: **Not available:** "Free" radio button (needs its group).
- `id`, `for` and classes are dropped.
