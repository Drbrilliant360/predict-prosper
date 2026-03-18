import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import MySlips from "./pages/MySlips";
import Punters from "./pages/Pundits";
import Leaderboard from "./pages/Leaderboard";
import WalletPage from "./pages/Wallet";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPunters from "./pages/admin/AdminPundits";
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
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />

            {/* Customer routes */}
            <Route path="/" element={<Index />} />
            <Route path="/slips" element={<MySlips />} />
            <Route path="/punters" element={<Punters />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />

            {/* Admin routes - protected */}
            <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/punters" element={<ProtectedRoute requiredRole="admin"><AdminPunters /></ProtectedRoute>} />
            <Route path="/admin/slips" element={<ProtectedRoute requiredRole="admin"><AdminSlips /></ProtectedRoute>} />
            <Route path="/admin/payments" element={<ProtectedRoute requiredRole="admin"><AdminPayments /></ProtectedRoute>} />
            <Route path="/admin/disputes" element={<ProtectedRoute requiredRole="admin"><AdminDisputes /></ProtectedRoute>} />
            <Route path="/admin/payouts" element={<ProtectedRoute requiredRole="admin"><AdminPayouts /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute requiredRole="admin"><AdminReports /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute requiredRole="admin"><AdminSettings /></ProtectedRoute>} />
            <Route path="/admin/ads" element={<ProtectedRoute requiredRole="admin"><AdminAds /></ProtectedRoute>} />
            <Route path="/admin/audit-logs" element={<ProtectedRoute requiredRole="admin"><AdminAuditLogs /></ProtectedRoute>} />

            {/* Pundit routes - protected */}
            <Route path="/punter" element={<ProtectedRoute requiredRole="punter"><PunditDashboard /></ProtectedRoute>} />
            <Route path="/punter/profile" element={<ProtectedRoute requiredRole="punter"><PunditProfile /></ProtectedRoute>} />
            <Route path="/punter/create-slip" element={<ProtectedRoute requiredRole="punter"><CreateSlip /></ProtectedRoute>} />
            <Route path="/punter/slips" element={<ProtectedRoute requiredRole="punter"><ManageSlips /></ProtectedRoute>} />
            <Route path="/punter/analytics" element={<ProtectedRoute requiredRole="punter"><PunditAnalytics /></ProtectedRoute>} />
            <Route path="/punter/sales" element={<ProtectedRoute requiredRole="punter"><PunditSales /></ProtectedRoute>} />
            <Route path="/punter/withdrawals" element={<ProtectedRoute requiredRole="punter"><PunditWithdrawals /></ProtectedRoute>} />
            <Route path="/punter/reviews" element={<ProtectedRoute requiredRole="punter"><PunditReviews /></ProtectedRoute>} />
            <Route path="/punter/followers" element={<ProtectedRoute requiredRole="punter"><PunditFollowers /></ProtectedRoute>} />
            <Route path="/punter/promotions" element={<ProtectedRoute requiredRole="punter"><PunditPromotions /></ProtectedRoute>} />
            <Route path="/punter/settings" element={<ProtectedRoute requiredRole="punter"><PunditSettings /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
