import { HdsArrowRightIcon } from '@hds/ui';
import { useEffect, useState, type ComponentType } from 'react';
import { AccordionPlayground } from './pages/AccordionPlayground';
import { ButtonPlayground } from './pages/ButtonPlayground';
import { CheckboxGroupPlayground } from './pages/CheckboxGroupPlayground';
import { CheckboxPlayground } from './pages/CheckboxPlayground';
import { DialogPlayground } from './pages/DialogPlayground';
import { FieldPlayground } from './pages/FieldPlayground';
import { FieldsetPlayground } from './pages/FieldsetPlayground';
import { FormPlayground } from './pages/FormPlayground';
import { MenuPlayground } from './pages/MenuPlayground';
import { RadioGroupPlayground } from './pages/RadioGroupPlayground';
import { SelectPlayground } from './pages/SelectPlayground';
import { SeparatorPlayground } from './pages/SeparatorPlayground';
import { SwitchPlayground } from './pages/SwitchPlayground';
import { TabsPlayground } from './pages/TabsPlayground';
import { TextInputPlayground } from './pages/TextInputPlayground';
import { ToggleGroupPlayground } from './pages/ToggleGroupPlayground';
import { TogglePlayground } from './pages/TogglePlayground';
import { TooltipPlayground } from './pages/TooltipPlayground';

const pages: { id: string; label: string; Page: ComponentType }[] = [
  { id: 'button', label: 'Button', Page: ButtonPlayground },
  { id: 'toggle', label: 'Toggle', Page: TogglePlayground },
  { id: 'toggle-group', label: 'Toggle group', Page: ToggleGroupPlayground },
  { id: 'text-input', label: 'Text input', Page: TextInputPlayground },
  { id: 'select', label: 'Select', Page: SelectPlayground },
  { id: 'checkbox', label: 'Checkbox', Page: CheckboxPlayground },
  { id: 'checkbox-group', label: 'Checkbox group', Page: CheckboxGroupPlayground },
  { id: 'radio-group', label: 'Radio group', Page: RadioGroupPlayground },
  { id: 'switch', label: 'Switch', Page: SwitchPlayground },
  { id: 'field', label: 'Field', Page: FieldPlayground },
  { id: 'fieldset', label: 'Fieldset', Page: FieldsetPlayground },
  { id: 'form', label: 'Form', Page: FormPlayground },
  { id: 'tabs', label: 'Tabs', Page: TabsPlayground },
  { id: 'accordion', label: 'Accordion', Page: AccordionPlayground },
  { id: 'dialog', label: 'Dialog', Page: DialogPlayground },
  { id: 'menu', label: 'Menu', Page: MenuPlayground },
  { id: 'tooltip', label: 'Tooltip', Page: TooltipPlayground },
  { id: 'separator', label: 'Separator', Page: SeparatorPlayground },
];

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash.slice(1));

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash.slice(1));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return hash;
}

export default function App() {
  const hash = useHash();
  const active = pages.find((page) => page.id === hash) ?? pages[0];

  return (
    <div className="layout">
      <nav className="sidebar" aria-label="Components">
        <ul className="sidebar-links" role="list">
          {pages.map((page) => (
            <li key={page.id}>
              <a
                className="sidebar-link"
                aria-current={page.id === active.id ? 'page' : undefined}
                href={`#${page.id}`}
              >
                {page.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <a className="sidebar-link" href={`${import.meta.env.BASE_URL}generator/`}>
            UI generator
            <HdsArrowRightIcon />
          </a>
        </div>
      </nav>
      <main className="content">
        <active.Page key={active.id} />
      </main>
    </div>
  );
}
