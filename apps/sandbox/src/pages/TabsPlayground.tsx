import { useDialKit } from 'dialkit';
import { DsTab, DsTabs, type TabsSize } from '@ds-build/ui';
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
    'DsTabs',
    [str('size', size, 'medium'), str('defaultValue', dial.selected, 'overview'), 'aria-label="Project"'],
    tabs.map((t, i) =>
      jsx(
        'DsTab',
        [`value="${t.value}"`, `label="${t.label}"`, bool('disabled', dial.disableLast && i === last)],
        t.text,
      ),
    ),
  );

  return (
    <Stage snippet={snippet} width={480}>
      <DsTabs key={dial.selected} size={size} defaultValue={dial.selected} aria-label="Project">
        {tabs.map((t, i) => (
          <DsTab key={t.value} value={t.value} label={t.label} disabled={dial.disableLast && i === last}>
            {t.text}
          </DsTab>
        ))}
      </DsTabs>
    </Stage>
  );
}
