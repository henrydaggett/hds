import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DialRoot } from 'dialkit';
import 'dialkit/styles.css';
import './editor.css';
import './index.css';
import App from './App.tsx';

// Matches the sandbox's phone breakpoint in index.css.
const narrow = window.matchMedia('(max-width: 640px)').matches;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* DialKit hides itself in production builds; the deployed sandbox needs it.
        On phones the open panel would cover the page, so it starts closed there. */}
    <DialRoot position="top-right" defaultOpen={!narrow} productionEnabled />
  </StrictMode>,
);
