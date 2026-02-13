import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { PanicPage } from './pages/PanicPage';
import { EscapeRoutesPage } from './pages/EscapeRoutesPage';
import { ReportPage } from './pages/ReportPage';
import { FeedPage } from './pages/FeedPage';
import { ConfigPage } from './pages/ConfigPage';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<PanicPage />} />
            <Route path="/routes" element={<EscapeRoutesPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/config" element={<ConfigPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
}

export default App;