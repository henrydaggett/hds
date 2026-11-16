import { useDialKit } from 'dialkit';
import { HdsTab, HdsTabs, type TabsSize } from '@hds/ui';
import { Stage } from '../components/Playground';
import { bool, jsx, str } from '../lib/jsx';

const sizes: TabsSize[] = ['small', 'medium', 'large'];

const tabs = [
  { value: 'overview', label: 'Overview', text: 'A summary of the project.' },
  { value: 'activity', label: 'Activity', text: 'Recent changes by the team.' },
  { value: 'settings', label: 'Settings', text: 'Project name, members and billing.' },
];

export function TabsPlayground() {
  const dial = useDialKit('Tabs', {
    size: { type: 'select', options: sizes, default: 'medium' },
    selected: { type: 'select', options: tabs.map((t) => t.value), default: 'overview' },
    disableLast: false,
  });

  const size = dial.size as TabsSize;
  const last = tabs.length - 1;

  const snippet = jsx(
    'HdsTabs',
    [str('size', size, 'medium'), str('defaultValue', dial.selected, 'overview'), 'aria-label="Project"'],
    tabs.map((t, i) =>
      jsx(
        'HdsTab',
        [`value="${t.value}"`, `label="${t.label}"`, bool('disabled', dial.disableLast && i === last)],
        t.text,
      ),
    ),
  );

  return (
    <Stage snippet={snippet} width={480}>
      <HdsTabs key={dial.selected} size={size} defaultValue={dial.selected} aria-label="Project">
        {tabs.map((t, i) => (
          <HdsTab key={t.value} value={t.value} label={t.label} disabled={dial.disableLast && i === last}>
            {t.text}
          </HdsTab>
        ))}
      </HdsTabs>
    </Stage>
  );
}
