# HdsRadioGroup

A labelled set of round [`HdsRadio`](radio.md) options where exactly one can be selected. It renders a legend, the radios, and optional helper and error text.

## Quick reference

```tsx
import { HdsRadioGroup, HdsRadio } from '@hds/ui';

<HdsRadioGroup label="Label">
  <HdsRadio value="one" label="One" />
  <HdsRadio value="two" label="Two" />
</HdsRadioGroup>
```

Allowed props: `label`, `aria-label` (no visible label only), `description`, `error`, `invalid`, `size`, `orientation`, `defaultValue`, `required`, `disabled`, `name`. Nothing else.

## Import

```tsx
import { HdsRadioGroup, HdsRadio } from '@hds/ui';
```

Never import from sub-paths. No CSS import is needed.

## Structure

Children are `HdsRadio`s only, each with a unique `value` and a `label` (see [radio.md](radio.md)). A HdsRadio never appears outside a HdsRadioGroup, and a HdsRadioGroup never goes inside a `HdsField`: it has its own label, description and error.

```tsx
<HdsRadioGroup label="Plan" defaultValue="pro">
  <HdsRadio value="free" label="Free" />
  <HdsRadio value="pro" label="Pro" />
</HdsRadioGroup>
```

## Props

| Prop           | Write as                              | Default (omit) | Notes                                                    |
| -------------- | ------------------------------------- | -------------- | -------------------------------------------------------- |
| `label`        | `label="Plan"`                        | –              | Legend above the radios.                                 |
| `aria-label`   | `aria-label="Plan"`                   | –              | Only when there's no visible label. Required then.       |
| `description`  | `description="You can change this later."` | –         | Grey helper text under the radios.                       |
| `error`        | `error="Choose a plan."`              | –              | Red text under the radios. Shown with `invalid`, or after a failed submit with `required`. |
| `invalid`      | `invalid`                             | off            | Shows `error` and red circles now. Needs `error`.        |
| `size`         | `size="small"`, `size="large"`        | `medium`       | Sets every radio: circles 14/16/18px.                    |
| `orientation`  | `orientation="horizontal"`            | `vertical`     | Side by side, wrapping when needed.                      |
| `defaultValue` | `defaultValue="pro"`                  | none selected  | Must equal one radio's `value`.                          |
| `required`     | `required`                            | off            | One option must be chosen to submit a `HdsForm`.          |
| `disabled`     | `disabled`                            | off            | Disables every radio.                                    |
| `name`         | `name="plan"`                         | –              | Only inside a `HdsForm`.                                  |

These are the only props to use. No `value`, `onValueChange`, `readOnly`, `className`, `style` or event handlers.

## Base setup

Start from the minimal group:

```tsx
<HdsRadioGroup label="Label">
  <HdsRadio value="one" label="One" />
  <HdsRadio value="two" label="Two" />
</HdsRadioGroup>
```

Then add only the props the input needs, in this order:

1. `name="…"` if it's inside a `HdsForm`
2. `label="…"`, or `aria-label="…"` if there's no visible label
3. `description="…"` if there's helper text
4. `size="small"` or `size="large"` if it isn't medium
5. `orientation="horizontal"` if the radios sit side by side
6. `defaultValue="…"` if an option is shown selected
7. `required` if a choice is required
8. `invalid` and `error="…"` if it shows an error
9. `disabled` if the whole group is disabled

Every compatible prop at once, for reference only:

```tsx
<HdsRadioGroup
  name="delivery"
  label="Delivery"
  description="Express arrives the next working day."
  size="small"
  orientation="horizontal"
  defaultValue="standard"
  required
  invalid
  error="Choose a delivery option."
  disabled
>
  <HdsRadio value="standard" label="Standard" />
  <HdsRadio value="express" label="Express" />
</HdsRadioGroup>
```

### Composing rules

- Leave out any prop that's set to its default. Never write `size="medium"` or `orientation="vertical"`.
- Write boolean props as bare attributes.
- Write the group over several lines when it has more than two props, one attribute per line.
- Select an option with the group's `defaultValue`, never on a `HdsRadio`.
- `invalid` needs `error`. `error` alone (without `invalid`) is fine with `required`: it shows after a failed submit.
- Never put a HdsRadioGroup in a `HdsField`.

## Valid variants

| Variant     | Write as                                  |
| ----------- | ----------------------------------------- |
| Nothing selected | `<HdsRadioGroup label="…">…</HdsRadioGroup>` |
| Selected    | `<HdsRadioGroup label="…" defaultValue="…">` |
| Horizontal  | `<HdsRadioGroup label="…" orientation="horizontal">` |
| Invalid     | `<HdsRadioGroup label="…" invalid error="…">` |
| Disabled    | `<HdsRadioGroup label="…" disabled>`       |

## Visual identification

Use this to match radio groups in an image. Square boxes are a [`HdsCheckboxGroup`](checkbox-group.md).

| Looks like                                                       | Means             |
| ---------------------------------------------------------------- | ----------------- |
| White circle, 1px grey border `#c4c4ca`                          | Not selected      |
| Near-black circle `#18181b` with a white dot                     | Selected: that radio's `value` goes in `defaultValue` |
| Light grey circle `#eeeef0`, light border `#dcdce0`, grey label `#7d7d86` | Disabled (whole group, or that radio) |
| Red circle borders `#dc2626` and red text below                  | `invalid error="…"` |
| Bold 14px text above the radios                                  | `label`           |
| Grey 13px text below the radios                                  | `description`     |

A selected radio in another colour (blue, green) is still selected; report the colour under "Differences".

**Size** (pick the nearest; measure the circle):

| Size   | Circle | Label text | Gap to label |
| ------ | ------ | ---------- | ------------ |
| small  | 14px   | 13px       | 6px          |
| medium | 16px   | 14px       | 8px          |
| large  | 18px   | 16px       | 10px         |

Radios are 8px apart vertically; horizontal radios are 20px apart.

## Input-to-prop mapping

| User says                                              | Write as                           |
| ------------------------------------------------------ | ---------------------------------- |
| radio buttons, radios, choose one, single choice, option list | `<HdsRadioGroup>` with `HdsRadio`s |
| selected, chosen, default option                       | `defaultValue="…"`                 |
| inline, side by side, in a row                         | `orientation="horizontal"`         |
| required, must choose                                  | `required`                         |
| error, invalid                                         | `invalid error="…"`                |
| disabled, greyed out                                   | `disabled`                         |
| segmented control, button group to pick one            | [`HdsToggleGroup`](toggle-group.md), not radios |

## Not supported

- Radio cards or tiles (a bordered box around each option). Build plain radios and report it.
- A description under each option. Use the group `description` or report it.
- Images or icons in options.
- Radios outside a group, or a group with checkboxes mixed in.
- Sizes other than small, medium and large.
- Any custom `className` or `style`.

## Code snippet translation

Input:

```html
<fieldset>
  <legend>Billing period</legend>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="period" id="m" value="monthly" checked>
    <label class="form-check-label" for="m">Monthly</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="period" id="y" value="yearly">
    <label class="form-check-label" for="y">Yearly <span class="badge">Save 20%</span></label>
  </div>
</fieldset>
```

Output:

```tsx
import { HdsRadioGroup, HdsRadio } from '@hds/ui';

<HdsRadioGroup label="Billing period" orientation="horizontal" defaultValue="monthly">
  <HdsRadio value="monthly" label="Monthly" />
  <HdsRadio value="yearly" label="Yearly" />
</HdsRadioGroup>
```

- `<legend>` → `label`; `form-check-inline` → `orientation="horizontal"`; `checked` → `defaultValue`.
- The badge has no equivalent: **Not available:** "Save 20%" badge.
