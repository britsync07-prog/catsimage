import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Failed to find the root element');
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    // If React completely fails to mount, this will ensure the screen isn't blank
    console.error('CRITICAL RENDER ERROR:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: monospace;">
        <h2>React Application Failed to Load</h2>
        <pre>${error instanceof Error ? error.message : 'Unknown Error'}</pre>
      </div>
    `;
  }
}
