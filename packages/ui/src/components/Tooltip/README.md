# HdsTooltip

A short text hint shown when its child is hovered or focused. Built on the [Base UI Tooltip](https://base-ui.com/react/components/tooltip).

```tsx
import { HdsTooltip } from '@hds/ui';
```

## Props

| Prop           | Type                                     | Default | Notes                                              |
| -------------- | ---------------------------------------- | ------- | -------------------------------------------------- |
| `content`      | `ReactNode`                              | –       | Required. The tooltip text.                        |
| `children`     | `ReactElement`                           | –       | Required. One focusable element, e.g. a `HdsButton`. |
| `side`         | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Flips automatically when there's no room.          |
| `delay`        | `number`                                 | `600`   | Milliseconds of hover before it opens.             |
| `defaultOpen`  | `boolean`                                | `false` | Starts open (uncontrolled).                        |
| `open`         | `boolean`                                | –       | Controlled. Use with `onOpenChange`.               |
| `onOpenChange` | `(open: boolean) => void`                | –       | Called when the tooltip opens or closes.           |
| `disabled`     | `boolean`                                | `false` | The tooltip never opens.                           |

## Rules

- The child must be a single element that accepts a `ref` and props and can take focus: `HdsButton`, `HdsToggle`. Not plain text.
- A tooltip is a hint, not the element's name. Icon-only controls still need their `aria-label`.
- Keep the text to a few words. It wraps at 240px.

## Examples

```tsx
<HdsTooltip content="Creates an empty project">
  <HdsButton icon>New project</HdsButton>
</HdsTooltip>

<HdsTooltip content="Bold" side="bottom">
  <HdsToggle iconNode={<HdsBoldIcon />} aria-label="Bold" />
</HdsTooltip>
```
