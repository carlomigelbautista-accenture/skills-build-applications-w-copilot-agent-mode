
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Log the REACT_APP_CODESPACE_NAME for debugging
console.log('REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

reportWebVitals();
