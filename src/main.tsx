import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for PWA with update detection
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
              
              // Check for updates periodically
              setInterval(() => {
                registration.update();
              }, 60 * 1000); // Check every minute
              
              // Listen for updates
              registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (newWorker) {
                  newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                      // New content available, show notification
                      if (confirm('A new version of OptiStep Academy is available! Click OK to refresh and update.')) {
                        window.location.reload();
                      }
                    }
                  });
                }
              });
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