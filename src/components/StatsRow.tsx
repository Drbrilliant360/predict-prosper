import { motion } from "framer-motion";
import { TrendingUp, FileText, Users, DollarSign, ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Active Slips", value: "12", icon: FileText, change: "+3 today", iconBg: "bg-blue-500/10", iconColor: "text-blue-500" },
  { label: "Win Rate", value: "68%", icon: TrendingUp, change: "+2.1% this week", iconBg: "bg-green-500/10", iconColor: "text-green-500" },
  { label: "Following", value: "8", icon: Users, change: "2 new slips", iconBg: "bg-purple-500/10", iconColor: "text-purple-500" },
  { label: "Total Spent", value: "TSh 782K", icon: DollarSign, change: "TSh 103K this week", iconBg: "bg-orange-500/10", iconColor: "text-orange-500" },
];

const StatsRow = () => {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.35 }}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.iconBg}`}>
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <p className="font-mono text-xl font-bold tracking-tight text-foreground">
            {stat.value}
          </p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
            <span className="text-[11px] text-primary font-medium">{stat.change}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsRow;
