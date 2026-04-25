import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Auth from './components/Auth';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ModulePage from './pages/ModulePage';
import IntroSplash from './components/IntroSplash';

function AppRoutes() {
  const { user, loading } = useAuth();
  const [showIntro, setShowIntro] = useState(true);

  // Show intro splash during initial load
  if (loading && showIntro) {
    return <IntroSplash onComplete={() => setShowIntro(false)} />;
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <>
      {showIntro && <IntroSplash onComplete={() => setShowIntro(false)} />}
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/library" element={<Dashboard />} /> {/* Same for now, can be expanded */}
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}