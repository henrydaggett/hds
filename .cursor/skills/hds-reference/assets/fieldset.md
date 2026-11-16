# HdsFieldset

Groups related fields under a section title (legend) with optional description. Renders a native `<fieldset>` with no border or background; the children stack with 16px spacing.

## Quick reference

```tsx
import { HdsFieldset, HdsField, HdsTextInput } from '@hds/ui';

<HdsFieldset legend="Section title">
  <HdsField label="Label">
    <HdsTextInput />
  </HdsField>
</HdsFieldset>
```

Allowed props: `legend`, `description`, `disabled`, and form children. Nothing else.

## Import

Use one import line from `@hds/ui`, shared with the fields inside:

```tsx
import { HdsFieldset, HdsField, HdsTextInput } from '@hds/ui';
```

Never import from sub-paths. No CSS import is needed.

## Structure

Children are `HdsField`s, `HdsCheckboxGroup`s and standalone `HdsCheckbox`es, in the order shown. A HdsFieldset usually sits inside a [`HdsForm`](form.md), one per titled section. Don't nest Fieldsets, and don't put `HdsFormActions` inside one.

```tsx
<HdsForm>
  <HdsFieldset legend="Billing details" description="Used on your invoices.">
    <HdsField label="Company">
      <HdsTextInput />
    </HdsField>
  </HdsFieldset>
  <HdsFormActions>
    <HdsButton type="submit">Save</HdsButton>
  </HdsFormActions>
</HdsForm>
```

## Props

| Prop          | Write as                               | Default (omit) | Notes                                          |
| ------------- | -------------------------------------- | -------------- | ---------------------------------------------- |
| `legend`      | `legend="Billing details"`             | –              | Section title above the fields.                |
| `description` | `description="Used on your invoices."` | –              | Grey text under the legend.                    |
| `disabled`    | `disabled`                             | off            | Disables and greys out every field inside.     |

These are the only props to use. No `className`, `style`, `name` or event handlers.

## Base setup

Start from the minimal fieldset:

```tsx
<HdsFieldset legend="Section title">
  <HdsField label="Label">
    <HdsTextInput />
  </HdsField>
</HdsFieldset>
```

Then add only the props the input needs, in this order:

1. `legend="…"` (almost always; without it a HdsFieldset adds nothing visible)
2. `description="…"` if there's text under the title
3. `disabled` if the whole section is disabled

Every compatible prop at once, for reference only:

```tsx
<HdsFieldset legend="Shipping address" description="Where we'll send your order." disabled>
  <HdsField label="Street">
    <HdsTextInput />
  </HdsField>
  <HdsField label="City">
    <HdsTextInput />
  </HdsField>
</HdsFieldset>
```

### Composing rules

- Only use a HdsFieldset when the input shows or names a titled section of fields. A single list of fields under a page heading doesn't need one.
- Don't wrap one `HdsCheckboxGroup` in a HdsFieldset just to title it: give the group a `label` instead.
- `disabled` on the HdsFieldset replaces `disabled` on each HdsField inside. Don't repeat it.
- Don't add spacing between children; the 16px gap is built in.

## Visual identification

Use this to match form sections in an image.

| Looks like                                                                 | Means                    |
| -------------------------------------------------------------------------- | ------------------------ |
| 16px medium-weight title `#18181b` above a set of fields, no border        | `legend`                 |
| 13px grey text `#7d7d86` directly under the title (4px gap)                | `description`            |
| Fields 16px apart under the title                                          | the HdsFieldset's children  |
| Every label and control in the section greyed out                          | `disabled`               |

A section with a visible border, card or background is still a HdsFieldset; report the box under "Differences". A 14px title directly above checkboxes is a `HdsCheckboxGroup` label, not a legend.

## Input-to-prop mapping

| User says                                            | Write as                    |
| ---------------------------------------------------- | --------------------------- |
| section, group of fields, step, "X details" heading  | `<HdsFieldset legend="…">`     |
| section subtitle, intro text, explanation            | `description="…"`           |
| whole section disabled, locked section               | `disabled`                  |

## Not supported

The HdsFieldset can't do any of the following. Don't approximate them. Build the closest supported version (or leave it out) and report it under "Differences" or "Not available":

- Borders, cards, backgrounds or dividers around the section.
- Collapsible sections. A [`HdsAccordion`](accordion.md) can't hold form fields inside a `HdsForm`; report it.
- Multi-column field layouts (e.g. first and last name side by side). Stack the fields and report it.
- Headings other than the legend (no separate titles inside).
- Step indicators or numbering.
- Any custom `className` or `style`.

## legend and description

```tsx
<HdsFieldset legend="Account" description="How you sign in.">
  <HdsField label="Email">
    <HdsTextInput type="email" />
  </HdsField>
  <HdsField label="Password">
    <HdsTextInput type="password" />
  </HdsField>
</HdsFieldset>
```

## disabled

```tsx
<HdsFieldset legend="Team settings" disabled>
  <HdsField label="Team name">
    <HdsTextInput defaultValue="Design" />
  </HdsField>
  <HdsCheckbox label="Allow guests" defaultChecked />
</HdsFieldset>
```

## Combined example

```tsx
<HdsFieldset legend="Preferences" description="You can change these later.">
  <HdsField label="Language">
    <HdsSelect
      defaultValue="en"
      items={[
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'French' },
      ]}
    />
  </HdsField>
  <HdsCheckboxGroup label="Email me about" defaultValue={['product']}>
    <HdsCheckbox value="product" label="Product updates" />
    <HdsCheckbox value="events" label="Events" />
  </HdsCheckboxGroup>
</HdsFieldset>
```

## Code snippet translation

Input:

```html
<fieldset class="border rounded p-3">
  <legend class="h5">Billing details</legend>
  <p class="text-muted">Used on your invoices.</p>
  <div class="row">
    <div class="col"><label>Company</label><input class="form-control"></div>
    <div class="col"><label>VAT number</label><input class="form-control" placeholder="GB123456789"></div>
  </div>
</fieldset>
```

Output:

```tsx
import { HdsFieldset, HdsField, HdsTextInput } from '@hds/ui';

<HdsFieldset legend="Billing details" description="Used on your invoices.">
  <HdsField label="Company">
    <HdsTextInput />
  </HdsField>
  <HdsField label="VAT number">
    <HdsTextInput placeholder="GB123456789" />
  </HdsField>
</HdsFieldset>
```

- `<legend>` → `legend`; the muted `<p>` → `description`.
- Each label + input pair becomes a `HdsField` with a `HdsTextInput`.
- **Differences:** the border and padding are dropped, and the two-column row is stacked.
