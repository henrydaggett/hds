# HdsButton

Triggers an action. Renders a native `<button>`.

## Quick reference

```tsx
import { HdsButton } from '@hds/ui';

<HdsButton>Label</HdsButton>
```

Allowed props: `appearance`, `size`, `color`, `icon`, `iconNode`, `disabled`, `type="submit"` (inside a `HdsForm` only), and plain-text `children`. Nothing else.

## Import

Use one import line from `@hds/ui`. Include `HdsButton` and only the icons the snippet actually uses. For a snippet with a delete button and a continue button:

```tsx
import { HdsButton, HdsArrowRightIcon, HdsTrashIcon } from '@hds/ui';
```

Never import from sub-paths (e.g. `@hds/ui/components/Button`). No CSS import is needed: the variables and classes load with the package.

## Props

| Prop         | Write as                                                     | Default (omit)  | Notes                                                       |
| ------------ | ------------------------------------------------------------ | --------------- | ----------------------------------------------------------- |
| `children`   | `<HdsButton>Save</HdsButton>`                                      | –               | Required. Plain text only.                                  |
| `appearance` | `appearance="outline"`                                       | `default`       | `outline` is a neutral bordered button with a fixed style.  |
| `size`       | `size="small"`, `size="large"`                               | `medium`        | Heights: small 28px, medium 36px, large 44px.               |
| `color`      | `color="blue"`, `color="red"`                                | `primary`       | Default appearance only. Never with `appearance="outline"`. |
| `icon`       | `icon`                                                       | off             | Leading icon. Plus icon unless `iconNode` is set.           |
| `iconNode`   | `iconNode={<HdsArrowRightIcon />}`, `iconNode={<HdsTrashIcon />}`  | `<HdsPlusIcon />`  | Swaps the icon. Only works together with `icon`.            |
| `disabled`   | `disabled`                                                   | off             | Disabled state.                                             |
| `type`       | `type="submit"`                                              | `button`        | Only on the one button that submits a [`HdsForm`](form.md).    |

These are the only props to use. No `className`, `style`, other `type` values, `aria-*` or event handlers.

`children` is the label text only. Never put icons, `<span>`s or other markup inside it; icons go through `icon` and `iconNode`.

## Base setup

Start from the minimal button:

```tsx
<HdsButton>Label</HdsButton>
```

Then add only the props the input needs, in this order:

1. `appearance="outline"` if the button is outlined
2. `size="small"` or `size="large"` if it isn't medium
3. `color="blue"` or `color="red"` if it's filled blue or red (skip if outline)
4. `icon` if it has a leading icon
5. `iconNode={<HdsArrowRightIcon />}` or `iconNode={<HdsTrashIcon />}` if that icon isn't a plus
6. `disabled` if it's disabled
7. `type="submit"` if it's the submit button of a `HdsForm`

Every compatible prop at once, for reference only (`appearance="outline"` is missing because it can't be combined with `color`):

```tsx
<HdsButton size="large" color="red" icon iconNode={<HdsTrashIcon />} disabled>
  Label
</HdsButton>
```

### Composing rules

- Leave out any prop that's set to its default value. Never write `appearance="default"`, `size="medium"`, `color="primary"` or `iconNode={<HdsPlusIcon />}`.
- Write boolean props as bare attributes: `icon`, `disabled`. Never `icon={true}` or `disabled={false}`.
- `color` and `appearance="outline"` can't be combined. If the input shows a coloured outline button, use `appearance="outline"` without `color` and report the difference.
- `iconNode` without `icon` renders nothing. Always pass both.
- Outside a `HdsForm`, never write `type`. Inside one, exactly one button gets `type="submit"` and the rest get no `type`.
- The icon is always leading (left of the label). There is no trailing-icon or icon-only button.
- Keep a button's JSX on one line unless it runs past ~100 characters.

## Valid variants

There are 4 visual variants. Each one works with every size, with or without an icon, and disabled or not.

| Variant | Write as                       |
| ------- | ------------------------------ |
| Primary | `<HdsButton>`                     |
| Blue    | `<HdsButton color="blue">`        |
| Red     | `<HdsButton color="red">`         |
| Outline | `<HdsButton appearance="outline">` |

Anything outside these 4 (coloured outline, ghost, other colours) doesn't exist.

## Visual identification

Use this to match buttons in an image.

**Variant** (by fill, text and border):

| Looks like                                            | Variant  |
| ----------------------------------------------------- | -------- |
| Near-black fill `#18181b`, white text                 | Primary  |
| Blue fill `#2563eb`, white text                       | Blue     |
| Red fill `#dc2626`, white text                        | Red      |
| White fill, grey border `#c4c4ca`, dark text          | Outline  |
| Light grey fill `#eeeef0`, grey text `#7d7d86`, no border | Disabled filled button (primary, blue or red) |
| White fill, light grey border `#dcdce0`, grey text    | Disabled outline button |

A disabled filled button looks the same whatever its colour. Write it as `<HdsButton disabled>` with no `color`, and list it under "Differences" so the user can add the colour.

Map shades to the nearest variant: any black or dark grey fill is primary, any blue is blue, any red is red. Any other fill colour (green, purple, orange…) becomes primary (omit `color`) and goes under "Differences".

**Size** (pick the nearest; height is the most reliable signal):

| Size   | Height | Text | Corner radius |
| ------ | ------ | ---- | ------------- |
| small  | 28px   | 13px | 6px           |
| medium | 36px   | 14px | 8px           |
| large  | 44px   | 16px | 10px          |

If there's nothing to measure against, compare buttons with each other and with the text around them. If still unclear, use medium (omit `size`).

**Icon** (always left of the label):

| Icon in image      | Write as                                  |
| ------------------ | ----------------------------------------- |
| Plus `+`           | `icon`                                    |
| Right arrow `→`    | `icon iconNode={<HdsArrowRightIcon />}`      |
| Trash can / bin    | `icon iconNode={<HdsTrashIcon />}`           |
| Any other icon     | Leave the icon out, keep the label, and report it under "Differences" |

## Input-to-prop mapping

Use this to translate the user's wording. Words not listed here don't map to a prop; check "Not supported" below.

| User says                                            | Write as                               |
| ---------------------------------------------------- | -------------------------------------- |
| primary, main, filled, solid, default, dark, black   | no props                               |
| secondary, outline, outlined, bordered, neutral, cancel-style | `appearance="outline"`        |
| red, destructive, danger, error                      | `color="red"`                          |
| blue, CTA, call to action, accent, highlight         | `color="blue"`                         |
| small, compact, sm                                   | `size="small"`                         |
| large, big, lg                                       | `size="large"`                         |
| with icon, plus, add, new, create (with an icon)     | `icon`                                 |
| arrow, next, continue, forward (with an icon)        | `icon iconNode={<HdsArrowRightIcon />}`   |
| trash, bin, delete or remove (with an icon)          | `icon iconNode={<HdsTrashIcon />}`        |
| disabled, inactive, greyed out, unavailable          | `disabled`                             |

Map the user's description, not the button's label. A button labelled "Delete" or "Next" gets no colour or icon unless the user asks for one (or it's visible in an image). Words like "add", "next" or "delete" only pick which icon to use once an icon is requested.

## Not supported

The HdsButton can't do any of the following. Don't approximate them with other props, wrappers, raw HTML or styles. Build the closest supported button (or leave it out) and report the gap under "Differences" or "Not available":

- Trailing icon (icon on the right). Use a leading icon instead and report it.
- Icon-only button (no label). Leave it out and report it under "Not available".
- Icons other than plus, right arrow and trash.
- Loading or spinner state. Don't swap in `disabled` unless the user also asks for disabled.
- Full-width or stretched buttons.
- Links: `href`, `<a>` or link-styled buttons.
- Ghost, text, link, subtle or tertiary styles.
- Outline buttons with a colour (blue outline, red outline).
- Colours other than primary, blue and red.
- Pill/rounded, square or custom corner radius.
- Sizes other than small, medium and large.
- Any custom `className` or `style` on the button.

## appearance

```tsx
<HdsButton>Save changes</HdsButton>
<HdsButton appearance="outline">Cancel</HdsButton>
```

## size

```tsx
<HdsButton size="small">Small</HdsButton>
<HdsButton>Medium</HdsButton>
<HdsButton size="large">Large</HdsButton>
```

## color

Default appearance only.

```tsx
<HdsButton>Primary</HdsButton>
<HdsButton color="blue">Blue</HdsButton>
<HdsButton color="red">Red</HdsButton>
```

## icon and iconNode

```tsx
<HdsButton icon>New project</HdsButton>
<HdsButton icon iconNode={<HdsArrowRightIcon />}>Continue</HdsButton>
<HdsButton color="red" icon iconNode={<HdsTrashIcon />}>Delete</HdsButton>
```

## disabled

```tsx
<HdsButton disabled>Save changes</HdsButton>
<HdsButton appearance="outline" disabled>Cancel</HdsButton>
```

## Combined example

```tsx
<HdsButton appearance="outline" size="small" icon iconNode={<HdsArrowRightIcon />} disabled>
  Next
</HdsButton>
```

## Code snippet translation

Input:

```html
<button class="btn btn-danger btn-lg" onclick="remove()">
  <i class="icon-trash"></i> Delete
</button>
<button class="btn btn-secondary" disabled>Cancel</button>
<a href="/docs" class="btn btn-link">Learn more</a>
```

Output:

```tsx
import { HdsButton, HdsTrashIcon } from '@hds/ui';

<HdsButton size="large" color="red" icon iconNode={<HdsTrashIcon />}>Delete</HdsButton>
<HdsButton appearance="outline" disabled>Cancel</HdsButton>
```

- `btn-danger` → `color="red"`, `btn-lg` → `size="large"`, `btn-secondary` → `appearance="outline"`.
- The `<i>` icon moves out of `children` into `icon iconNode={<HdsTrashIcon />}`.
- `onclick`, `class` and other attributes are dropped (static output).
- The link button is left out and reported: **Not available:** "Learn more" link button.
