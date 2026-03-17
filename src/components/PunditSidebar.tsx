import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  User,
  FilePlus,
  FileText,
  BarChart3,
  DollarSign,
  Banknote,
  Star,
  Users,
  Megaphone,
  TrendingUp,
  ArrowLeft,
  Settings,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/pundit" },
  { icon: User, label: "Profile", path: "/pundit/profile" },
  { icon: FilePlus, label: "Create Slip", path: "/pundit/create-slip" },
  { icon: FileText, label: "Manage Slips", path: "/pundit/slips" },
  { icon: BarChart3, label: "Analytics", path: "/pundit/analytics" },
  { icon: DollarSign, label: "Sales & Revenue", path: "/pundit/sales" },
  { icon: Banknote, label: "Withdrawals", path: "/pundit/withdrawals" },
  { icon: Star, label: "Reviews", path: "/pundit/reviews" },
  { icon: Users, label: "Followers", path: "/pundit/followers" },
  { icon: Megaphone, label: "Promotions", path: "/pundit/promotions" },
  { icon: Settings, label: "Settings", path: "/pundit/settings" },
];

const PunditSidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
  const location = useLocation();

  return (
    <>
      <div className="mb-2 flex items-center gap-2.5 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <TrendingUp className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold tracking-tight-custom text-foreground">
          KANJI
        </span>
      </div>
      <Link
        to="/"
        onClick={onNavigate}
        className="mx-5 mb-5 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
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
                  layoutId="pundit-sidebar-active"
                  className="absolute inset-0 rounded-lg bg-sidebar-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <item.icon
                className={`relative z-10 h-[18px] w-[18px] ${
                  isActive ? "text-primary" : "text-sidebar-foreground"
                }`}
              />
              <span
                className={`relative z-10 ${
                  isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"
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

export { PunditSidebarContent };
export default PunditSidebarContent;
