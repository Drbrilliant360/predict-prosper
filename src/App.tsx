import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import MySlips from "./pages/MySlips";
import Pundits from "./pages/Pundits";
import Leaderboard from "./pages/Leaderboard";
import WalletPage from "./pages/Wallet";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPundits from "./pages/admin/AdminPundits";
import AdminSlips from "./pages/admin/AdminSlips";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminPayouts from "./pages/admin/AdminPayouts";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAds from "./pages/admin/AdminAds";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/slips" element={<MySlips />} />
          <Route path="/pundits" element={<Pundits />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/pundits" element={<AdminPundits />} />
          <Route path="/admin/slips" element={<AdminSlips />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/disputes" element={<AdminDisputes />} />
          <Route path="/admin/payouts" element={<AdminPayouts />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/ads" element={<AdminAds />} />
          <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
