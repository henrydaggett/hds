# HdsForm

A native `<form>` that stacks its children vertically with 20px spacing and validates the fields inside on submit. `HdsFormActions` is its row of buttons at the end.

## Quick reference

```tsx
import { HdsForm, HdsFormActions, HdsField, HdsTextInput, HdsButton } from '@hds/ui';

<HdsForm>
  <HdsField label="Label" name="label">
    <HdsTextInput />
  </HdsField>
  <HdsFormActions>
    <HdsButton type="submit">Submit</HdsButton>
  </HdsFormActions>
</HdsForm>
```

Allowed props: none on `HdsForm`. `align` on `HdsFormActions`. Nothing else.

## Import

Use one import line from `@hds/ui` with `HdsForm`, `HdsFormActions` (if there are buttons) and every component inside:

```tsx
import { HdsForm, HdsFormActions, HdsFieldset, HdsField, HdsTextInput, HdsSelect, HdsCheckbox, HdsButton } from '@hds/ui';
```

Never import from sub-paths. No CSS import is needed.

## Structure

`HdsForm` children, in the order shown in the input:

- [`HdsField`](field.md)s, each with a `name`
- [`HdsFieldset`](fieldset.md)s for titled sections (their Fields also get a `name`)
- [`HdsCheckboxGroup`](checkbox-group.md)s and [`HdsRadioGroup`](radio-group.md)s with a `name`
- Standalone [`HdsCheckbox`](checkbox.md)es and [`HdsSwitch`](switch.md)es with a `name`
- One `HdsFormActions`, always last, containing [`HdsButton`](button.md)s

```tsx
<HdsForm>
  <HdsFieldset legend="…">
    <HdsField label="…" name="…">…</HdsField>
  </HdsFieldset>
  <HdsCheckboxGroup label="…" name="…">…</HdsCheckboxGroup>
  <HdsCheckbox name="…" label="…" />
  <HdsFormActions>
    <HdsButton type="submit">…</HdsButton>
    <HdsButton appearance="outline">…</HdsButton>
  </HdsFormActions>
</HdsForm>
```

## Props

**HdsForm:** no props. Never write `onSubmit`, `onFormSubmit`, `action`, `method`, `errors`, `validationMode`, `className` or `style`.

**HdsFormActions:**

| Prop       | Write as        | Default (omit) | Notes                                      |
| ---------- | --------------- | -------------- | ------------------------------------------ |
| `align`    | `align="end"`   | `start`        | Pushes the buttons to the right edge.      |
| `children` | `HdsButton`s       | –              | Required. Buttons only, 12px apart.        |

## Base setup

Start from the minimal form:

```tsx
<HdsForm>
  <HdsField label="Label" name="label">
    <HdsTextInput />
  </HdsField>
  <HdsFormActions>
    <HdsButton type="submit">Submit</HdsButton>
  </HdsFormActions>
</HdsForm>
```

Then:

1. Add each field, section, group and checkbox in the order shown.
2. Give every `HdsField`, `HdsCheckboxGroup`, `HdsRadioGroup` and standalone `HdsCheckbox` or `HdsSwitch` a `name`: a short lowercase id from its label (`"Email address"` → `"email"`, `"Company name"` → `"company"`). Names are unique.
3. Mark mandatory controls `required` and give their HdsField an `error` message (see [field.md](field.md)).
4. Put the buttons in one `HdsFormActions` at the end, primary action first. Give the submitting button `type="submit"`.
5. Add `align="end"` to `HdsFormActions` if the buttons sit on the right.

### Composing rules

- Only use a `HdsForm` when the input is a form (fields with a submit action). A lone search box or a settings toggle doesn't need one.
- No wrappers between `HdsForm` and its children: the 20px spacing is built in. Don't add `<div>`s, spacing styles or dividers.
- Exactly one button has `type="submit"`. Other buttons (Cancel, Back) have no `type`.
- Buttons inside `HdsFormActions` follow [button.md](button.md); `HdsFormActions` holds nothing but Buttons.
- Fields inside a HdsForm fill its width. If the input shows a narrow form, put a layout `style` with a `maxWidth` on a wrapping `<div>` only if the user asks for a specific width.

## Visual identification

Use this to match forms in an image.

| Looks like                                                        | Means                       |
| ----------------------------------------------------------------- | --------------------------- |
| Labelled inputs stacked 20px apart, with buttons at the bottom    | `HdsForm` + `HdsField`s + `HdsFormActions` |
| Buttons left-aligned under the fields, 12px apart                 | `<HdsFormActions>`             |
| Buttons right-aligned                                             | `<HdsFormActions align="end">` |
| Section titles splitting the fields                               | `HdsFieldset`s                 |

A form inside a modal goes in the body (children) of a [`HdsDialog`](dialog.md), keeping its own `HdsFormActions`; leave the dialog's `footer` out. A form inside a card or page with a heading: build only the form and report the card/heading under "Not available" if no asset covers it.

## Input-to-prop mapping

| User says                                     | Write as                         |
| --------------------------------------------- | -------------------------------- |
| form, sign-up, login, checkout, contact form  | `<HdsForm>`                         |
| submit, save, send, create, sign in (button)  | `<HdsButton type="submit">` in `HdsFormActions` |
| cancel, back, reset (button)                  | `<HdsButton appearance="outline">` in `HdsFormActions` |
| buttons on the right, right-aligned actions   | `<HdsFormActions align="end">`      |
| required, mandatory field                     | `required` on the control + `error` on its HdsField |

## Not supported

The HdsForm can't do any of the following. Don't approximate them with other props, wrappers, raw HTML or styles. Build the closest supported form (or leave it out) and report it under "Differences" or "Not available":

- Multi-column layouts or fields side by side. Stack them and report it.
- Multi-step wizards, progress bars or step indicators.
- A form title, intro paragraph or card container. No asset covers headings or cards; report them under "Not available".
- Server error summaries or success banners.
- Links in the actions row (e.g. "Forgot password?"). Leave them out and report them.
- Buttons outside `HdsFormActions`, or `HdsFormActions` anywhere but last.
- Any custom `className` or `style` on `HdsForm` or `HdsFormActions`.

## HdsFormActions align

```tsx
<HdsFormActions>
  <HdsButton type="submit">Save</HdsButton>
  <HdsButton appearance="outline">Cancel</HdsButton>
</HdsFormActions>

<HdsFormActions align="end">
  <HdsButton appearance="outline">Cancel</HdsButton>
  <HdsButton type="submit">Save</HdsButton>
</HdsFormActions>
```

With `align="end"`, keep the input's button order (often Cancel first, primary last).

## Combined example

```tsx
import { HdsForm, HdsFormActions, HdsFieldset, HdsField, HdsTextInput, HdsSelect, HdsCheckboxGroup, HdsCheckbox, HdsButton } from '@hds/ui';

<HdsForm>
  <HdsFieldset legend="Account">
    <HdsField label="Name" name="name" error="Enter your name.">
      <HdsTextInput placeholder="Ada Lovelace" required />
    </HdsField>
    <HdsField label="Email" name="email" error="Enter a valid email address.">
      <HdsTextInput type="email" placeholder="you@example.com" required />
    </HdsField>
    <HdsField label="Role" name="role">
      <HdsSelect
        placeholder="Select a role"
        items={[
          { value: 'designer', label: 'Designer' },
          { value: 'engineer', label: 'Engineer' },
        ]}
      />
    </HdsField>
  </HdsFieldset>
  <HdsCheckboxGroup label="Notifications" name="notifications" defaultValue={['email']}>
    <HdsCheckbox value="email" label="Email" />
    <HdsCheckbox value="sms" label="SMS" />
  </HdsCheckboxGroup>
  <HdsField name="terms" error="You must accept the terms.">
    <HdsCheckbox label="I agree to the terms" required />
  </HdsField>
  <HdsFormActions>
    <HdsButton type="submit">Create account</HdsButton>
    <HdsButton appearance="outline">Cancel</HdsButton>
  </HdsFormActions>
</HdsForm>
```

## Code snippet translation

Input:

```html
<form action="/login" method="post" class="card p-4">
  <h2>Sign in</h2>
  <div class="mb-3">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" class="form-control" required>
  </div>
  <div class="mb-3">
    <label for="pw">Password</label>
    <input type="password" id="pw" name="password" class="form-control" required>
  </div>
  <div class="form-check mb-3">
    <input type="checkbox" id="remember" name="remember" class="form-check-input">
    <label for="remember">Remember me</label>
  </div>
  <div class="d-flex justify-content-end gap-2">
    <a href="/forgot">Forgot password?</a>
    <button type="submit" class="btn btn-primary">Sign in</button>
  </div>
</form>
```

Output:

```tsx
import { HdsForm, HdsFormActions, HdsField, HdsTextInput, HdsCheckbox, HdsButton } from '@hds/ui';

<HdsForm>
  <HdsField label="Email" name="email">
    <HdsTextInput type="email" required />
  </HdsField>
  <HdsField label="Password" name="password">
    <HdsTextInput type="password" required />
  </HdsField>
  <HdsCheckbox name="remember" label="Remember me" />
  <HdsFormActions align="end">
    <HdsButton type="submit">Sign in</HdsButton>
  </HdsFormActions>
</HdsForm>
```

- `<form>` → `HdsForm`; `action`, `method` and the `card p-4` styling are dropped.
- Each label + input → `HdsField` + `HdsTextInput`; the input's `name` moves to the HdsField.
- `justify-content-end` → `HdsFormActions align="end"`; `btn-primary` → default HdsButton.
- **Not available:** "Sign in" heading, card container, "Forgot password?" link.
