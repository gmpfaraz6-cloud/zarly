import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App';
import { useAuthStore } from './stores/authStore';
import ErrorBoundary from './components/ErrorBoundary';

function AppWrapper() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AppWrapper />
        <Toaster position="top-right" />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
