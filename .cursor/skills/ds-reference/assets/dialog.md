# DsDialog

A modal window centred over a dimmed page. It has a title with a ✕ close button, and optional description, body and footer buttons. It opens from a `trigger` element, or starts open with `defaultOpen`.

## Quick reference

```tsx
import { DsDialog, DsButton } from '@ds-build/ui';

<DsDialog trigger={<DsButton>Open</DsButton>} title="Title" />
```

DsDialog props: `trigger`, `title` (required), `description`, `footer`, `size`, `defaultOpen`. `DsDialogClose` wraps one footer button. Nothing else.

## Import

```tsx
import { DsDialog, DsDialogClose, DsButton } from '@ds-build/ui';
```

## Structure

```tsx
<DsDialog
  trigger={<DsButton>…</DsButton>}
  title="…"
  description="…"
  footer={
    <>
      <DsDialogClose>
        <DsButton appearance="outline">Cancel</DsButton>
      </DsDialogClose>
      <DsButton>Confirm</DsButton>
    </>
  }
>
  {/* optional body: fields, text */}
</DsDialog>
```

- `trigger` is one element, usually a [`DsButton`](button.md). Clicking it opens the dialog.
- `children` is the body, between the description and the footer.
- `footer` is a fragment of DsButtons, right-aligned, 8px apart. Wrap a button in `DsDialogClose` to make it close the dialog (Cancel, Done). Others don't close it.

## Props

| Prop          | Write as                                  | Default (omit) | Notes                                              |
| ------------- | ----------------------------------------- | -------------- | -------------------------------------------------- |
| `trigger`     | `trigger={<DsButton>Invite</DsButton>}`   | no trigger     | The button that opens it. Leave out only with `defaultOpen` and no visible button. |
| `title`       | `title="Delete project?"`                 | –              | Required. 18px semibold heading.                   |
| `description` | `description="This can't be undone."`     | –              | Grey 14px text under the title.                    |
| `footer`      | `footer={<>…</>}`                         | –              | Buttons at the bottom right.                       |
| `size`        | `size="small"`, `size="large"`            | `medium`       | Width 400 / 480 / 640px.                           |
| `defaultOpen` | `defaultOpen`                             | closed         | Shows the dialog open on load.                     |

No `open`, `onOpenChange`, `className`, `style` or event handlers.

## Base setup

1. `trigger={…}` for the button that opens it (if the input shows or names one)
2. `title="…"`
3. `description="…"` if there's supporting text
4. `size="small"` or `size="large"` if it isn't medium
5. `defaultOpen` if the input shows the dialog open
6. `footer={…}` if there are buttons
7. Children for any body content

### Composing rules

- Write the DsDialog over several lines, one attribute per line, in the order above.
- If the input is a picture or description of an open dialog, write `defaultOpen` so the prototype shows it. Include the trigger too if the input shows the button behind it.
- Put the main action last in the footer. Cancel is `appearance="outline"` inside `DsDialogClose`.
- Never add your own ✕ button, heading or backdrop: the dialog draws them.
- Body content follows the normal rules: [`DsField`](field.md)s, text with [typography](typography.md) classes. Don't wrap a body form in `DsForm` unless the input submits it.

## Visual identification

| Looks like                                                   | Means                         |
| ------------------------------------------------------------ | ----------------------------- |
| White panel, 12px corners, shadow, centred over a darkened page, ✕ top right | DsDialog with `defaultOpen` |
| Bold 18px text at the top of the panel                       | `title`                       |
| Grey 14px text under the title                               | `description`                 |
| Buttons in the bottom right corner                           | `footer`                      |
| Panel about 400 / 480 / 640px wide                           | `size` small / medium / large |
| Panel sliding in from the edge of the screen                 | Not supported (drawer)        |
| Small floating panel attached to a button, no dimmed page    | Not supported (popover), or a [`DsMenu`](menu.md) if it lists actions |

## Input-to-prop mapping

| User says                                          | Write as                       |
| -------------------------------------------------- | ------------------------------ |
| dialog, modal, popup window, lightbox, confirm box | `<DsDialog>`                   |
| confirmation ("Are you sure?")                     | `size="small"`, Cancel + action in `footer` |
| shown open, open state, "a modal that says…"       | `defaultOpen`                  |
| alert dialog (must choose an action)               | DsDialog; report that it can still be dismissed |

## Not supported

- Drawers, sheets or side panels. Leave them out and report under "Not available".
- Popovers (non-modal panels attached to an element).
- Dialogs without the ✕ button, or that can't be dismissed.
- Full-screen dialogs or custom widths.
- Images or icons in the header.
- Any custom `className` or `style`.

## Code snippet translation

Input:

```html
<button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#del">Delete</button>
<div class="modal" id="del">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">Delete file?</h5><button class="btn-close"></button></div>
      <div class="modal-body"><p>report.pdf will be removed.</p></div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</div>
```

Output:

```tsx
import { DsDialog, DsDialogClose, DsButton } from '@ds-build/ui';

<DsDialog
  trigger={<DsButton color="red">Delete</DsButton>}
  title="Delete file?"
  description="report.pdf will be removed."
  size="small"
  footer={
    <>
      <DsDialogClose>
        <DsButton appearance="outline">Cancel</DsButton>
      </DsDialogClose>
      <DsButton color="red">Delete</DsButton>
    </>
  }
/>
```

- The toggle button → `trigger`; `modal-title` → `title`; a one-line `modal-body` → `description`; `modal-sm` → `size="small"`.
- `data-bs-dismiss` → `DsDialogClose`; `btn-close` is dropped (built in).
