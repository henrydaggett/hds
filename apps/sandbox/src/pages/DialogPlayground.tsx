import { useDialKit } from 'dialkit';
import { HdsButton, HdsDialog, HdsDialogClose, type DialogSize } from '@hds/ui';
import { Stage } from '../components/Playground';
import { expr, jsx, jsxStacked, str } from '../lib/jsx';

const sizes: DialogSize[] = ['small', 'medium', 'large'];

export function DialogPlayground() {
  const dial = useDialKit('Dialog', {
    title: { type: 'text', default: 'Delete project?', placeholder: 'Title' },
    description: {
      type: 'text',
      default: 'This removes the project and all of its files.',
      placeholder: 'Description',
    },
    size: { type: 'select', options: sizes, default: 'small' },
    footer: true,
  });

  const size = dial.size as DialogSize;
  const title = dial.title.trim() || 'Dialog';

  const footerSnippet = [
    '<>',
    `  ${jsx('HdsDialogClose', [], [jsx('HdsButton', ['appearance="outline"'], 'Cancel')]).replace(/\n/g, '\n  ')}`,
    `  ${jsx('HdsButton', ['color="red"'], 'Delete')}`,
    '</>',
  ].join('\n');

  const snippet = jsxStacked('HdsDialog', [
    expr('trigger', jsx('HdsButton', ['color="red"'], 'Delete project')),
    `title="${title}"`,
    str('description', dial.description),
    str('size', size, 'medium'),
    dial.footer && `footer={\n${footerSnippet.replace(/^/gm, '  ')}\n}`,
  ]);

  return (
    <Stage snippet={snippet}>
      <HdsDialog
        trigger={<HdsButton color="red">Delete project</HdsButton>}
        title={title}
        description={dial.description || undefined}
        size={size}
        footer={
          dial.footer ? (
            <>
              <HdsDialogClose>
                <HdsButton appearance="outline">Cancel</HdsButton>
              </HdsDialogClose>
              <HdsButton color="red">Delete</HdsButton>
            </>
          ) : undefined
        }
      />
    </Stage>
  );
}
