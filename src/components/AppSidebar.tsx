import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Users,
  Wallet,
  Settings,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import kanjiLogo from "@/assets/kanji-logo.png";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FileText, label: "My Slips", path: "/slips" },
  { icon: Users, label: "Punters", path: "/punters" },
  { icon: TrendingUp, label: "Leaderboard", path: "/leaderboard" },
  { icon: Wallet, label: "Wallet", path: "/wallet" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Support", path: "/support" },
];

const AppSidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
  const location = useLocation();

  return (
    <>
      <div className="mb-8 flex items-center gap-2.5 px-5">
        <img src={kanjiLogo} alt="Kanji" className="h-8 w-8 rounded-lg object-cover" />
        <span className="text-lg font-bold tracking-tight-custom text-foreground">
          KANJI
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
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
                  layoutId="sidebar-active"
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

export { AppSidebarContent };
export default AppSidebarContent;
