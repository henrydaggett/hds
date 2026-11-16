import { useDialKit } from 'dialkit';
import { HdsCheckbox, HdsField, HdsSelect, HdsTextInput } from '@hds/ui';
import { Stage } from '../components/Playground';
import { bool, jsx, jsxStacked, str } from '../lib/jsx';

const roles = [
  { value: 'designer', label: 'Designer' },
  { value: 'engineer', label: 'Engineer' },
  { value: 'pm', label: 'Product manager' },
];

const controls = ['HdsTextInput', 'HdsSelect', 'HdsCheckbox'] as const;
type Control = (typeof controls)[number];

const controlSnippets: Record<Control, string> = {
  HdsTextInput: jsx('HdsTextInput', ['type="email"', 'placeholder="you@example.com"']),
  HdsSelect: jsx('HdsSelect', [
    'placeholder="Select a role"',
    `items={[${roles.map((r) => `{ value: '${r.value}', label: '${r.label}' }`).join(', ')}]}`,
  ]),
  HdsCheckbox: jsx('HdsCheckbox', ['label="I agree to the terms"']),
};

export function FieldPlayground() {
  const dial = useDialKit('Field', {
    control: { type: 'select', options: [...controls], default: 'HdsTextInput' },
    label: { type: 'text', default: 'Email', placeholder: 'Label' },
    description: { type: 'text', default: "We'll never share your email.", placeholder: 'Helper text' },
    error: { type: 'text', default: 'Enter a valid email address.', placeholder: 'Error text' },
    invalid: false,
    disabled: false,
  });

  const control = dial.control as Control;
  const label = control === 'HdsCheckbox' ? undefined : dial.label || undefined;

  const snippet = jsxStacked(
    'HdsField',
    [
      str('label', label),
      str('description', dial.description),
      str('error', dial.error),
      bool('invalid', dial.invalid),
      bool('disabled', dial.disabled),
    ],
    [controlSnippets[control]],
  );

  return (
    <Stage snippet={snippet} width={320}>
      <HdsField
        key={control}
        label={label}
        description={dial.description || undefined}
        error={dial.error || undefined}
        invalid={dial.invalid}
        disabled={dial.disabled}
      >
        {control === 'HdsTextInput' ? (
          <HdsTextInput type="email" placeholder="you@example.com" />
        ) : control === 'HdsSelect' ? (
          <HdsSelect placeholder="Select a role" items={roles} />
        ) : (
          <HdsCheckbox label="I agree to the terms" />
        )}
      </HdsField>
    </Stage>
  );
}
