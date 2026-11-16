# HdsField

Wraps one form control with a label above it and optional helper text and error message below. Connects the label, description and validation to the control automatically.

## Quick reference

```tsx
import { HdsField, HdsTextInput } from '@hds/ui';

<HdsField label="Label">
  <HdsTextInput />
</HdsField>
```

Allowed props: `label`, `description`, `error`, `invalid`, `disabled`, `name`, and exactly one control child. Nothing else.

## Import

Use one import line from `@hds/ui`, shared with the control and other components:

```tsx
import { HdsField, HdsTextInput, HdsSelect } from '@hds/ui';
```

Never import from sub-paths. No CSS import is needed.

## Structure

Exactly one child, which must be a `HdsTextInput`, `HdsSelect`, `HdsCheckbox` or `HdsSwitch`. Put control props (`type`, `placeholder`, `required`, `items`…) on the child, as documented in [text-input.md](text-input.md), [select.md](select.md) and [checkbox.md](checkbox.md).

```tsx
<HdsField label="Email" description="We'll never share it." error="Enter a valid email.">
  <HdsTextInput type="email" required />
</HdsField>
```

Order on screen: label, control, description, error.

With a `HdsCheckbox` or [`HdsSwitch`](switch.md), the HdsField takes no `label`: the text stays on the checkbox or switch, and the HdsField only adds `description` and/or `error`. Only use a HdsField around a checkbox when one of those is needed.

```tsx
<HdsField error="You must accept the terms.">
  <HdsCheckbox label="I agree to the terms" required />
</HdsField>
```

## Props

| Prop          | Write as                                 | Default (omit) | Notes                                                       |
| ------------- | ---------------------------------------- | -------------- | ----------------------------------------------------------- |
| `label`       | `label="Email"`                          | –              | Text above the control. Never with a `HdsCheckbox` or `HdsSwitch` child. |
| `description` | `description="We'll never share it."`    | –              | Grey helper text under the control.                         |
| `error`       | `error="Enter a valid email address."`   | –              | Red text under the description. See composing rules.        |
| `invalid`     | `invalid`                                | off            | Red control border and shows `error` immediately.           |
| `disabled`    | `disabled`                               | off            | Disables the control and greys out the label.               |
| `name`        | `name="email"`                           | –              | Only inside a [`HdsForm`](form.md). Lowercase id from the label. |

These are the only props to use. No `className`, `style`, `id`, `aria-*` or event handlers.

## Base setup

Start from the minimal field:

```tsx
<HdsField label="Label">
  <HdsTextInput />
</HdsField>
```

Then add only the props the input needs, in this order:

1. `label="…"` (skip for a `HdsCheckbox` or `HdsSwitch` child)
2. `name="…"` if it's inside a `HdsForm`
3. `description="…"` if there's helper text
4. `invalid` if the field is shown in an error state
5. `error="…"` if there's an error message
6. `disabled` if the field is disabled

Every compatible prop at once, for reference only:

```tsx
<HdsField
  label="Username"
  name="username"
  description="Letters and numbers only."
  invalid
  error="This username is taken."
  disabled
>
  <HdsTextInput defaultValue="henry" />
</HdsField>
```

### Composing rules

- Write boolean props as bare attributes: `invalid`, `disabled`.
- **Static errors:** `error` alone only shows after a failed submit, so it's invisible in a static snippet. When the input shows or describes an error message *now*, write `invalid` with `error`. Write `error` without `invalid` only for a validation message on a `required` control in a `HdsForm` ("show 'Enter your name' if it's left empty").
- `invalid` without `error` gives a red border and no message. Only use it when the input shows a red field with no text.
- Prefer `disabled` on the HdsField over `disabled` on the control: it greys out the label too.
- `required` goes on the control, not the HdsField. There is no required asterisk.
- One control per HdsField. Several checkboxes under one heading are a [`HdsCheckboxGroup`](checkbox-group.md), and radio buttons are a [`HdsRadioGroup`](radio-group.md). Neither ever goes in a HdsField.
- Fields stack with even spacing inside a `HdsForm` or `HdsFieldset`. Outside them, place Fields one after another without wrappers unless the layout needs one.
- Open tag on one line if it fits in ~100 characters, otherwise one attribute per line.

## Valid variants

| Variant           | Write as                                         |
| ----------------- | ------------------------------------------------ |
| Label only        | `<HdsField label="…">`                              |
| With helper text  | `<HdsField label="…" description="…">`              |
| Invalid           | `<HdsField label="…" invalid error="…">`            |
| Disabled          | `<HdsField label="…" disabled>`                     |
| HdsCheckbox with error | `<HdsField error="…">` around a `HdsCheckbox`        |

## Visual identification

Use this to match labelled form fields in an image.

| Looks like                                                            | Means                       |
| --------------------------------------------------------------------- | --------------------------- |
| 14px medium-weight text `#18181b` directly above an input or dropdown (6px gap) | `label`           |
| 13px grey text `#7d7d86` under the control                            | `description`               |
| 13px red text `#dc2626` under the control (below any description)     | `invalid error="…"`         |
| Red control border `#dc2626` with no message                          | `invalid`                   |
| Grey label `#7d7d86` and a grey disabled control                      | `disabled`                  |

Placeholder-only inputs with no text above them have no HdsField label: use the control on its own with `aria-label`. A label to the left of the control is still a HdsField label above it; report the layout under "Differences".

A red asterisk next to the label means the control is `required`; the asterisk itself isn't rendered (report it under "Differences").

## Input-to-prop mapping

| User says                                              | Write as                          |
| ------------------------------------------------------ | --------------------------------- |
| label, field name, title above the input               | `label="…"`                       |
| helper text, hint, description, note under the field   | `description="…"`                 |
| error, invalid, "shows an error", validation message (visible) | `invalid error="…"`        |
| "show X if left empty", "validate on submit"           | `error="…"` + `required` on the control, inside a `HdsForm` |
| disabled, locked, greyed out                           | `disabled`                        |
| required, mandatory, asterisk                          | `required` on the control         |

## Not supported

The HdsField can't do any of the following. Don't approximate them with other props, wrappers, raw HTML or styles. Build the closest supported field (or leave it out) and report it under "Differences" or "Not available":

- Required asterisks or "(optional)" markers. Put `required` on the control and report the marker.
- Labels beside the control (horizontal layout). Use the default stacked layout and report it.
- Success or warning states (green/amber text or borders).
- Icons in the label, tooltips or info buttons next to the label. [`HdsTooltip`](tooltip.md) only wraps buttons.
- Character counts or links in the description.
- Controls other than `HdsTextInput`, `HdsSelect`, `HdsCheckbox` and `HdsSwitch`, or more than one control.
- Any custom `className` or `style`.

## label

```tsx
<HdsField label="Full name">
  <HdsTextInput />
</HdsField>
```

## description

```tsx
<HdsField label="Password" description="At least 8 characters.">
  <HdsTextInput type="password" />
</HdsField>
```

## invalid and error

```tsx
<HdsField label="Email" invalid error="Enter a valid email address.">
  <HdsTextInput type="email" defaultValue="ada@" />
</HdsField>

<HdsForm>
  <HdsField label="Name" name="name" error="Enter your name.">
    <HdsTextInput required />
  </HdsField>
</HdsForm>
```

## disabled

```tsx
<HdsField label="Plan" disabled>
  <HdsSelect
    defaultValue="pro"
    items={[
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
    ]}
  />
</HdsField>
```

## With a HdsCheckbox

```tsx
<HdsField description="We'll email you once a month.">
  <HdsCheckbox label="Subscribe to the newsletter" />
</HdsField>
```

## Combined example

```tsx
<HdsField label="Country" description="Where your company is registered." invalid error="Choose a country.">
  <HdsSelect
    placeholder="Select a country"
    required
    items={[
      { value: 'uk', label: 'United Kingdom' },
      { value: 'fr', label: 'France' },
    ]}
  />
</HdsField>
```

## Code snippet translation

Input:

```html
<div class="form-group has-error">
  <label for="phone">Phone <span class="required">*</span></label>
  <input id="phone" type="tel" class="form-control" value="0123">
  <small class="form-text text-muted">Include your country code.</small>
  <span class="help-block error">That number looks too short.</span>
</div>
```

Output:

```tsx
import { HdsField, HdsTextInput } from '@hds/ui';

<HdsField
  label="Phone"
  description="Include your country code."
  invalid
  error="That number looks too short."
>
  <HdsTextInput type="tel" defaultValue="0123" required />
</HdsField>
```

- `<label>` → `label`; `.form-text` → `description`; `.help-block.error` + `has-error` → `invalid error="…"`.
- `value` → `defaultValue` on the control; `type="tel"` is kept.
- The asterisk becomes `required` on the control: **Differences:** the required asterisk isn't shown.
- `id`, `for`, classes and the wrapper `<div>` are dropped (the HdsField replaces it).
