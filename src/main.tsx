import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TreeMatchApp from './components/page.tsx';

import './index.css';

const appContainer = document.getElementById('root');
if (appContainer) {
  createRoot(appContainer).render(
    <StrictMode>
      <TreeMatchApp />
    </StrictMode>,
  );
}
