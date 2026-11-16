import { useEffect, useMemo, useState } from 'react';
import { compile } from './compile';
import { Editor } from './Editor';
import { Preview } from './Preview';

const storageKey = 'hds:generator';

const starter = `import { HdsButton, HdsField, HdsForm, HdsFormActions, HdsTextInput } from '@hds/ui';

export default function App() {
  return (
    <>
      <HdsForm>
        <HdsField label="Email" name="email">
          <HdsTextInput type="email" placeholder="you@example.com" />
        </HdsField>
        <HdsFormActions>
          <HdsButton type="submit">Subscribe</HdsButton>
        </HdsFormActions>
      </HdsForm>
    </>
  );
}
`;

export function GeneratorApp() {
  const [initialValue, setInitialValue] = useState(() => localStorage.getItem(storageKey) ?? starter);
  const [editorKey, setEditorKey] = useState(0);
  const [code, setCode] = useState(initialValue);
  const [debounced, setDebounced] = useState(initialValue);

  function reset() {
    setInitialValue('');
    setCode('');
    setDebounced('');
    setEditorKey((key) => key + 1);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(code);
      localStorage.setItem(storageKey, code);
    }, 300);
    return () => clearTimeout(timer);
  }, [code]);

  const result = useMemo(() => compile(debounced), [debounced]);

  return (
    <div className="generator">
      <div className="editor-panel">
        <div className="toolbar">
          <a className="toolbar-button" href={import.meta.env.BASE_URL}>
            Back to components
          </a>
          {/* hds-lint-disable-next-line raw-element -- part of the dark code editor chrome */}
          <button type="button" className="toolbar-button" onClick={reset}>
            Reset
          </button>
        </div>
        <Editor key={editorKey} initialValue={initialValue} onChange={setCode} />
      </div>
      <Preview result={result} />
    </div>
  );
}
