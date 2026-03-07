import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('--- STARTING APP ---');

const rootElement = document.getElementById('root');

if (rootElement) {
  // Add a visible test marker directly to the DOM
  const testMarker = document.createElement('div');
  testMarker.style.background = 'red';
  testMarker.style.color = 'white';
  testMarker.style.padding = '10px';
  testMarker.style.position = 'fixed';
  testMarker.style.top = '0';
  testMarker.style.left = '0';
  testMarker.style.zIndex = '9999';
  testMarker.innerText = 'JS EXECUTING';
  document.body.appendChild(testMarker);

  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('--- RENDER CALLED ---');
    testMarker.innerText = 'REACT RENDER CALLED';
    testMarker.style.background = 'green';
  } catch (err) {
    console.error('--- RENDER ERROR ---', err);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: sans-serif;">
        <h1>React Crash Detected</h1>
        <pre>${err instanceof Error ? err.message : String(err)}</pre>
        <pre>${err instanceof Error ? err.stack : ''}</pre>
      </div>
    `;
  }
} else {
  console.error('--- ROOT ELEMENT NOT FOUND ---');
}
