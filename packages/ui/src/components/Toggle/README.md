# HdsToggle

A two-state button that can be pressed or not. Built on the [Base UI Toggle](https://base-ui.com/react/components/toggle).

```tsx
import { HdsToggle } from '@hds/ui';
```

## Props

| Prop             | Type                             | Default    | Notes                                                                  |
| ---------------- | -------------------------------- | ---------- | ---------------------------------------------------------------------- |
| `children`       | `ReactNode`                      | –          | The label. Omit for an icon-only toggle.                               |
| `iconNode`       | `ReactNode`                      | –          | Leading icon. Required when there's no `children`.                     |
| `aria-label`     | `string`                         | –          | Required for icon-only toggles.                                        |
| `size`           | `'small' \| 'medium' \| 'large'` | `'medium'` | Heights: 28px, 36px, 44px. Ignored inside a `HdsToggleGroup`.             |
| `defaultPressed` | `boolean`                        | `false`    | Starts pressed (uncontrolled).                                         |
| `pressed`        | `boolean`                        | –          | Controlled pressed state. Use with `onPressedChange`.                  |
| `value`          | `string`                         | –          | Identifies the toggle inside a `HdsToggleGroup`.                          |
| `disabled`       | `boolean`                        | `false`    |                                                                        |

Other native button and Base UI props are passed through.

## Rules

- Icon-only toggles must have an `aria-label` (enforced by the types).
- Inside a `HdsToggleGroup`, give each toggle a `value` and set `size` on the group instead.
- Use a HdsToggle for an on/off setting that applies immediately (e.g. Bold). For actions, use `HdsButton`.

## Examples

```tsx
<HdsToggle>Bold</HdsToggle>

<HdsToggle defaultPressed iconNode={<HdsBoldIcon />}>Bold</HdsToggle>

<HdsToggle iconNode={<HdsItalicIcon />} aria-label="Italic" />

<HdsToggle size="small" disabled>Wrap text</HdsToggle>
```
