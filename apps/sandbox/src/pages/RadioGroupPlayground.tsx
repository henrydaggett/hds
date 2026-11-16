import { useDialKit } from 'dialkit';
import { HdsRadio, HdsRadioGroup, type RadioGroupSize } from '@hds/ui';
import { Stage } from '../components/Playground';
import { bool, jsx, jsxStacked, str } from '../lib/jsx';

const sizes: RadioGroupSize[] = ['small', 'medium', 'large'];

const plans = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Team' },
];

const error = 'Choose a plan';

export function RadioGroupPlayground() {
  const dial = useDialKit('Radio group', {
    label: { type: 'text', default: 'Plan', placeholder: 'Group label' },
    description: { type: 'text', default: '', placeholder: 'Helper text' },
    size: { type: 'select', options: sizes, default: 'medium' },
    orientation: { type: 'select', options: ['vertical', 'horizontal'], default: 'vertical' },
    invalid: false,
    disabled: false,
  });

  const size = dial.size as RadioGroupSize;
  const orientation = dial.orientation as 'vertical' | 'horizontal';

  const snippet = jsxStacked(
    'HdsRadioGroup',
    [
      str('label', dial.label),
      str('description', dial.description),
      str('size', size, 'medium'),
      str('orientation', orientation, 'vertical'),
      'defaultValue="pro"',
      bool('invalid', dial.invalid),
      dial.invalid && `error="${error}"`,
      bool('disabled', dial.disabled),
    ],
    plans.map((p) => jsx('HdsRadio', [`value="${p.value}"`, `label="${p.label}"`])),
  );

  return (
    <Stage snippet={snippet}>
      <HdsRadioGroup
        label={dial.label || undefined}
        description={dial.description || undefined}
        size={size}
        orientation={orientation}
        defaultValue="pro"
        invalid={dial.invalid}
        error={dial.invalid ? error : undefined}
        disabled={dial.disabled}
        aria-label={dial.label ? undefined : 'Plan'}
      >
        {plans.map((p) => (
          <HdsRadio key={p.value} value={p.value} label={p.label} />
        ))}
      </HdsRadioGroup>
    </Stage>
  );
}
