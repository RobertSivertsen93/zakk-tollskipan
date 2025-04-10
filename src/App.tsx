
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Results from "./pages/Results";
import DetailedResults from "./pages/DetailedResults";
import NotFound from "./pages/NotFound";
import HSCodeLookup from "./pages/HSCodeLookup";
import HSTable from "./pages/HSTable";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route element={
              <div className="flex h-screen">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/detailed-results" element={<DetailedResults />} />
                    <Route path="/hscode-lookup" element={<HSCodeLookup />} />
                    <Route path="/hs-table" element={<HSTable />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
