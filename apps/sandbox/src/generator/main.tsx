import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@hds/ui/tokens.css';
import '../editor.css';
import './generator.css';
import { GeneratorApp } from './GeneratorApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GeneratorApp />
  </StrictMode>,
);
