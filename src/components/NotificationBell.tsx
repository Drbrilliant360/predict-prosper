import { useState, useRef, useEffect } from "react";
import { Bell, ShoppingCart, Trophy, UserPlus, AlertCircle, Gift, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Notification {
  id: string;
  icon: "purchase" | "win" | "follow" | "alert" | "promo" | "payout";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const iconMap = {
  purchase: ShoppingCart,
  win: Trophy,
  follow: UserPlus,
  alert: AlertCircle,
  promo: Gift,
  payout: CheckCircle,
};

const iconColorMap = {
  purchase: "text-primary",
  win: "text-green-500",
  follow: "text-blue-500",
  alert: "text-orange-500",
  promo: "text-purple-500",
  payout: "text-emerald-500",
};

const defaultNotifications: Notification[] = [
  { id: "1", icon: "purchase", title: "Slip Purchased", message: "You bought 'Simba vs Yanga' from Bongo Tips", time: "2 min ago", read: false },
  { id: "2", icon: "win", title: "Slip Won! 🎉", message: "Azam vs Namungo Over 2.5 settled as a WIN", time: "1 hr ago", read: false },
  { id: "3", icon: "follow", title: "New Follower", message: "Amina M. started following you", time: "3 hrs ago", read: false },
  { id: "4", icon: "payout", title: "Withdrawal Processed", message: "TSh 125,000 sent to M-Pesa •••321", time: "5 hrs ago", read: true },
  { id: "5", icon: "promo", title: "Weekend Bundle", message: "Daktari wa Odds is offering 3 slips for TSh 10,000", time: "8 hrs ago", read: true },
  { id: "6", icon: "alert", title: "Slip Expiring", message: "Arsenal vs Chelsea slip expires in 1 hour", time: "12 hrs ago", read: true },
  { id: "7", icon: "win", title: "Leaderboard Update", message: "You moved up to #14 on the weekly leaderboard", time: "1 day ago", read: true },
];

interface NotificationBellProps {
  accentClass?: string;
}

const NotificationBell = ({ accentClass = "bg-cta text-accent-foreground" }: NotificationBellProps) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(defaultNotifications);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className="relative tap-scale"
        onClick={() => setOpen(!open)}
      >
        <Bell className="h-[18px] w-[18px] text-muted-foreground hover:text-foreground transition-colors" />
        {unreadCount > 0 && (
          <span className={`absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${accentClass}`}>
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-10 z-50 w-[340px] rounded-xl border border-border bg-card shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.map((n) => {
                const Icon = iconMap[n.icon];
                const color = iconColorMap[n.icon];
                return (
                  <button
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${
                      !n.read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted ${color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm truncate ${!n.read ? "font-semibold text-foreground" : "font-medium text-foreground"}`}>
                          {n.title}
                        </p>
                        {!n.read && (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{n.message}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground/70">{n.time}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-border px-4 py-2.5">
              <button className="w-full text-center text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
