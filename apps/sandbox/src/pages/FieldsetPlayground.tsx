import { useDialKit } from 'dialkit';
import { HdsField, HdsFieldset, HdsTextInput } from '@hds/ui';
import { Stage } from '../components/Playground';
import { bool, jsx, jsxStacked, str } from '../lib/jsx';

export function FieldsetPlayground() {
  const dial = useDialKit('Fieldset', {
    legend: { type: 'text', default: 'Billing details', placeholder: 'Legend' },
    description: { type: 'text', default: 'Used on your invoices.', placeholder: 'Description' },
    disabled: false,
  });

  const snippet = jsxStacked(
    'HdsFieldset',
    [str('legend', dial.legend), str('description', dial.description), bool('disabled', dial.disabled)],
    [
      jsx('HdsField', ['label="Company"'], [jsx('HdsTextInput', ['placeholder="Acme Inc."'])]),
      jsx('HdsField', ['label="VAT number"'], [jsx('HdsTextInput', ['placeholder="GB123456789"'])]),
    ],
  );

  return (
    <Stage snippet={snippet} width={360}>
      <HdsFieldset
        legend={dial.legend || undefined}
        description={dial.description || undefined}
        disabled={dial.disabled}
      >
        <HdsField label="Company">
          <HdsTextInput placeholder="Acme Inc." />
        </HdsField>
        <HdsField label="VAT number">
          <HdsTextInput placeholder="GB123456789" />
        </HdsField>
      </HdsFieldset>
    </Stage>
  );
}
