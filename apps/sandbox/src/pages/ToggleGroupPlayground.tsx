import { useDialKit } from 'dialkit';
import {
  HdsAlignCenterIcon,
  HdsAlignLeftIcon,
  HdsAlignRightIcon,
  HdsBoldIcon,
  HdsItalicIcon,
  HdsToggle,
  HdsToggleGroup,
  HdsUnderlineIcon,
  type ToggleGroupSize,
} from '@hds/ui';
import { Stage } from '../components/Playground';
import { bool, jsx, str } from '../lib/jsx';

const sizes: ToggleGroupSize[] = ['small', 'medium', 'large'];

const groupContent = {
  alignment: [
    { value: 'left', label: 'Align left', icon: <HdsAlignLeftIcon />, iconName: 'HdsAlignLeftIcon' },
    { value: 'center', label: 'Align center', icon: <HdsAlignCenterIcon />, iconName: 'HdsAlignCenterIcon' },
    { value: 'right', label: 'Align right', icon: <HdsAlignRightIcon />, iconName: 'HdsAlignRightIcon' },
  ],
  formatting: [
    { value: 'bold', label: 'Bold', icon: <HdsBoldIcon />, iconName: 'HdsBoldIcon' },
    { value: 'italic', label: 'Italic', icon: <HdsItalicIcon />, iconName: 'HdsItalicIcon' },
    { value: 'underline', label: 'Underline', icon: <HdsUnderlineIcon />, iconName: 'HdsUnderlineIcon' },
  ],
  text: [
    { value: 'list', label: 'List', icon: null, iconName: '' },
    { value: 'board', label: 'Board', icon: null, iconName: '' },
    { value: 'timeline', label: 'Timeline', icon: null, iconName: '' },
  ],
};

const groupLabels: Record<keyof typeof groupContent, string> = {
  alignment: 'Text alignment',
  formatting: 'Text formatting',
  text: 'View',
};

export function ToggleGroupPlayground() {
  const dial = useDialKit('Toggle group', {
    content: { type: 'select', options: Object.keys(groupContent), default: 'alignment' },
    size: { type: 'select', options: sizes, default: 'medium' },
    multiple: false,
    orientation: { type: 'select', options: ['horizontal', 'vertical'], default: 'horizontal' },
    disabled: false,
  });

  const contentKey = dial.content as keyof typeof groupContent;
  const content = groupContent[contentKey];
  const groupLabel = groupLabels[contentKey];
  const size = dial.size as ToggleGroupSize;
  const orientation = dial.orientation as 'horizontal' | 'vertical';
  const defaultValue = [content[0].value];

  const snippet = jsx(
    'HdsToggleGroup',
    [
      str('size', size, 'medium'),
      bool('multiple', dial.multiple),
      str('orientation', orientation, 'horizontal'),
      `aria-label="${groupLabel}"`,
      `defaultValue={['${defaultValue[0]}']}`,
      bool('disabled', dial.disabled),
    ],
    content.map((item) =>
      item.icon
        ? jsx('HdsToggle', [`value="${item.value}"`, `iconNode={<${item.iconName} />}`, `aria-label="${item.label}"`])
        : jsx('HdsToggle', [`value="${item.value}"`], item.label),
    ),
  );

  return (
    <Stage snippet={snippet}>
      <HdsToggleGroup
        key={`${dial.content}-${dial.multiple}`}
        size={size}
        multiple={dial.multiple}
        orientation={orientation}
        disabled={dial.disabled}
        defaultValue={defaultValue}
        aria-label={groupLabel}
      >
        {content.map((item) =>
          item.icon ? (
            <HdsToggle key={item.value} value={item.value} iconNode={item.icon} aria-label={item.label} />
          ) : (
            <HdsToggle key={item.value} value={item.value}>
              {item.label}
            </HdsToggle>
          ),
        )}
      </HdsToggleGroup>
    </Stage>
  );
}
