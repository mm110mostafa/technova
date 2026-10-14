import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Fade out the boot loader once the first frame is painted.
requestAnimationFrame(() => {
  setTimeout(() => document.getElementById('boot')?.classList.add('done'), 250);
});
