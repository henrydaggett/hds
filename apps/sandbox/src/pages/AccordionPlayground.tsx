import { useDialKit } from 'dialkit';
import { HdsAccordion, HdsAccordionItem } from '@hds/ui';
import { Stage } from '../components/Playground';
import { bool, jsx } from '../lib/jsx';

const items = [
  { value: 'shipping', title: 'How long does shipping take?', text: 'Orders arrive in 3 to 5 working days.' },
  { value: 'returns', title: 'Can I return an item?', text: 'Yes, within 30 days of delivery.' },
  { value: 'support', title: 'How do I contact support?', text: 'Email help@example.com at any time.' },
];

export function AccordionPlayground() {
  const dial = useDialKit('Accordion', {
    firstOpen: true,
    multiple: false,
    disabled: false,
  });

  const snippet = jsx(
    'HdsAccordion',
    [dial.firstOpen && "defaultValue={['shipping']}", bool('multiple', dial.multiple), bool('disabled', dial.disabled)],
    items.map((item) => jsx('HdsAccordionItem', [`value="${item.value}"`, `title="${item.title}"`], item.text)),
  );

  return (
    <Stage snippet={snippet} width={480}>
      <HdsAccordion
        key={String(dial.firstOpen)}
        defaultValue={dial.firstOpen ? ['shipping'] : undefined}
        multiple={dial.multiple}
        disabled={dial.disabled}
      >
        {items.map((item) => (
          <HdsAccordionItem key={item.value} value={item.value} title={item.title}>
            {item.text}
          </HdsAccordionItem>
        ))}
      </HdsAccordion>
    </Stage>
  );
}
