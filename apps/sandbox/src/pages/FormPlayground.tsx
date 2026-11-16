import { useState, type ReactNode } from 'react';
import { useDialKit } from 'dialkit';
import {
  HdsButton,
  HdsCheckbox,
  HdsCheckboxGroup,
  HdsField,
  HdsFieldset,
  HdsForm,
  HdsFormActions,
  HdsSelect,
  HdsTextInput,
} from '@hds/ui';
import { Stage } from '../components/Playground';
import { jsx, jsxStacked, str } from '../lib/jsx';

const roles = [
  { value: 'designer', label: 'Designer' },
  { value: 'engineer', label: 'Engineer' },
  { value: 'pm', label: 'Product manager' },
];

const rolesSnippet = `{[\n${roles
  .map((r) => `  { value: '${r.value}', label: '${r.label}' },`)
  .join('\n')}\n]}`;

export function FormPlayground() {
  const dial = useDialKit('Form', {
    fieldset: true,
    align: { type: 'select', options: ['start', 'end'], default: 'start' },
    validationMode: { type: 'select', options: ['onSubmit', 'onBlur', 'onChange'], default: 'onSubmit' },
  });
  const [submitted, setSubmitted] = useState<Record<string, unknown> | null>(null);

  const align = dial.align as 'start' | 'end';
  const validationMode = dial.validationMode as 'onSubmit' | 'onBlur' | 'onChange';

  const fieldSnippets = [
    jsx('HdsField', ['label="Name"', 'name="name"', 'error="Enter your name."'], [
      jsx('HdsTextInput', ['placeholder="Ada Lovelace"', 'required']),
    ]),
    jsx('HdsField', ['label="Email"', 'name="email"', 'error="Enter a valid email address."'], [
      jsx('HdsTextInput', ['type="email"', 'placeholder="you@example.com"', 'required']),
    ]),
    jsx('HdsField', ['label="Role"', 'name="role"'], [
      jsxStacked('HdsSelect', ['placeholder="Select a role"', `items=${rolesSnippet}`]),
    ]),
  ];

  const snippet = jsx('HdsForm', [str('validationMode', validationMode, 'onSubmit')], [
    ...(dial.fieldset ? [jsx('HdsFieldset', ['legend="Account"'], fieldSnippets)] : fieldSnippets),
    jsxStacked(
      'HdsCheckboxGroup',
      ['label="Notifications"', 'name="notifications"', "defaultValue={['email']}"],
      [jsx('HdsCheckbox', ['value="email"', 'label="Email"']), jsx('HdsCheckbox', ['value="sms"', 'label="SMS"'])],
    ),
    jsx('HdsField', ['name="terms"', 'error="You must accept the terms."'], [
      jsx('HdsCheckbox', ['label="I agree to the terms"', 'required']),
    ]),
    jsx('HdsFormActions', [str('align', align, 'start')], [
      jsx('HdsButton', ['type="submit"'], 'Create account'),
      jsx('HdsButton', ['appearance="outline"', 'type="reset"'], 'Cancel'),
    ]),
  ]);

  const fields: ReactNode = (
    <>
      <HdsField label="Name" name="name" error="Enter your name.">
        <HdsTextInput placeholder="Ada Lovelace" required />
      </HdsField>
      <HdsField label="Email" name="email" error="Enter a valid email address.">
        <HdsTextInput type="email" placeholder="you@example.com" required />
      </HdsField>
      <HdsField label="Role" name="role">
        <HdsSelect placeholder="Select a role" items={roles} />
      </HdsField>
    </>
  );

  return (
    <Stage
      snippet={snippet}
      width={400}
      note={submitted ? `Submitted: ${JSON.stringify(submitted)}` : undefined}
    >
      <HdsForm validationMode={validationMode} onFormSubmit={(values) => setSubmitted(values)}>
        {dial.fieldset ? <HdsFieldset legend="Account">{fields}</HdsFieldset> : fields}
        <HdsCheckboxGroup label="Notifications" name="notifications" defaultValue={['email']}>
          <HdsCheckbox value="email" label="Email" />
          <HdsCheckbox value="sms" label="SMS" />
        </HdsCheckboxGroup>
        <HdsField name="terms" error="You must accept the terms.">
          <HdsCheckbox label="I agree to the terms" required />
        </HdsField>
        <HdsFormActions align={align}>
          <HdsButton type="submit">Create account</HdsButton>
          <HdsButton appearance="outline" type="reset" onClick={() => setSubmitted(null)}>
            Cancel
          </HdsButton>
        </HdsFormActions>
      </HdsForm>
    </Stage>
  );
}
