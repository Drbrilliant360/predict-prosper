import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  UserCheck,
  Activity,
} from "lucide-react";

const stats = [
  { label: "Total Users", value: "12,482", icon: Users, change: "+124 this week", changeColor: "text-primary" },
  { label: "Active Pundits", value: "348", icon: UserCheck, change: "+12 pending", changeColor: "text-pending" },
  { label: "Total Slips", value: "8,921", icon: FileText, change: "342 today", changeColor: "text-primary" },
  { label: "Revenue (MTD)", value: "€48,230", icon: DollarSign, change: "+18.4%", changeColor: "text-primary" },
  { label: "Open Disputes", value: "23", icon: AlertTriangle, change: "5 urgent", changeColor: "text-pending" },
  { label: "Pending Payouts", value: "€12,450", icon: CreditCard, change: "18 requests", changeColor: "text-muted-foreground" },
  { label: "Avg Win Rate", value: "64.2%", icon: TrendingUp, change: "+1.2% vs last month", changeColor: "text-primary" },
  { label: "DAU", value: "3,842", icon: Activity, change: "+8.3%", changeColor: "text-primary" },
];

const recentActivity = [
  { time: "2 min ago", action: "New pundit registration", detail: "SharpEdge99 submitted KYC", type: "info" },
  { time: "5 min ago", action: "Dispute opened", detail: "User #4821 disputed slip #s892", type: "warning" },
  { time: "12 min ago", action: "Payout processed", detail: "€2,340 to Alpha Picks", type: "success" },
  { time: "18 min ago", action: "Slip flagged", detail: "Automated fraud check on slip #s901", type: "warning" },
  { time: "25 min ago", action: "New user signup", detail: "john.d@email.com via referral", type: "info" },
  { time: "31 min ago", action: "Commission collected", detail: "€45.00 from 3 slip purchases", type: "success" },
  { time: "45 min ago", action: "Pundit verified", detail: "Court Vision passed KYC review", type: "success" },
  { time: "1 hr ago", action: "Bulk result update", detail: "42 slips settled (Premier League)", type: "info" },
];

const typeStyles = {
  info: "bg-cta/10 text-cta",
  warning: "bg-pending/15 text-pending",
  success: "bg-primary/10 text-primary",
};

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Platform overview and system health.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
            </div>
            <p className="font-mono text-xl font-bold tracking-tight-custom text-foreground">
              {stat.value}
            </p>
            <p className={`mt-1 text-[11px] font-medium ${stat.changeColor}`}>{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold tracking-tight-custom text-foreground">
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-border/50">
            {recentActivity.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 px-4 py-3"
              >
                <span className={`mt-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${typeStyles[item.type as keyof typeof typeStyles]}`}>
                  {item.type.toUpperCase()}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
                <span className="text-[11px] text-muted-foreground whitespace-nowrap">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold tracking-tight-custom text-foreground">
              Revenue Breakdown (MTD)
            </h2>
          </div>
          <div className="p-4 space-y-4">
            {[
              { label: "Slip Purchases", amount: "€32,100", pct: 66.5 },
              { label: "Subscriptions", amount: "€9,820", pct: 20.4 },
              { label: "Daily Passes", amount: "€4,110", pct: 8.5 },
              { label: "Bundles", amount: "€2,200", pct: 4.6 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{item.label}</span>
                  <span className="font-mono text-sm font-medium text-foreground">{item.amount}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{item.pct}% of total</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
