
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

import AuthPage from './components/auth/AuthPage';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Scholarships from './pages/Scholarships';
import Mentorship from './pages/Mentorship';
import Jobs from './pages/Jobs';
import Workshops from './pages/Workshops';
import Community from './pages/Community';
import CareerExplorer from './pages/CareerExplorer';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="bame-platform-theme">
        <AuthPage onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="bame-platform-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/scholarships" element={<Scholarships />} />
                <Route path="/mentorship" element={<Mentorship darkMode={false} />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/community" element={<Community />} />
                <Route path="/career-explorer" element={<CareerExplorer />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppLayout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
