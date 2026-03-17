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
import PunditDashboard from "./pages/pundit/PunditDashboard";
import PunditProfile from "./pages/pundit/PunditProfile";
import CreateSlip from "./pages/pundit/CreateSlip";
import ManageSlips from "./pages/pundit/ManageSlips";
import PunditAnalytics from "./pages/pundit/PunditAnalytics";
import PunditSales from "./pages/pundit/PunditSales";
import PunditWithdrawals from "./pages/pundit/PunditWithdrawals";
import PunditReviews from "./pages/pundit/PunditReviews";
import PunditFollowers from "./pages/pundit/PunditFollowers";
import PunditPromotions from "./pages/pundit/PunditPromotions";
import PunditSettings from "./pages/pundit/PunditSettings";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Customer routes */}
          <Route path="/" element={<Index />} />
          <Route path="/slips" element={<MySlips />} />
          <Route path="/pundits" element={<Pundits />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin routes */}
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

          {/* Pundit routes */}
          <Route path="/pundit" element={<PunditDashboard />} />
          <Route path="/pundit/profile" element={<PunditProfile />} />
          <Route path="/pundit/create-slip" element={<CreateSlip />} />
          <Route path="/pundit/slips" element={<ManageSlips />} />
          <Route path="/pundit/analytics" element={<PunditAnalytics />} />
          <Route path="/pundit/sales" element={<PunditSales />} />
          <Route path="/pundit/withdrawals" element={<PunditWithdrawals />} />
          <Route path="/pundit/reviews" element={<PunditReviews />} />
          <Route path="/pundit/followers" element={<PunditFollowers />} />
          <Route path="/pundit/promotions" element={<PunditPromotions />} />
          <Route path="/pundit/settings" element={<PunditSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
