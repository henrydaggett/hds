import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DialRoot } from 'dialkit';
import 'dialkit/styles.css';
import './editor.css';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* DialKit hides itself in production builds; the deployed sandbox needs it. */}
    <DialRoot position="top-right" defaultOpen productionEnabled />
  </StrictMode>,
);
