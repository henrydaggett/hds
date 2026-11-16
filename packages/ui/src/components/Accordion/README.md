# DsAccordion

A stack of headings that each expand to show content. Built on the [Base UI Accordion](https://base-ui.com/react/components/accordion).

```tsx
import { DsAccordion, DsAccordionItem } from '@ds-build/ui';
```

## DsAccordion props

| Prop            | Type                        | Default | Notes                                               |
| --------------- | --------------------------- | ------- | --------------------------------------------------- |
| `defaultValue`  | `string[]`                  | –       | `value`s of the items that start open.              |
| `value`         | `string[]`                  | –       | Controlled. Use with `onValueChange`.               |
| `onValueChange` | `(value: string[]) => void` | –       | Called when an item opens or closes.                |
| `multiple`      | `boolean`                   | `false` | Lets several items stay open. Otherwise opening one closes the others. |
| `disabled`      | `boolean`                   | `false` | Disables every item.                                |

## DsAccordionItem props

| Prop       | Type        | Default | Notes                                           |
| ---------- | ----------- | ------- | ----------------------------------------------- |
| `value`    | `string`    | –       | Required. Unique within the `DsAccordion`.      |
| `title`    | `ReactNode` | –       | Required. Text of the header button.            |
| `disabled` | `boolean`   | `false` | The item can't be opened or closed.             |
| `children` | `ReactNode` | –       | Required. Content shown when the item is open.  |

## Rules

- Children of `DsAccordion` are `DsAccordionItem`s.
- All items start closed unless listed in `defaultValue`.
- The accordion fills the width of its container, with a line above, between and below the items.

## Examples

```tsx
<DsAccordion defaultValue={['shipping']}>
  <DsAccordionItem value="shipping" title="How long does shipping take?">
    Orders arrive in 3 to 5 working days.
  </DsAccordionItem>
  <DsAccordionItem value="returns" title="Can I return an item?">
    Yes, within 30 days of delivery.
  </DsAccordionItem>
</DsAccordion>

<DsAccordion multiple>
  <DsAccordionItem value="a" title="Section A">…</DsAccordionItem>
  <DsAccordionItem value="b" title="Section B" disabled>…</DsAccordionItem>
</DsAccordion>
```
