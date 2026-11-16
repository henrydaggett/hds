# HdsSelect

A single-choice dropdown that fills the width of its container. The options are passed as an `items` array; the trigger shows the chosen label (or a placeholder) and a chevron. Its label, helper text and error come from a wrapping [`HdsField`](field.md).

## Quick reference

```tsx
import { HdsField, HdsSelect } from '@hds/ui';

<HdsField label="Label">
  <HdsSelect
    items={[
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
    ]}
  />
</HdsField>
```

Allowed props: `items` (required), `placeholder`, `size`, `defaultValue`, `required`, `disabled`, `aria-label` (no visible label only). Nothing else.

## Import

Use one import line from `@hds/ui`, shared with the other components in the snippet:

```tsx
import { HdsField, HdsSelect } from '@hds/ui';
```

Never import from sub-paths. No CSS import is needed. Don't import `HdsChevronDownIcon` or `HdsCheckIcon`: the HdsSelect draws its own.

## Structure

A HdsSelect with a visible label goes inside a `HdsField` (see [field.md](field.md)). Without a visible label, use it on its own with `aria-label`.

Each item is `{ value: '…', label: '…' }`, plus `disabled: true` for an option that can't be picked. Items appear in array order.

```tsx
<HdsField label="Country">
  <HdsSelect
    placeholder="Select a country"
    items={[
      { value: 'uk', label: 'United Kingdom' },
      { value: 'us', label: 'United States' },
    ]}
  />
</HdsField>
```

## Props

| Prop           | Write as                                         | Default (omit) | Notes                                                      |
| -------------- | ------------------------------------------------ | -------------- | ---------------------------------------------------------- |
| `items`        | `items={[{ value: 'uk', label: 'United Kingdom' }]}` | –          | Required. The options. Add `disabled: true` to an item to disable it. |
| `placeholder`  | `placeholder="Select a country"`                 | empty trigger  | Grey text shown while nothing is selected.                 |
| `size`         | `size="small"`, `size="large"`                   | `medium`       | Trigger heights 28/36/44px.                                |
| `defaultValue` | `defaultValue="uk"`                              | nothing selected | Must equal one item's `value`.                           |
| `required`     | `required`                                       | off            | Fails validation when nothing is selected on submit.       |
| `disabled`     | `disabled`                                       | off            | Prefer `disabled` on the `HdsField` when there is one.        |
| `aria-label`   | `aria-label="Sort by"`                           | –              | Only when there's no `HdsField` with a `label`. Required then. |

These are the only props to use. No `value`, `onValueChange`, `name` (put it on the `HdsField`), `readOnly`, `id`, `className`, `style` or event handlers. No children: the tag is always self-closing.

## Base setup

Start from the minimal labelled select:

```tsx
<HdsField label="Label">
  <HdsSelect
    items={[
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
    ]}
  />
</HdsField>
```

Then add only the props the input needs, in this order (`items` always last):

1. `size="small"` or `size="large"` if it isn't medium
2. `placeholder="…"` if the trigger shows grey prompt text
3. `defaultValue="…"` if an option is shown selected
4. `required` if the user says it's required
5. `disabled` if it's disabled and there's no `HdsField`
6. `aria-label="…"` if there's no `HdsField` label
7. `items={[…]}`

Every compatible prop at once, for reference only:

```tsx
<HdsSelect
  size="small"
  placeholder="Sort by"
  defaultValue="newest"
  required
  disabled
  aria-label="Sort by"
  items={[
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'popular', label: 'Most popular', disabled: true },
  ]}
/>
```

### Composing rules

- Leave out any prop that's set to its default. Never write `size="medium"`.
- Write boolean props as bare attributes: `required`, `disabled`. Inside items, write `disabled: true` only on disabled items.
- Each `value` is a short lowercase id derived from the label (`'United Kingdom'` → `'uk'` or `'united-kingdom'`). Values must be unique.
- `defaultValue` must match an item's `value`, not its label.
- Use only the options the user gives. If the input names the select but no options (e.g. "a country dropdown"), include just the options it implies and keep the list short (3–5). Don't pad with extras.
- With `defaultValue`, the placeholder isn't visible, so leave `placeholder` out unless the user asks for both.
- Always write the HdsSelect over several lines: one attribute per line, `items` last, one item per line.
- Never use `aria-label` inside a `HdsField` that has a `label`.

## Valid variants

| Variant      | Write as                                             |
| ------------ | ---------------------------------------------------- |
| Placeholder  | `<HdsSelect placeholder="…" items={…} />`               |
| Selected     | `<HdsSelect defaultValue="…" items={…} />`              |
| Disabled     | `<HdsField label="…" disabled>` around the HdsSelect       |
| Invalid      | `<HdsField label="…" invalid error="…">` around the HdsSelect |

The snippet always renders the dropdown closed. There's one visual style.

## Visual identification

Use this to match dropdowns in an image.

| Looks like                                                              | Means                       |
| ----------------------------------------------------------------------- | --------------------------- |
| White box, 1px grey border `#c4c4ca`, full width, chevron ⌄ on the right | HdsSelect                      |
| Grey text `#7d7d86` in the trigger                                      | `placeholder`               |
| Near-black text `#18181b` in the trigger                                | `defaultValue` (that option's value) |
| Red border `#dc2626`, usually with red text below                       | Invalid: `HdsField invalid error="…"` |
| Light grey fill `#eeeef0`, light border `#dcdce0`, grey text            | Disabled                    |
| Open list below the trigger (white panel, shadow, tick next to one option) | Same HdsSelect; the snippet shows it closed. Read the options from the list and the tick as `defaultValue` |

A box without a chevron is a [`HdsTextInput`](text-input.md).

**Size** (pick the nearest; trigger height is the most reliable signal):

| Size   | Height | Text | Corner radius | Chevron |
| ------ | ------ | ---- | ------------- | ------- |
| small  | 28px   | 13px | 6px           | 14px    |
| medium | 36px   | 14px | 8px           | 16px    |
| large  | 44px   | 16px | 10px          | 18px    |

If unclear, use medium (omit `size`).

## Input-to-prop mapping

| User says                                              | Write as                     |
| ------------------------------------------------------ | ---------------------------- |
| select, dropdown, picker, menu to choose one, combo    | `<HdsSelect />` in a `HdsField`    |
| "choose a…", "select a…" prompt text                   | `placeholder="…"`            |
| preselected, default option, "X is selected"           | `defaultValue="x"`           |
| options, choices, list of…                             | `items={[…]}`                |
| unavailable option, greyed-out option                  | `disabled: true` on that item |
| required, mandatory                                    | `required`                   |
| disabled, greyed out (whole select)                    | `disabled` (on the `HdsField` if there is one) |
| small, compact / large, big                            | `size="small"` / `size="large"` |

## Not supported

The HdsSelect can't do any of the following. Don't approximate them with other props, wrappers, raw HTML or styles. Build the closest supported select (or leave it out) and report it under "Differences" or "Not available":

- Multi-select. Use a [`HdsCheckboxGroup`](checkbox-group.md) only if the user describes checkboxes; otherwise build a single HdsSelect and report it.
- Search/typeahead, combobox or autocomplete inputs. Build a plain HdsSelect and report it.
- Option groups or headings, separators, descriptions under options.
- Icons, avatars or flags in the trigger or options.
- Showing the dropdown open in the snippet.
- Action menus (a button that opens commands like Edit / Delete). Use a [`HdsMenu`](menu.md).
- Fixed or custom widths. It always fills its container.
- Sizes other than small, medium and large.
- Any custom `className` or `style`.

## items

```tsx
<HdsSelect
  aria-label="Status"
  items={[
    { value: 'todo', label: 'To do' },
    { value: 'doing', label: 'In progress' },
    { value: 'archived', label: 'Archived', disabled: true },
  ]}
/>
```

## placeholder and defaultValue

```tsx
<HdsField label="Role">
  <HdsSelect
    placeholder="Select a role"
    items={[
      { value: 'designer', label: 'Designer' },
      { value: 'engineer', label: 'Engineer' },
    ]}
  />
</HdsField>

<HdsField label="Role">
  <HdsSelect
    defaultValue="designer"
    items={[
      { value: 'designer', label: 'Designer' },
      { value: 'engineer', label: 'Engineer' },
    ]}
  />
</HdsField>
```

## size

```tsx
<HdsSelect
  size="small"
  defaultValue="newest"
  aria-label="Sort by"
  items={[
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ]}
/>
```

## required and disabled

```tsx
<HdsField label="Plan" error="Choose a plan.">
  <HdsSelect
    placeholder="Choose a plan"
    required
    items={[
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
    ]}
  />
</HdsField>

<HdsField label="Region" disabled>
  <HdsSelect
    defaultValue="eu"
    items={[
      { value: 'eu', label: 'Europe' },
      { value: 'us', label: 'United States' },
    ]}
  />
</HdsField>
```

## Combined example

```tsx
<HdsField label="Timezone" description="Used for due dates." invalid error="Choose a timezone.">
  <HdsSelect
    size="large"
    placeholder="Select a timezone"
    required
    items={[
      { value: 'london', label: 'London (GMT)' },
      { value: 'new-york', label: 'New York (EST)' },
      { value: 'tokyo', label: 'Tokyo (JST)' },
    ]}
  />
</HdsField>
```

## Code snippet translation

Input:

```html
<label for="size" class="form-label">Size</label>
<select id="size" class="form-select form-select-sm" onchange="update()">
  <option selected disabled>Choose a size</option>
  <option value="s">Small</option>
  <option value="m" selected>Medium</option>
  <option value="l" disabled>Large (sold out)</option>
</select>
<select multiple class="form-select">
  <option>Red</option>
  <option>Blue</option>
</select>
```

Output:

```tsx
import { HdsField, HdsSelect } from '@hds/ui';

<HdsField label="Size">
  <HdsSelect
    size="small"
    defaultValue="m"
    items={[
      { value: 's', label: 'Small' },
      { value: 'm', label: 'Medium' },
      { value: 'l', label: 'Large (sold out)', disabled: true },
    ]}
  />
</HdsField>
```

- `<label>` → `HdsField label`; `form-select-sm` → `size="small"`.
- The disabled first `<option>` is a prompt, so it becomes `placeholder`. It's dropped here because `selected` on "Medium" sets `defaultValue="m"` and hides the placeholder.
- Each other `<option>` becomes an item; `disabled` → `disabled: true`.
- The multi-select is left out: **Not available:** multi-select (Red, Blue).
- `id`, `onchange` and classes are dropped.
