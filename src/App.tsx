
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import EquivalencePartitions from "./pages/EquivalencePartitions";
import BVA3Points from "./pages/BVA3Points";
import BVA2Points from "./pages/BVA2Points";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Always show NavBar except 404 */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/partitions" element={<><NavBar /><EquivalencePartitions /></>} />
          <Route path="/bva-3points" element={<><NavBar /><BVA3Points /></>} />
          <Route path="/bva-2points" element={<><NavBar /><BVA2Points /></>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
