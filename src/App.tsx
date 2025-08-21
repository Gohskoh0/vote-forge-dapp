import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { WalletConnection } from "@/components/wallet-connection";
import Dashboard from "./pages/Dashboard";
import Proposals from "./pages/Proposals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              {/* Top Header */}
              <header className="h-14 border-b border-border/50 dao-card flex items-center justify-between px-4">
                <SidebarTrigger className="dao-glow" />
                <WalletConnection />
              </header>
              
              {/* Main Content */}
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/proposals" element={<Proposals />} />
                  <Route path="/proposals/:id" element={<div className="p-8 text-center">Proposal Detail - Coming Soon</div>} />
                  <Route path="/create" element={<div className="p-8 text-center">Create Proposal - Coming Soon</div>} />
                  <Route path="/members" element={<div className="p-8 text-center">Members - Coming Soon</div>} />
                  <Route path="/treasury" element={<div className="p-8 text-center">Treasury - Coming Soon</div>} />
                  <Route path="/settings" element={<div className="p-8 text-center">Settings - Coming Soon</div>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
