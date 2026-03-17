import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, DollarSign, FileText, Activity } from "lucide-react";

const metrics = [
  { label: "Total Revenue", value: "€248,920", change: "+18.4% vs last month", icon: DollarSign },
  { label: "Active Users (30d)", value: "8,421", change: "+12.1% vs last month", icon: Users },
  { label: "Slips Sold (30d)", value: "4,892", change: "+22.3% vs last month", icon: FileText },
  { label: "Avg Revenue/User", value: "€29.56", change: "+5.8% vs last month", icon: Activity },
];

const topPundits = [
  { name: "Alpha Picks", revenue: "€18,420", slipsSold: 1240, winRate: 72 },
  { name: "Goal Machine", revenue: "€14,100", slipsSold: 980, winRate: 70 },
  { name: "Court Vision", revenue: "€9,850", slipsSold: 642, winRate: 68 },
  { name: "Ace Serve", revenue: "€5,320", slipsSold: 385, winRate: 65 },
];

const monthlyRevenue = [
  { month: "Oct", value: 32400 },
  { month: "Nov", value: 38200 },
  { month: "Dec", value: 41800 },
  { month: "Jan", value: 35600 },
  { month: "Feb", value: 44100 },
  { month: "Mar", value: 48230 },
];

const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));

const AdminReports = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">Reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">Platform analytics and business intelligence.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mb-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <m.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">{m.label}</span>
            </div>
            <p className="font-mono text-xl font-bold tracking-tight-custom text-foreground">{m.value}</p>
            <p className="mt-1 text-[11px] font-medium text-primary">{m.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold tracking-tight-custom text-foreground">Monthly Revenue</h2>
          </div>
          <div className="p-4">
            <div className="flex items-end gap-2 h-40">
              {monthlyRevenue.map((m, i) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="font-mono text-[10px] text-muted-foreground">€{(m.value / 1000).toFixed(1)}k</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.value / maxRevenue) * 100}%` }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                    className="w-full rounded-t-md bg-primary min-h-[4px]"
                  />
                  <span className="text-[10px] text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold tracking-tight-custom text-foreground">Top Earning Pundits</h2>
          </div>
          <div className="divide-y divide-border/50">
            {topPundits.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground w-4">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.slipsSold} slips · {p.winRate}% win rate</p>
                  </div>
                </div>
                <span className="font-mono text-sm font-semibold text-win">{p.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
