import { HdsArrowRightIcon, HdsCloseIcon, HdsMenuIcon, HdsToggle } from '@hds/ui';
import { DialRoot, DialStore } from 'dialkit';
import { useEffect, useRef, useState, type ComponentType } from 'react';
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

/** Tracks a CSS media query. The queries below match the breakpoints in index.css. */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = () => setMatches(list.matches);
    onChange();
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export default function App() {
  const hash = useHash();
  const active = pages.find((page) => page.id === hash) ?? pages[0];
  const narrow = useMediaQuery('(max-width: 640px)');
  // Below 1000px there's no room for the props panel, so DialKit collapses to its icon.
  const compact = useMediaQuery('(max-width: 999px)');

  // DialKit remembers each panel's open state when it switches between the inline
  // panel and the icon, so set it when crossing 1000px: collapsed into the icon
  // below, open in the side panel above.
  useEffect(() => {
    for (const panel of DialStore.getPanels('panel')) DialStore.setPanelOpen(panel.id, !compact);
  }, [compact]);
  // The page the menu was opened on. Going to another page (a link, the back
  // button) closes it, and it only shows on phones.
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const menuShown = narrow && menuOpenOn === active.id;
  const setMenuOpen = (open: boolean) => setMenuOpenOn(open ? active.id : null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // While the full-screen menu is open: the page behind it doesn't scroll, Escape
  // closes it, and focus moves into it (and back to the button when it closes).
  useEffect(() => {
    if (!menuShown) return;
    const button = menuButton.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    firstLink.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpenOn(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKeyDown);
      button?.focus();
    };
  }, [menuShown]);

  return (
    <div className="layout" data-menu-open={menuShown ? '' : undefined}>
      <header className="topbar">
        <HdsToggle
          ref={menuButton}
          iconNode={menuShown ? <HdsCloseIcon /> : <HdsMenuIcon />}
          aria-label={menuShown ? 'Close menu' : 'Open menu'}
          aria-expanded={menuShown}
          aria-controls="sidebar"
          pressed={menuShown}
          onPressedChange={setMenuOpen}
        />
        <span className="topbar-title">{active.label}</span>
      </header>
      <nav id="sidebar" className="sidebar" aria-label="Components">
        <ul className="sidebar-links" role="list">
          {pages.map((page, index) => (
            <li key={page.id}>
              <a
                ref={index === 0 ? firstLink : undefined}
                className="sidebar-link"
                aria-current={page.id === active.id ? 'page' : undefined}
                href={`#${page.id}`}
                onClick={() => setMenuOpen(false)}
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
      {/* DialKit hides itself in production builds; the deployed sandbox needs it.
          1000px and wider: a permanent panel on the right. Narrower: DialKit's floating icon.
          Light theme to match the sandbox, whatever the system setting. */}
      {compact ? (
        <DialRoot key="popover" position="top-right" defaultOpen={false} theme="light" productionEnabled />
      ) : (
        <aside className="controls" aria-label="Props">
          <DialRoot key="inline" mode="inline" theme="light" productionEnabled />
        </aside>
      )}
    </div>
  );
}
