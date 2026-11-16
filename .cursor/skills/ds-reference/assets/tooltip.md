# DsTooltip

A small dark label that appears next to an element when it's hovered or focused. It wraps exactly one element.

## Quick reference

```tsx
import { DsTooltip, DsButton } from '@ds-build/ui';

<DsTooltip content="Hint">
  <DsButton>Label</DsButton>
</DsTooltip>
```

Allowed props: `content` (required), `side`, `defaultOpen`. Nothing else.

## Import

```tsx
import { DsTooltip } from '@ds-build/ui';
```

## Structure

The only child is one [`DsButton`](button.md) or [`DsToggle`](toggle.md). Never text, an icon on its own, a `<span>` or a field.

## Props

| Prop          | Write as                     | Default (omit) | Notes                                     |
| ------------- | ---------------------------- | -------------- | ----------------------------------------- |
| `content`     | `content="Bold"`             | –              | Required. Plain text, a few words.        |
| `side`        | `side="bottom"`, `side="left"`, `side="right"` | `top` | Where it appears. It flips if there's no room. |
| `defaultOpen` | `defaultOpen`                | closed         | Shows the tooltip on load.                |

No `delay`, `open`, `onOpenChange`, `disabled`, `className`, `style` or event handlers.

### Composing rules

- Write `defaultOpen` only when the input shows the tooltip visible.
- An icon-only DsToggle inside a tooltip still needs its own `aria-label`.
- Don't wrap a disabled button: it can't be hovered or focused.

## Visual identification

| Looks like                                                   | Means                    |
| ------------------------------------------------------------ | ------------------------ |
| Small near-black `#18181b` rounded label, white 13px text, next to a button | DsTooltip with `defaultOpen` |
| Label above / below / left / right of the button             | `side`                   |
| White card with a heading and longer text on hover           | Not supported (preview card / popover) |

## Input-to-prop mapping

| User says                                     | Write as                     |
| --------------------------------------------- | ---------------------------- |
| tooltip, hint on hover, title attribute       | `<DsTooltip content="…">`    |
| info icon with a tooltip next to a label      | Not supported (see below)    |

## Not supported

- Tooltips on plain text, icons, inputs or labels. Leave the tooltip out and report it.
- Info "ⓘ" icons next to field labels.
- Rich content (headings, links, images) or long text.
- Arrows, light themes or other colours.
- Any custom `className` or `style`.

## Code snippet translation

Input:

```html
<button class="btn btn-light" title="Copy link" data-bs-toggle="tooltip" data-bs-placement="bottom">
  <i class="bi bi-link"></i>
</button>
<span title="Last edited 2 hours ago">Edited</span>
```

Output:

```tsx
import { DsTooltip, DsButton } from '@ds-build/ui';

<DsTooltip content="Copy link" side="bottom">
  <DsButton appearance="outline">Copy link</DsButton>
</DsTooltip>
```

- `title` + `data-bs-toggle="tooltip"` → `DsTooltip content`; `data-bs-placement` → `side`.
- **Differences:** there's no link icon and DsButton can't be icon-only, so the button shows the text "Copy link".
- **Not available:** the tooltip on the "Edited" text.
