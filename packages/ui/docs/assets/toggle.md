# HdsToggle

A two-state button that's either pressed or not (e.g. Bold on/off). Renders a native `<button>` with `aria-pressed`.

## Quick reference

```tsx
import { HdsToggle } from '@hds/ui';

<HdsToggle>Label</HdsToggle>
```

Allowed props: `size`, `iconNode`, `aria-label` (icon-only toggles), `defaultPressed`, `disabled`, `value` (inside a `HdsToggleGroup`), and plain-text `children`. Nothing else.

## Import

Use one import line from `@hds/ui`, shared with the other components in the snippet. Include `HdsToggle` and only the icons the snippet actually uses:

```tsx
import { HdsToggle, HdsBoldIcon, HdsItalicIcon } from '@hds/ui';
```

Never import from sub-paths. No CSS import is needed: the variables and classes load with the package.

## Props

| Prop             | Write as                                     | Default (omit) | Notes                                                                 |
| ---------------- | -------------------------------------------- | -------------- | --------------------------------------------------------------------- |
| `children`       | `<HdsToggle>Bold</HdsToggle>`                      | –              | Plain-text label. Omit for an icon-only toggle.                       |
| `iconNode`       | `iconNode={<HdsBoldIcon />}`                    | none           | Leading icon. Required when there's no `children`.                    |
| `aria-label`     | `aria-label="Bold"`                          | –              | Required for icon-only toggles, and only for them.                    |
| `size`           | `size="small"`, `size="large"`               | `medium`       | Heights 28/36/44px. Never inside a `HdsToggleGroup` (set it on the group). |
| `defaultPressed` | `defaultPressed`                             | off            | Starts pressed. Never inside a `HdsToggleGroup` (use the group's `defaultValue`). |
| `disabled`       | `disabled`                                   | off            | Disabled state.                                                       |
| `value`          | `value="bold"`                               | –              | Only inside a `HdsToggleGroup`, where it's required and unique.          |

These are the only props to use. No `pressed`, `onPressedChange`, `className`, `style` or event handlers.

`children` is the label text only. Never put icons or markup inside it; icons go through `iconNode`.

## Base setup

Start from the minimal toggle:

```tsx
<HdsToggle>Label</HdsToggle>
```

Then add only the props the input needs, in this order:

1. `value="…"` if it's inside a `HdsToggleGroup`
2. `size="small"` or `size="large"` if it isn't medium (standalone only)
3. `iconNode={<…Icon />}` if it has an icon
4. `aria-label="…"` if it has an icon and no label
5. `defaultPressed` if it's shown pressed (standalone only)
6. `disabled` if it's disabled

Every compatible prop at once, for reference only:

```tsx
<HdsToggle size="large" iconNode={<HdsBoldIcon />} defaultPressed disabled>
  Bold
</HdsToggle>
```

Icon-only:

```tsx
<HdsToggle iconNode={<HdsItalicIcon />} aria-label="Italic" />
```

### Composing rules

- Leave out any prop that's set to its default value. Never write `size="medium"` or `defaultPressed={false}`.
- Write boolean props as bare attributes: `defaultPressed`, `disabled`.
- An icon-only toggle is self-closing and must have both `iconNode` and `aria-label`. Use the icon's meaning as the label ("Bold", "Align left").
- Don't add `aria-label` to a toggle that has visible text.
- The icon is always leading (left of the label).
- Inside a `HdsToggleGroup`: add `value`, and leave out `size` and `defaultPressed`. See [toggle-group.md](toggle-group.md).

## Valid variants

| Variant           | Write as                                         |
| ----------------- | ------------------------------------------------ |
| Text              | `<HdsToggle>Bold</HdsToggle>`                          |
| Icon and text     | `<HdsToggle iconNode={<HdsBoldIcon />}>Bold</HdsToggle>`  |
| Icon only         | `<HdsToggle iconNode={<HdsBoldIcon />} aria-label="Bold" />` |

Each works in every size, pressed or not, disabled or not. There are no colour variants.

## Visual identification

Use this to match toggles in an image. A standalone toggle looks like an outline button that turns grey when pressed. Toggles joined in a grey track are a `HdsToggleGroup`.

**State:**

| Looks like                                                       | State                 |
| ---------------------------------------------------------------- | --------------------- |
| White fill, grey border `#c4c4ca`, dark grey text `#3f3f46`      | Not pressed (no props) |
| Light grey fill `#eeeef0`, grey border `#c4c4ca`, near-black text `#18181b` | `defaultPressed` |
| White fill, light border `#dcdce0`, grey text `#7d7d86`          | `disabled`            |
| Light grey fill `#eeeef0`, light border `#dcdce0`, grey text `#7d7d86` | `defaultPressed disabled` |

A white bordered element that looks like a button but isn't part of an on/off set is a `HdsButton` with `appearance="outline"`, not a HdsToggle. Only use a HdsToggle when the input describes an on/off or pressed state.

**Size** (pick the nearest; height is the most reliable signal):

| Size   | Height | Text | Corner radius | Icon |
| ------ | ------ | ---- | ------------- | ---- |
| small  | 28px   | 13px | 6px           | 14px |
| medium | 36px   | 14px | 8px           | 16px |
| large  | 44px   | 16px | 10px          | 18px |

Icon-only toggles are square (width = height). Text is medium weight (500). If unclear, use medium (omit `size`).

**Icon:**

| Icon in image               | Write as                        |
| --------------------------- | ------------------------------- |
| Bold **B**                  | `iconNode={<HdsBoldIcon />}`       |
| Italic *I*                  | `iconNode={<HdsItalicIcon />}`     |
| Underlined U                | `iconNode={<HdsUnderlineIcon />}`  |
| Lines aligned left          | `iconNode={<HdsAlignLeftIcon />}`  |
| Lines centred               | `iconNode={<HdsAlignCenterIcon />}` |
| Lines aligned right         | `iconNode={<HdsAlignRightIcon />}` |
| Plus `+`                    | `iconNode={<HdsPlusIcon />}`       |
| Tick / check mark           | `iconNode={<HdsCheckIcon />}`      |
| Three dots `⋯`              | `iconNode={<HdsMoreIcon />}`       |
| Pencil                      | `iconNode={<HdsEditIcon />}`       |
| Cross `✕`                   | `iconNode={<HdsCloseIcon />}`      |
| Three lines `☰` (menu)      | `iconNode={<HdsMenuIcon />}`       |
| Any other icon              | Leave the icon out (keep the label; for icon-only, leave the toggle out) and report it |

## Input-to-prop mapping

| User says                                           | Write as                    |
| --------------------------------------------------- | --------------------------- |
| toggle, toggle button, on/off button, pressable     | `<HdsToggle>`                  |
| pressed, on, active, selected, enabled (state)      | `defaultPressed`            |
| unpressed, off, inactive (state)                    | no props                    |
| small, compact, sm                                  | `size="small"`              |
| large, big, lg                                      | `size="large"`              |
| icon only, just an icon                             | `iconNode` + `aria-label`, no children |
| disabled, greyed out, unavailable                   | `disabled`                  |
| segmented control, button group with one selected, toolbar of toggles | `HdsToggleGroup`, see [toggle-group.md](toggle-group.md) |

A switch (sliding pill with a knob) isn't a HdsToggle; use a [`HdsSwitch`](switch.md).

## Not supported

The HdsToggle can't do any of the following. Don't approximate them with other props, wrappers, raw HTML or styles. Build the closest supported toggle (or leave it out) and report it under "Differences" or "Not available":

- Switches (sliding pill with a knob). Use a [`HdsSwitch`](switch.md); don't substitute a HdsToggle or HdsCheckbox.
- Colours (blue, red) or a coloured pressed state. Pressed is always light grey.
- Trailing icons. Use a leading icon and report it.
- Icons other than those listed above.
- Badges, counts or a second line of text.
- Sizes other than small, medium and large.
- Any custom `className` or `style`.

## children and iconNode

```tsx
<HdsToggle>Bold</HdsToggle>
<HdsToggle iconNode={<HdsBoldIcon />}>Bold</HdsToggle>
<HdsToggle iconNode={<HdsBoldIcon />} aria-label="Bold" />
```

## size

```tsx
<HdsToggle size="small">Small</HdsToggle>
<HdsToggle>Medium</HdsToggle>
<HdsToggle size="large">Large</HdsToggle>
```

## defaultPressed

```tsx
<HdsToggle>Wrap text</HdsToggle>
<HdsToggle defaultPressed>Wrap text</HdsToggle>
```

## disabled

```tsx
<HdsToggle disabled>Wrap text</HdsToggle>
<HdsToggle defaultPressed disabled>Wrap text</HdsToggle>
```

## Combined example

```tsx
<HdsToggle size="small" iconNode={<HdsUnderlineIcon />} aria-label="Underline" defaultPressed />
```

## Code snippet translation

Input:

```html
<button class="btn btn-outline-secondary active" aria-pressed="true" onclick="toggleBold()">
  <i class="bi bi-type-bold"></i> Bold
</button>
<button class="btn btn-outline-secondary btn-sm" aria-pressed="false" title="Italic">
  <i class="bi bi-type-italic"></i>
</button>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="dark"> <label for="dark">Dark mode</label>
</div>
```

Output:

```tsx
import { HdsToggle, HdsSwitch, HdsBoldIcon, HdsItalicIcon } from '@hds/ui';

<HdsToggle iconNode={<HdsBoldIcon />} defaultPressed>Bold</HdsToggle>
<HdsToggle size="small" iconNode={<HdsItalicIcon />} aria-label="Italic" />
<HdsSwitch label="Dark mode" />
```

- `aria-pressed="true"` / `active` → `defaultPressed`; `btn-sm` → `size="small"`.
- The `<i>` icons become `iconNode`. The icon-only button's `title` becomes `aria-label`.
- `onclick` and classes are dropped (static output).
- The `form-switch` is a [`HdsSwitch`](switch.md), not a toggle.
