# DsSwitch

An on/off switch (a pill-shaped track with a round knob) with its label to the right. Clicking the label flips it.

## Quick reference

```tsx
import { DsSwitch } from '@ds-build/ui';

<DsSwitch label="Label" />
```

Allowed props: `label`, `aria-label` (no visible label only), `size`, `defaultChecked`, `disabled`, `required`, `name`. Nothing else.

## Import

Use one import line from `@ds-build/ui`, shared with the other components in the snippet:

```tsx
import { DsSwitch } from '@ds-build/ui';
```

Never import from sub-paths. No CSS import is needed.

## Structure

A DsSwitch is used in one of two places:

- **On its own** (e.g. a settings row): `<DsSwitch label="…" />`.
- **In a `DsField`**, only when it needs helper text or an error. The text stays on the switch's `label`; the DsField adds `description`/`error` and gets no `label`. See [field.md](field.md).

```tsx
<DsSwitch label="Email notifications" />

<DsField description="We only email you about your account.">
  <DsSwitch label="Product updates" />
</DsField>
```

## Props

| Prop             | Write as                       | Default (omit) | Notes                                                         |
| ---------------- | ------------------------------ | -------------- | ------------------------------------------------------------- |
| `label`          | `label="Dark mode"`            | –              | The visible text. Plain text.                                 |
| `aria-label`     | `aria-label="Enable sync"`     | –              | Only when there's no visible text. Required then, never with `label`. |
| `size`           | `size="small"`, `size="large"` | `medium`       | Track 26×16 / 32×20 / 40×24px.                                |
| `defaultChecked` | `defaultChecked`               | off            | Starts on.                                                    |
| `disabled`       | `disabled`                     | off            | Disabled state.                                               |
| `required`       | `required`                     | off            | Must be on to submit a [`DsForm`](form.md).                   |
| `name`           | `name="updates"`               | –              | Only directly inside a `DsForm` (no `DsField` around it; otherwise `name` goes on the DsField). |

These are the only props to use. No `checked`, `onCheckedChange`, `className`, `style` or event handlers. No children: the tag is always self-closing and the text goes in `label`.

## Base setup

Start from the minimal switch:

```tsx
<DsSwitch label="Label" />
```

Then add only the props the input needs, in this order:

1. `name="…"` if it's directly inside a `DsForm`
2. `label="…"`, or `aria-label="…"` if there's no visible text
3. `size="small"` or `size="large"` if it isn't medium
4. `defaultChecked` if it's on
5. `required` if it must be on
6. `disabled` if it's disabled

Every compatible prop at once, for reference only:

```tsx
<DsSwitch name="updates" label="Product updates" size="large" defaultChecked required disabled />
```

### Composing rules

- Leave out any prop that's set to its default. Never write `size="medium"` or `defaultChecked={false}`.
- Write boolean props as bare attributes.
- Use `label` for the text. Never wrap a DsSwitch in a `<label>`, `<span>` or `DsField label`.
- The label is always to the right. For a settings row with text on the left and the switch on the right, still use `label` and report the layout under "Differences".

## Valid variants

| Variant          | Write as                                |
| ---------------- | --------------------------------------- |
| Off              | `<DsSwitch label="…" />`                |
| On               | `<DsSwitch label="…" defaultChecked />` |
| No visible label | `<DsSwitch aria-label="…" />`           |

Each works in every size and can be disabled.

## Visual identification

Use this to match switches in an image. A square box with a tick is a [`DsCheckbox`](checkbox.md).

| Looks like                                                   | Means            |
| ------------------------------------------------------------ | ---------------- |
| Grey pill `#c4c4ca`, white knob on the left                  | Off              |
| Near-black pill `#18181b`, white knob on the right           | `defaultChecked` |
| Light grey pill `#dcdce0`, off-white knob, grey label `#7d7d86` | `disabled` (on if the knob is on the right) |

A switch that's on in any other colour (green, blue) is still `defaultChecked`; report the colour under "Differences".

**Size** (pick the nearest; measure the track):

| Size   | Track   | Knob | Label text | Gap to label |
| ------ | ------- | ---- | ---------- | ------------ |
| small  | 26×16px | 12px | 13px       | 6px          |
| medium | 32×20px | 16px | 14px       | 8px          |
| large  | 40×24px | 20px | 16px       | 10px         |

If unclear, use medium (omit `size`).

## Input-to-prop mapping

| User says                                         | Write as                        |
| ------------------------------------------------- | ------------------------------- |
| switch, toggle switch, on/off, slider toggle      | `<DsSwitch label="…" />`        |
| on, enabled, active                               | `defaultChecked`                |
| off, disabled setting (meaning "turned off")      | no props                        |
| greyed out, can't be changed                      | `disabled`                      |
| required, must enable                             | `required`                      |
| small, compact / large, big                       | `size="small"` / `size="large"` |
| toggle button (a button that stays pressed)       | [`DsToggle`](toggle.md), not a switch |

"Disabled" is ambiguous: a setting described as "disabled" usually means off. Use `disabled` only when it looks greyed out or the user says it can't be changed.

## Not supported

The DsSwitch can't do any of the following. Don't approximate them with other props, wrappers, raw HTML or styles. Build the closest supported switch (or leave it out) and report it under "Differences" or "Not available":

- Label on the left, or a description line under the label (use a `DsField` with `description` for helper text).
- Icons or text inside the track.
- Colours other than black for the on state.
- A switch group with a shared heading. Use separate switches under a heading built from [typography](typography.md).
- Sizes other than small, medium and large.
- Any custom `className` or `style`.

## Combined example

```tsx
<DsSwitch size="small" label="Beta features" defaultChecked disabled />
```

## Code snippet translation

Input:

```html
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="dark" checked>
  <label class="form-check-label" for="dark">Dark mode</label>
</div>
<label class="switch"><input type="checkbox" disabled><span class="slider"></span> Sync contacts</label>
<span class="badge">New</span>
```

Output:

```tsx
import { DsSwitch } from '@ds-build/ui';

<DsSwitch label="Dark mode" defaultChecked />
<DsSwitch label="Sync contacts" disabled />
```

- `form-switch` and the `.switch`/`.slider` pattern → `DsSwitch`; `checked` → `defaultChecked`.
- The badge has no equivalent: **Not available:** "New" badge.
