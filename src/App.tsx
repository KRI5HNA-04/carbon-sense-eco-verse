
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Track from "./pages/Track";
import Reduce from "./pages/Reduce";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AuthenticatedLayout from "./components/layout/AuthenticatedLayout";
import Layout from "./components/layout/Layout";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app mount
    const storedUser = localStorage.getItem('carbonSenseUser');
    setIsLoggedIn(!!storedUser);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <AuthenticatedLayout>
                <Index />
              </AuthenticatedLayout>
            } />
            <Route path="/dashboard" element={
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            } />
            <Route path="/track" element={
              <AuthenticatedLayout>
                <Track />
              </AuthenticatedLayout>
            } />
            <Route path="/reduce" element={
              <AuthenticatedLayout>
                <Reduce />
              </AuthenticatedLayout>
            } />
            <Route path="/about" element={
              <AuthenticatedLayout>
                <About />
              </AuthenticatedLayout>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
