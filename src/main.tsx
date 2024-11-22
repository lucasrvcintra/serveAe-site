import { Toaster } from 'sonner';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/components/theme-provider';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <StrictMode>
      <App />
      <Toaster richColors duration={1000} />
    </StrictMode>
  </ThemeProvider>
);
