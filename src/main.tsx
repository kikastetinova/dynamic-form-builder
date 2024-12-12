import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';

import './index.css';

const appContainer = document.getElementById('root');

if (appContainer) {
  createRoot(appContainer).render(
    <StrictMode>
      <h1 className='text-2xl font-bold mb-5'>Dynamic Form Builder</h1>
      <App/>
    </StrictMode>
  );
}
