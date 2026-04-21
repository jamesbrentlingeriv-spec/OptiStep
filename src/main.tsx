import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = '/sw.js';
    
    // Check if service worker exists before registering
    fetch(swUrl)
      .then(response => {
        if (response.ok) {
          navigator.serviceWorker.register(swUrl)
            .then(registration => {
              console.log('SW registered:', registration);
            })
            .catch(err => {
              console.log('SW registration failed:', err);
            });
        } else {
          console.log('Service worker not found at:', swUrl);
        }
      })
      .catch(err => {
        console.log('SW check failed:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);