import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { AuthGateModal } from '@/components/auth/AuthGateModal';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthProvider, LanguageProvider } from '@/contexts';
import AppRoutes from '@/routes';

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            {/* Base Toast Provider (react-hot-toast) */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  background: '#fdfaf6',
                  color: '#111a13',
                  border: '1px solid #e6dfd1',
                  borderRadius: '0.875rem',
                  boxShadow: '0 10px 25px -8px rgba(26, 46, 32, 0.16)',
                  fontSize: '0.875rem',
                },
              }}
            />

            {/* StayNest UI Toast & Auth Gate Modal */}
            <SonnerToaster position="top-center" />
            <AuthGateModal />

            {/* Centralized Route Tree */}
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
