import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import TreeMatchApp from './components/tree-match-app.tsx';
import { TreeMatchProvider } from './services/context.tsx';

import './index.css';

const appContainer = document.getElementById('root');

if (appContainer) {
  createRoot(appContainer).render(
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <TreeMatchProvider>
          <TreeMatchApp />
        </TreeMatchProvider>
      </Suspense>
    </StrictMode>,
  );
}
