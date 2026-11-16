# Components

Every component in `@ds-build/ui`. If it isn't listed here, it doesn't exist.

| Component | Exports | Use for | Replaces | Base UI | Asset | Guideline |
| --------- | ------- | ------- | -------- | ------- | ----- | --------- |
| Button | `DsButton` | Actions: save, submit, create, delete. | `<button>`, `.btn`, `<input type="submit">` | Button | [button](assets/button.md) | [button](guidelines/button.md) |
| Toggle | `DsToggle` | A button that stays pressed, e.g. Bold. | `<button aria-pressed>`, `.btn.active` toggle buttons | Toggle | [toggle](assets/toggle.md) | [toggle](guidelines/toggle.md) |
| Toggle group | `DsToggleGroup` | A segmented control: pick one or more of a few toggles. | `.btn-group` of toggles, segmented controls | Toggle Group | [toggle-group](assets/toggle-group.md) | [toggle-group](guidelines/toggle-group.md) |
| Text input | `DsTextInput` | Single-line text, email, password, number, etc. | `<input type="text|email|password|…">`, `.form-control` | Input | [text-input](assets/text-input.md) | [text-input](guidelines/text-input.md) |
| Select | `DsSelect` | Choose one value from a dropdown. | `<select>`, `.form-select`, custom dropdowns for values | Select | [select](assets/select.md) | [select](guidelines/select.md) |
| Checkbox | `DsCheckbox` | One yes/no choice, or an item in a checkbox group. | `<input type="checkbox">`, `.form-check` | Checkbox | [checkbox](assets/checkbox.md) | [checkbox](guidelines/checkbox.md) |
| Checkbox group | `DsCheckboxGroup` | Several checkboxes under one label. | `<fieldset>` of checkboxes | Checkbox Group | [checkbox-group](assets/checkbox-group.md) | [checkbox-group](guidelines/checkbox-group.md) |
| Radio group | `DsRadioGroup`, `DsRadio` | Choose exactly one of a few visible options. | `<input type="radio">` sets | Radio Group, Radio | [radio-group](assets/radio-group.md), [radio](assets/radio.md) | [radio-group](guidelines/radio-group.md) |
| Switch | `DsSwitch` | A setting that applies immediately. | `<input type="checkbox" role="switch">`, `.form-switch` | Switch | [switch](assets/switch.md) | [switch](guidelines/switch.md) |
| Field | `DsField` | Label, helper text and error around one control. | `<label>` + control + help/error text, `.form-group`, `.mb-3` wrappers | Field | [field](assets/field.md) | [field](guidelines/field.md) |
| Fieldset | `DsFieldset` | A titled section of fields. | `<fieldset>` + `<legend>` | Fieldset | [fieldset](assets/fieldset.md) | [fieldset](guidelines/fieldset.md) |
| Form | `DsForm`, `DsFormActions` | A form that validates on submit, and its button row. | `<form>` | Form | [form](assets/form.md) | [form](guidelines/form.md) |
| Tabs | `DsTabs`, `DsTab` | Switch between panels of related content. | `.nav-tabs`, `role="tablist"` | Tabs | [tabs](assets/tabs.md) | [tabs](guidelines/tabs.md) |
| Accordion | `DsAccordion`, `DsAccordionItem` | Expandable sections, FAQs. | `<details>`/`<summary>`, `.accordion`, `.collapse` | Accordion | [accordion](assets/accordion.md) | [accordion](guidelines/accordion.md) |
| Dialog | `DsDialog`, `DsDialogClose` | A modal for a confirmation or short task. | `<dialog>`, `.modal` | Dialog | [dialog](assets/dialog.md) | [dialog](guidelines/dialog.md) |
| Menu | `DsMenu`, `DsMenuItem`, `DsMenuSeparator` | A list of actions behind a button. | `.dropdown-menu` of actions, kebab/"⋯" menus | Menu | [menu](assets/menu.md) | [menu](guidelines/menu.md) |
| Tooltip | `DsTooltip` | A short hint on a button. | `title` attributes on buttons, `data-bs-toggle="tooltip"` | Tooltip | [tooltip](assets/tooltip.md) | [tooltip](guidelines/tooltip.md) |
| Separator | `DsSeparator` | A line between groups of content. | `<hr>`, border-only dividers | Separator | [separator](assets/separator.md) | [separator](guidelines/separator.md) |

## Icons

Exported from `@ds-build/ui`, 1em square, `currentColor` stroke. Pass them to `iconNode` props.

`DsPlusIcon`, `DsArrowRightIcon`, `DsTrashIcon`, `DsCheckIcon`, `DsMinusIcon`, `DsChevronDownIcon`, `DsBoldIcon`, `DsItalicIcon`, `DsUnderlineIcon`, `DsAlignLeftIcon`, `DsAlignCenterIcon`, `DsAlignRightIcon`, `DsCloseIcon`, `DsMoreIcon`, `DsEditIcon`.

## Styles

| Topic | Classes | Asset | Guideline |
| ----- | ------- | ----- | --------- |
| Typography | `ds-h1`…`ds-h6`, `ds-text-large`, `ds-text-medium`, `ds-text-small` | [typography](assets/typography.md) | [typography](guidelines/typography.md) |
| Spacing | `ds-gap-*`, `ds-p-*`, `ds-px-*`, `ds-py-*`, `ds-m-*`, `ds-mt-*`, `ds-mb-*` (values in px; see the asset) | [spacing](assets/spacing.md) | [spacing](guidelines/spacing.md) |

## Not in the system

Common requests with no component. Report them instead of building them: cards, tables, badges, avatars, alerts and toasts, progress bars, sliders, date pickers, comboboxes and autocomplete, drawers, popovers, navigation bars, breadcrumbs, pagination, links styled as buttons, and textareas.
