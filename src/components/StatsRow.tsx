import { motion } from "framer-motion";
import { TrendingUp, FileText, Users, DollarSign } from "lucide-react";

const stats = [
  { label: "Active Slips", value: "12", icon: FileText, change: "+3 today" },
  { label: "Win Rate", value: "68%", icon: TrendingUp, change: "+2.1% this week" },
  { label: "Following", value: "8", icon: Users, change: "2 new slips" },
  { label: "Total Spent", value: "€340", icon: DollarSign, change: "€45 this week" },
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
          <div className="mb-2 flex items-center gap-2">
            <stat.icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              {stat.label}
            </span>
          </div>
          <p className="font-mono text-xl font-bold tracking-tight-custom text-foreground">
            {stat.value}
          </p>
          <p className="mt-1 text-[11px] text-primary font-medium">{stat.change}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsRow;
