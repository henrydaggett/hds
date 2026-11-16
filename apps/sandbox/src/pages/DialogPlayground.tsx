import { useDialKit } from 'dialkit';
import { DsButton, DsDialog, DsDialogClose, type DialogSize } from '@ds-build/ui';
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
    `  ${jsx('DsDialogClose', [], [jsx('DsButton', ['appearance="outline"'], 'Cancel')]).replace(/\n/g, '\n  ')}`,
    `  ${jsx('DsButton', ['color="red"'], 'Delete')}`,
    '</>',
  ].join('\n');

  const snippet = jsxStacked('DsDialog', [
    expr('trigger', jsx('DsButton', ['color="red"'], 'Delete project')),
    `title="${title}"`,
    str('description', dial.description),
    str('size', size, 'medium'),
    dial.footer && `footer={\n${footerSnippet.replace(/^/gm, '  ')}\n}`,
  ]);

  return (
    <Stage snippet={snippet}>
      <DsDialog
        trigger={<DsButton color="red">Delete project</DsButton>}
        title={title}
        description={dial.description || undefined}
        size={size}
        footer={
          dial.footer ? (
            <>
              <DsDialogClose>
                <DsButton appearance="outline">Cancel</DsButton>
              </DsDialogClose>
              <DsButton color="red">Delete</DsButton>
            </>
          ) : undefined
        }
      />
    </Stage>
  );
}
