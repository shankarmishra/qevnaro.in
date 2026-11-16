import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Self-hosted fonts: bundled and fingerprinted by Vite, no third-party request
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/montserrat/800.css';
import './index.css';
import { AppShell } from './App';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </StrictMode>
);

// Prerendered pages arrive with markup already in #root: attach to it instead of re-rendering.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
