import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('App initialization started...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Failed to find root element');
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Critical rendering error:', error);
    rootElement.innerHTML = '<h1>Something went wrong while loading the app.</h1><pre>' + (error as Error).message + '</pre>';
  }
}
