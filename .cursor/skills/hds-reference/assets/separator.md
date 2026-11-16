# HdsSeparator

A 1px light grey line (`#dcdce0`) between groups of content. Horizontal by default; vertical inside a row.

## Quick reference

```tsx
import { HdsSeparator } from '@hds/ui';

<HdsSeparator />
```

Allowed props: `orientation`. Nothing else.

## Import

```tsx
import { HdsSeparator } from '@hds/ui';
```

## Props

| Prop          | Write as                   | Default (omit) | Notes                                               |
| ------------- | -------------------------- | -------------- | --------------------------------------------------- |
| `orientation` | `orientation="vertical"`   | `horizontal`   | Vertical only shows inside a `display: 'flex'` row. |

No `className`, `style` or children. The tag is always self-closing.

## Structure

- **Horizontal**: fills the width of its container. It adds no space of its own; the parent's gap spaces it.
- **Vertical**: put it between items in a row wrapper (`style={{ display: 'flex' }}` with a gap class). It stretches to the row's height.

```tsx
<div className="hds-gap-16" style={{ display: 'flex', flexDirection: 'column' }}>
  <p className="hds-text-medium">Account</p>
  <HdsSeparator />
  <p className="hds-text-medium">Billing</p>
</div>

<div className="hds-gap-12" style={{ display: 'flex' }}>
  <HdsButton appearance="outline">Undo</HdsButton>
  <HdsSeparator orientation="vertical" />
  <HdsButton appearance="outline">Share</HdsButton>
</div>
```

### Composing rules

- Never write `orientation="horizontal"`.
- Don't add margins to space it; use the parent's gap class from [spacing.md](spacing.md).
- Don't put a HdsSeparator inside a `HdsForm`, `HdsMenu` or `HdsAccordion`: use [`HdsMenuSeparator`](menu.md) in menus, and accordions draw their own lines.

## Visual identification

| Looks like                                           | Means                         |
| ---------------------------------------------------- | ----------------------------- |
| Thin light grey line across the content              | `<HdsSeparator />`             |
| Thin light grey line between items in a row          | `<HdsSeparator orientation="vertical" />` |
| Line between items in a dropdown of actions          | `HdsMenuSeparator`             |
| Line under a row of tabs                             | Part of [`HdsTabs`](tabs.md)   |
| Lines between collapsible rows                       | Part of [`HdsAccordion`](accordion.md) |

## Input-to-prop mapping

| User says                                   | Write as                                 |
| ------------------------------------------- | ---------------------------------------- |
| divider, separator, rule, `<hr>`, line      | `<HdsSeparator />`                        |
| vertical divider, pipe between items        | `<HdsSeparator orientation="vertical" />` |

## Not supported

- A label or text in the middle of the line ("or"). Build the line and report the text.
- Dashed, thick or coloured lines.
- Inset or partial-width lines.
- Any custom `className` or `style`.

## Code snippet translation

Input:

```html
<h3>Profile</h3>
<hr class="my-4 border-dashed">
<p>Name and photo</p>
```

Output:

```tsx
import { HdsSeparator } from '@hds/ui';

<div className="hds-gap-16" style={{ display: 'flex', flexDirection: 'column' }}>
  <h3 className="hds-h3">Profile</h3>
  <HdsSeparator />
  <p className="hds-text-medium">Name and photo</p>
</div>
```

- `<hr>` → `HdsSeparator`; `my-4` (16px) becomes the wrapper's `hds-gap-16`.
- **Differences:** the line is solid, not dashed.
