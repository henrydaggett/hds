# HdsAccordion

A stack of rows, each a heading button with a chevron that expands to show its content. Lines separate the rows.

## Quick reference

```tsx
import { HdsAccordion, HdsAccordionItem } from '@hds/ui';

<HdsAccordion>
  <HdsAccordionItem value="one" title="Question one">
    Answer one.
  </HdsAccordionItem>
  <HdsAccordionItem value="two" title="Question two">
    Answer two.
  </HdsAccordionItem>
</HdsAccordion>
```

HdsAccordion props: `defaultValue`, `multiple`, `disabled`. HdsAccordionItem props: `value` (required), `title` (required), `disabled`. Nothing else.

## Import

```tsx
import { HdsAccordion, HdsAccordionItem } from '@hds/ui';
```

## Structure

HdsAccordion children are HdsAccordionItems only. Each item's `title` is the heading; its children are the content shown when open (plain text, or design system content with [typography](typography.md) classes).

## Props

**HdsAccordion**

| Prop           | Write as                          | Default (omit) | Notes                                         |
| -------------- | --------------------------------- | -------------- | --------------------------------------------- |
| `defaultValue` | `defaultValue={['shipping']}`     | all closed     | `value`s of the items shown open.             |
| `multiple`     | `multiple`                        | off            | Several items can be open at once. Needed when more than one is shown open. |
| `disabled`     | `disabled`                        | off            | Disables every item.                          |

**HdsAccordionItem**

| Prop       | Write as                  | Default (omit) | Notes                                    |
| ---------- | ------------------------- | -------------- | ---------------------------------------- |
| `value`    | `value="shipping"`        | –              | Required. Short lowercase id, unique.    |
| `title`    | `title="Shipping"`        | –              | Required. Plain text.                    |
| `disabled` | `disabled`                | off            | Can't be opened or closed.               |

No `value`/`onValueChange` on HdsAccordion, and no `className`, `style` or event handlers.

### Composing rules

- Write `defaultValue` as an array, even for one item.
- With more than one value in `defaultValue`, add `multiple`.
- Item content is required, even for a closed item. Use the content from the input; if a closed item's content isn't shown, write one short plausible sentence for it.

## Visual identification

| Looks like                                                         | Means                     |
| ------------------------------------------------------------------ | ------------------------- |
| Rows of 14px medium-weight text, each with a chevron ⌄ on the right, separated by light grey lines `#dcdce0` | HdsAccordion |
| Chevron pointing up ⌃ with text revealed under the heading         | That item is open (`defaultValue`) |
| Grey heading `#7d7d86`                                             | `disabled` item           |
| A single "Show more" toggle with no lines                          | Not supported             |

## Input-to-prop mapping

| User says                                        | Write as                         |
| ------------------------------------------------ | -------------------------------- |
| accordion, FAQ, collapsible sections, expandable rows, disclosure | `<HdsAccordion>`  |
| open, expanded                                   | the item's value in `defaultValue` |
| several open at once, independent sections       | `multiple`                       |

## Not supported

- Bordered cards around each item, or filled backgrounds.
- Icons or plus/minus markers instead of the chevron.
- Chevron on the left.
- Nested accordions.
- Any custom `className` or `style`.

## Code snippet translation

Input:

```html
<details open><summary>How long does shipping take?</summary><p>3 to 5 working days.</p></details>
<details><summary>Can I return an item?</summary><p>Yes, within 30 days.</p></details>
<a href="/faq">See all questions</a>
```

Output:

```tsx
import { HdsAccordion, HdsAccordionItem } from '@hds/ui';

<HdsAccordion defaultValue={['shipping']}>
  <HdsAccordionItem value="shipping" title="How long does shipping take?">
    3 to 5 working days.
  </HdsAccordionItem>
  <HdsAccordionItem value="returns" title="Can I return an item?">
    Yes, within 30 days.
  </HdsAccordionItem>
</HdsAccordion>
```

- Each `<details>` → `HdsAccordionItem`; `<summary>` → `title`; `open` → `defaultValue`.
- **Not available:** the "See all questions" link.
