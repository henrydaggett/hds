# HdsSeparator

A thin line between groups of content. Built on the [Base UI Separator](https://base-ui.com/react/components/separator).

```tsx
import { HdsSeparator } from '@hds/ui';
```

## Props

| Prop          | Type                         | Default        | Notes                                                    |
| ------------- | ---------------------------- | -------------- | -------------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Vertical stretches to the height of its flex row.        |

## Rules

- A horizontal separator fills the width of its container and is 1px tall.
- A vertical separator only shows inside a row layout (`display: flex`), where it stretches to the row's height.
- It adds no spacing of its own. Space it with the gap of its container.

## Examples

```tsx
<HdsSeparator />

<div className="hds-gap-12" style={{ display: 'flex' }}>
  <HdsButton appearance="outline">Undo</HdsButton>
  <HdsSeparator orientation="vertical" />
  <HdsButton appearance="outline">Share</HdsButton>
</div>
```
