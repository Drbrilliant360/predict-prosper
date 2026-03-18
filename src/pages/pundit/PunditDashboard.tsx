import PunditLayout from "@/components/PunditLayout";
import { motion } from "framer-motion";
import { TrendingUp, FileText, DollarSign, Users, Star, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Slips", value: "482", icon: FileText, change: "+12 this week" },
  { label: "Win Rate", value: "72%", icon: TrendingUp, change: "+1.4% this month" },
  { label: "Total Earnings", value: "TSh 42.4M", icon: DollarSign, change: "TSh 3.2M this week" },
  { label: "Followers", value: "3,420", icon: Users, change: "+86 this week" },
];

const recentSales = [
  { name: "Juma Mwalimu", slip: "Simba vs Yanga", amount: "TSh 5,000", time: "3 hrs ago" },
  { name: "Amina Hassan", slip: "Azam vs Namungo", amount: "TSh 3,000", time: "1 hr ago" },
  { name: "Neema Kimaro", slip: "Arsenal vs Chelsea", amount: "TSh 5,000", time: "1 hr ago" },
  { name: "Baraka Shao", slip: "Simba vs Yanga", amount: "TSh 5,000", time: "1 hr ago" },
  { name: "Lilian Moshi", slip: "Coastal vs KMC", amount: "TSh 4,000", time: "2 hrs ago" },
  { name: "Rashid Mfaume", slip: "Simba vs Yanga", amount: "TSh 5,000", time: "3 hrs ago" },
];

const PunditDashboard = () => {
  return (
    <PunditLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-xl bg-gradient-to-r from-primary/20 to-cta/20 border border-primary/20 p-5"
      >
        <h1 className="text-xl font-bold tracking-tight-custom text-foreground">
          Welcome back, Bongo Tips! 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your picks are on fire — 72% win rate this month. Keep it up!
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
            </div>
            <p className="font-mono text-xl font-bold tracking-tight-custom text-foreground">{stat.value}</p>
            <p className="mt-1 text-[11px] font-medium text-primary">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight-custom text-foreground">Recent Sales</h2>
            <Link to="/punter/sales" className="text-xs text-muted-foreground hover:text-foreground">Show more</Link>
          </div>
          <div className="divide-y divide-border/50">
            {recentSales.map((sale, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                    {sale.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{sale.name}</p>
                    <p className="text-xs text-muted-foreground">{sale.slip}, {sale.time}</p>
                  </div>
                </div>
                <span className="font-mono text-sm font-semibold text-primary">{sale.amount}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <p className="text-xs text-muted-foreground mb-1">Current Follower Count</p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-3xl font-bold text-foreground">3.4k</span>
              <ArrowUpRight className="h-5 w-5 text-primary" />
            </div>
          </motion.div>

          <Link to="/punter/create-slip">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex h-32 items-center justify-center rounded-xl bg-cta hover:bg-cta-hover transition-colors cursor-pointer tap-scale"
            >
              <span className="text-2xl font-bold text-accent-foreground tracking-tight-custom">
                Create New Slip
              </span>
            </motion.div>
          </Link>
        </div>
      </div>
    </PunditLayout>
  );
};

export default PunditDashboard;
