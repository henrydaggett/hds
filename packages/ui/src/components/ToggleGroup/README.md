# HdsToggleGroup

Shares pressed state across a set of `HdsToggle`s, styled as a segmented control. Built on the [Base UI Toggle Group](https://base-ui.com/react/components/toggle-group).

```tsx
import { HdsToggleGroup, HdsToggle } from '@hds/ui';
```

## Props

| Prop           | Type                             | Default        | Notes                                                    |
| -------------- | -------------------------------- | -------------- | -------------------------------------------------------- |
| `size`         | `'small' \| 'medium' \| 'large'` | `'medium'`     | Sets every toggle's size. Group heights: 28, 36, 44px.   |
| `multiple`     | `boolean`                        | `false`        | Allow more than one toggle pressed at once.              |
| `defaultValue` | `string[]`                       | –              | Values of the toggles that start pressed.                |
| `value`        | `string[]`                       | –              | Controlled. Use with `onValueChange`.                    |
| `orientation`  | `'horizontal' \| 'vertical'`     | `'horizontal'` |                                                          |
| `disabled`     | `boolean`                        | `false`        | Disables every toggle.                                   |
| `aria-label`   | `string`                         | –              | Names the group for assistive tech.                      |

## Rules

- Children are `HdsToggle`s, each with a unique `value`.
- `defaultValue` is always an array, even when `multiple` is off: `defaultValue={['left']}`.
- Without `multiple`, pressing one toggle unpresses the others (single choice).
- Give the group an `aria-label` describing the choice (e.g. "Text alignment").

## Examples

```tsx
<HdsToggleGroup aria-label="Text alignment" defaultValue={['left']}>
  <HdsToggle value="left" iconNode={<HdsAlignLeftIcon />} aria-label="Align left" />
  <HdsToggle value="center" iconNode={<HdsAlignCenterIcon />} aria-label="Align center" />
  <HdsToggle value="right" iconNode={<HdsAlignRightIcon />} aria-label="Align right" />
</HdsToggleGroup>

<HdsToggleGroup multiple aria-label="Text formatting" defaultValue={['bold']}>
  <HdsToggle value="bold" iconNode={<HdsBoldIcon />} aria-label="Bold" />
  <HdsToggle value="italic" iconNode={<HdsItalicIcon />} aria-label="Italic" />
  <HdsToggle value="underline" iconNode={<HdsUnderlineIcon />} aria-label="Underline" />
</HdsToggleGroup>

<HdsToggleGroup size="small" aria-label="View" defaultValue={['list']}>
  <HdsToggle value="list">List</HdsToggle>
  <HdsToggle value="board">Board</HdsToggle>
</HdsToggleGroup>
```
