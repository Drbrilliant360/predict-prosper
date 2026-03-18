import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FileText,
  CreditCard,
  AlertTriangle,
  Banknote,
  BarChart3,
  Settings,
  Megaphone,
  ScrollText,
  ArrowLeft,
} from "lucide-react";
import kanjiLogo from "@/assets/kanji-logo.png";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: UserCheck, label: "Punters", path: "/admin/punters" },
  { icon: FileText, label: "Slips", path: "/admin/slips" },
  { icon: CreditCard, label: "Payments", path: "/admin/payments" },
  { icon: AlertTriangle, label: "Disputes", path: "/admin/disputes" },
  { icon: Banknote, label: "Payouts", path: "/admin/payouts" },
  { icon: BarChart3, label: "Reports", path: "/admin/reports" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
  { icon: Megaphone, label: "Ads / Promos", path: "/admin/ads" },
  { icon: ScrollText, label: "Audit Logs", path: "/admin/audit-logs" },
];

const AdminSidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
  const location = useLocation();

  return (
    <>
      <div className="mb-2 flex items-center gap-2.5 px-5">
        <img src={kanjiLogo} alt="Kanji" className="h-8 w-8 rounded-lg object-cover" />
        <span className="text-lg font-bold tracking-tight-custom text-foreground">
          KANJI
        </span>
      </div>
      <Link
        to="/"
        onClick={onNavigate}
        className="mx-5 mb-6 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to App
      </Link>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className="relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors tap-scale"
            >
              {isActive && (
                <motion.div
                  layoutId="admin-sidebar-active"
                  className="absolute inset-0 rounded-lg bg-sidebar-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <item.icon
                className={`relative z-10 h-[18px] w-[18px] ${
                  isActive ? "text-cta" : "text-sidebar-foreground"
                }`}
              />
              <span
                className={`relative z-10 ${
                  isActive
                    ? "text-sidebar-accent-foreground"
                    : "text-sidebar-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export { AdminSidebarContent };
export default AdminSidebarContent;
