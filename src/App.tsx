
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Track from "./pages/Track";
import Reduce from "./pages/Reduce";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AuthenticatedLayout from "./components/layout/AuthenticatedLayout";
import Layout from "./components/layout/Layout";
import { useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/Auth";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Dashboard />
                </AuthenticatedLayout>
              </ProtectedRoute>
            } />
            <Route path="/track" element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Track />
                </AuthenticatedLayout>
              </ProtectedRoute>
            } />
            <Route path="/reduce" element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Reduce />
                </AuthenticatedLayout>
              </ProtectedRoute>
            } />
            <Route path="/about" element={<Layout><About /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
