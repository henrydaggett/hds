# HdsToggleGroup

A set of `HdsToggle`s that share pressed state, styled as a segmented control (a grey track with a raised white segment for the pressed toggle). Single choice by default, or several at once with `multiple`.

## Quick reference

```tsx
import { HdsToggleGroup, HdsToggle } from '@hds/ui';

<HdsToggleGroup aria-label="View" defaultValue={['list']}>
  <HdsToggle value="list">List</HdsToggle>
  <HdsToggle value="board">Board</HdsToggle>
</HdsToggleGroup>
```

Allowed props: `aria-label`, `size`, `multiple`, `defaultValue`, `orientation`, `disabled`, and `HdsToggle` children. Nothing else.

## Import

Use one import line from `@hds/ui`, shared with the other components in the snippet. Always import `HdsToggle` with it, plus only the icons used:

```tsx
import { HdsToggleGroup, HdsToggle, HdsAlignLeftIcon, HdsAlignCenterIcon, HdsAlignRightIcon } from '@hds/ui';
```

Never import from sub-paths. No CSS import is needed.

## Structure

Children are `HdsToggle`s only, each with a unique `value`. HdsToggle props are in [toggle.md](toggle.md).

```tsx
<HdsToggleGroup aria-label="…">
  <HdsToggle value="a">A</HdsToggle>
  <HdsToggle value="b">B</HdsToggle>
</HdsToggleGroup>
```

Inside a group, a HdsToggle takes `value`, `children`, `iconNode`, `aria-label` (icon-only) and `disabled`. Never `size` or `defaultPressed`: the group sets those.

## Props

| Prop           | Write as                                    | Default (omit)  | Notes                                                     |
| -------------- | ------------------------------------------- | --------------- | --------------------------------------------------------- |
| `aria-label`   | `aria-label="Text alignment"`               | –               | Required. Names the choice.                               |
| `size`         | `size="small"`, `size="large"`              | `medium`        | Sizes every toggle. Group heights 28/36/44px.             |
| `multiple`     | `multiple`                                  | off             | Allow several pressed at once.                            |
| `defaultValue` | `defaultValue={['left']}`, `defaultValue={['bold', 'italic']}` | nothing pressed | `value`s of the pressed toggles. Always an array. |
| `orientation`  | `orientation="vertical"`                    | `horizontal`    | Stacks the toggles in a column.                           |
| `disabled`     | `disabled`                                  | off             | Disables every toggle.                                    |

These are the only props to use. No `value`, `onValueChange`, `className`, `style` or event handlers.

## Base setup

Start from the minimal group:

```tsx
<HdsToggleGroup aria-label="Label">
  <HdsToggle value="one">One</HdsToggle>
  <HdsToggle value="two">Two</HdsToggle>
</HdsToggleGroup>
```

Then add only the props the input needs, in this order:

1. `size="small"` or `size="large"` if it isn't medium
2. `orientation="vertical"` if the toggles are stacked
3. `multiple` if more than one can be pressed
4. `defaultValue={[…]}` if any toggle is shown pressed
5. `disabled` if the whole group is disabled

Every compatible prop at once, for reference only:

```tsx
<HdsToggleGroup
  aria-label="Text formatting"
  size="large"
  orientation="vertical"
  multiple
  defaultValue={['bold', 'italic']}
  disabled
>
  <HdsToggle value="bold" iconNode={<HdsBoldIcon />} aria-label="Bold" />
  <HdsToggle value="italic" iconNode={<HdsItalicIcon />} aria-label="Italic" />
  <HdsToggle value="underline" iconNode={<HdsUnderlineIcon />} aria-label="Underline" />
</HdsToggleGroup>
```

### Composing rules

- Leave out props set to their defaults. Never write `size="medium"`, `orientation="horizontal"` or `multiple={false}`.
- `defaultValue` is always an array, even for one value: `defaultValue={['left']}`.
- Without `multiple`, `defaultValue` has at most one value. If the input shows two pressed, add `multiple`.
- Each `value` is a short lowercase id derived from the label (`"Align left"` → `"left"`, `"Board view"` → `"board"`). Every `defaultValue` entry must match a child's `value`.
- To disable one toggle, put `disabled` on that `HdsToggle`; to disable all, put it on the group.
- Put the attributes on one line unless the tag runs past ~100 characters, then one attribute per line.

## Valid variants

| Variant                | Write as                                      |
| ---------------------- | --------------------------------------------- |
| Single choice          | `<HdsToggleGroup aria-label="…">`                |
| Multiple choice        | `<HdsToggleGroup aria-label="…" multiple>`       |
| Vertical               | `<HdsToggleGroup aria-label="…" orientation="vertical">` |

Toggles can be text, icon and text, or icon-only, and can be mixed.

## Visual identification

Use this to match segmented controls and toggle toolbars in an image.

| Looks like                                                                   | Means                 |
| ---------------------------------------------------------------------------- | --------------------- |
| Light grey track `#eeeef0` with a 1px border `#dcdce0` and 3px inner padding | The `HdsToggleGroup`     |
| Borderless segment, transparent on the track, dark grey text `#3f3f46`       | HdsToggle not pressed    |
| Raised white segment with a soft shadow, near-black text `#18181b`           | Pressed (in `defaultValue`) |
| Grey text `#7d7d86`                                                          | Disabled              |
| Two or more white segments at once                                           | `multiple`            |

A row of separate bordered toggles with gaps (no shared track) isn't a group. Write them as standalone `HdsToggle`s and report the segmented look under "Differences" only if the user asked for a group.

**Size** (measure the whole track; pick the nearest):

| Size   | Track height | Segment height | Text | Track radius |
| ------ | ------------ | -------------- | ---- | ------------ |
| small  | 28px         | 20px           | 13px | 6px          |
| medium | 36px         | 28px           | 14px | 8px          |
| large  | 44px         | 36px           | 16px | 10px         |

If unclear, use medium (omit `size`).

## Input-to-prop mapping

| User says                                                       | Write as                       |
| --------------------------------------------------------------- | ------------------------------ |
| segmented control, tabs-style switcher, view switcher, pick one of | `<HdsToggleGroup>` (single)    |
| toolbar, formatting buttons, pick several, multi-select toggles | `multiple`                     |
| vertical, stacked, column                                       | `orientation="vertical"`       |
| "X is selected/active/on"                                       | `defaultValue={['x']}`         |
| small, compact / large, big                                     | `size="small"` / `size="large"` |
| disabled, greyed out                                            | `disabled`                     |

Navigation tabs that switch page content are not a HdsToggleGroup; use [`HdsTabs`](tabs.md).

## Not supported

The HdsToggleGroup can't do any of the following. Don't approximate them. Build the closest supported group (or leave it out) and report it under "Differences" or "Not available":

- Tabs with panels (content that changes below). Use [`HdsTabs`](tabs.md).
- Radio buttons (round inputs with a dot). Use a [`HdsRadioGroup`](radio-group.md).
- Children other than `HdsToggle` (no Buttons, separators or dropdowns inside).
- A visible label or legend for the group. Report it; `aria-label` names the group invisibly.
- Coloured tracks or a coloured selected segment.
- Full-width groups or segments of fixed width.
- Sizes other than small, medium and large.
- Any custom `className` or `style`.

## size

```tsx
<HdsToggleGroup aria-label="View" size="small" defaultValue={['list']}>
  <HdsToggle value="list">List</HdsToggle>
  <HdsToggle value="board">Board</HdsToggle>
</HdsToggleGroup>
```

## multiple

```tsx
<HdsToggleGroup aria-label="Text formatting" multiple defaultValue={['bold', 'underline']}>
  <HdsToggle value="bold" iconNode={<HdsBoldIcon />} aria-label="Bold" />
  <HdsToggle value="italic" iconNode={<HdsItalicIcon />} aria-label="Italic" />
  <HdsToggle value="underline" iconNode={<HdsUnderlineIcon />} aria-label="Underline" />
</HdsToggleGroup>
```

## orientation

```tsx
<HdsToggleGroup aria-label="Panel" orientation="vertical" defaultValue={['layers']}>
  <HdsToggle value="layers">Layers</HdsToggle>
  <HdsToggle value="assets">Assets</HdsToggle>
</HdsToggleGroup>
```

## disabled

```tsx
<HdsToggleGroup aria-label="View" defaultValue={['list']} disabled>
  <HdsToggle value="list">List</HdsToggle>
  <HdsToggle value="board">Board</HdsToggle>
</HdsToggleGroup>

<HdsToggleGroup aria-label="View" defaultValue={['list']}>
  <HdsToggle value="list">List</HdsToggle>
  <HdsToggle value="board" disabled>Board</HdsToggle>
</HdsToggleGroup>
```

## Combined example

```tsx
<HdsToggleGroup aria-label="Text alignment" size="small" defaultValue={['left']}>
  <HdsToggle value="left" iconNode={<HdsAlignLeftIcon />} aria-label="Align left" />
  <HdsToggle value="center" iconNode={<HdsAlignCenterIcon />} aria-label="Align center" />
  <HdsToggle value="right" iconNode={<HdsAlignRightIcon />} aria-label="Align right" />
</HdsToggleGroup>
```

## Code snippet translation

Input:

```html
<div class="btn-group" role="group" aria-label="Billing period">
  <input type="radio" class="btn-check" name="period" id="monthly" checked>
  <label class="btn btn-outline-primary" for="monthly">Monthly</label>
  <input type="radio" class="btn-check" name="period" id="yearly">
  <label class="btn btn-outline-primary" for="yearly">Yearly <span class="badge">-20%</span></label>
</div>
```

Output:

```tsx
import { HdsToggleGroup, HdsToggle } from '@hds/ui';

<HdsToggleGroup aria-label="Billing period" defaultValue={['monthly']}>
  <HdsToggle value="monthly">Monthly</HdsToggle>
  <HdsToggle value="yearly">Yearly</HdsToggle>
</HdsToggleGroup>
```

- A `btn-group` of radio buttons → single-choice `HdsToggleGroup`; `checked` → `defaultValue`.
- The group's `aria-label` is kept. Each `id` becomes the toggle's `value`.
- `btn-outline-primary` colour is dropped: **Differences:** the selected segment is white, not blue.
- The badge is dropped: **Differences:** "-20%" badge left off the Yearly toggle.
