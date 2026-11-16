# HdsField guidelines

## When to use

- Wrap every HdsTextInput and HdsSelect that has a visible label in a HdsField.
- Wrap a HdsCheckbox in a HdsField only when it needs helper text or an error.
- Use one control per HdsField.

## Content

- Keep labels short nouns: "Email", "Company name".
- Use sentence case and no colon after the label.
- Use the description for format hints or why the info is needed.
- Write errors that say how to fix the problem: "Enter a valid email address".
- Only show an error state when the input shows or describes one.

## Layout

- Stack Fields vertically, one per row.
- Let HdsForm or HdsFieldset handle the spacing between Fields.
- Use disabled on the HdsField rather than on the control.
