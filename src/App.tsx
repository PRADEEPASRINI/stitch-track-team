
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/utils/authUtils";

import Index from "./pages/Index";
import Quality from "./pages/Quality";
import Cutting from "./pages/Cutting";
import Stitching from "./pages/Stitching";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/quality" 
              element={
                <ProtectedRoute>
                  <Quality />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cutting" 
              element={
                <ProtectedRoute>
                  <Cutting />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/stitching" 
              element={
                <ProtectedRoute>
                  <Stitching />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
