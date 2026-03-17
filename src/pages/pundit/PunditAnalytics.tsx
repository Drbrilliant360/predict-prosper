import PunditLayout from "@/components/PunditLayout";
import { motion } from "framer-motion";
import { TrendingUp, Target, BarChart3 } from "lucide-react";

const monthlyData = [
  { month: "Oct", wins: 28, losses: 12 },
  { month: "Nov", wins: 34, losses: 10 },
  { month: "Dec", wins: 30, losses: 14 },
  { month: "Jan", wins: 26, losses: 11 },
  { month: "Feb", wins: 38, losses: 9 },
  { month: "Mar", wins: 32, losses: 8 },
];

const maxPicks = Math.max(...monthlyData.map((m) => m.wins + m.losses));

const PunditAnalytics = () => {
  return (
    <PunditLayout>
      <h1 className="mb-6 text-2xl font-bold tracking-tight-custom text-foreground">Analytics</h1>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mb-8">
        {[
          { label: "Total Picks", value: "482", change: "+12 this week" },
          { label: "Win Rate (30d)", value: "76%", change: "+4% vs prev" },
          { label: "ROI (30d)", value: "+18.3%", change: "+2.1% vs prev" },
          { label: "Avg Odds", value: "1.92", change: "stable" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <p className="text-xs font-medium text-muted-foreground mb-1">{stat.label}</p>
            <p className="font-mono text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-[11px] text-primary mt-0.5">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-card"
        >
          <div className="border-b border-border px-4 py-3 flex items-center gap-4">
            <h2 className="text-sm font-semibold tracking-tight-custom text-foreground">Win/Loss Chart</h2>
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-primary" /><span className="text-[10px] text-muted-foreground">Win</span></div>
              <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-loss" /><span className="text-[10px] text-muted-foreground">Loss</span></div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-end gap-3 h-40">
              {monthlyData.map((m, i) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col gap-0.5" style={{ height: `${((m.wins + m.losses) / maxPicks) * 100}%` }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(m.wins / (m.wins + m.losses)) * 100}%` }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                      className="w-full rounded-t-sm bg-primary"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(m.losses / (m.wins + m.losses)) * 100}%` }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                      className="w-full rounded-b-sm bg-loss"
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-border bg-card"
        >
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold tracking-tight-custom text-foreground">Performance by Market</h2>
          </div>
          <div className="divide-y divide-border/50">
            {[
              { market: "Match Result", picks: 180, winRate: 74 },
              { market: "Over/Under", picks: 140, winRate: 71 },
              { market: "BTTS", picks: 82, winRate: 68 },
              { market: "Asian Handicap", picks: 48, winRate: 65 },
              { market: "Correct Score", picks: 32, winRate: 53 },
            ].map((row) => (
              <div key={row.market} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{row.market}</p>
                  <p className="text-xs text-muted-foreground">{row.picks} picks</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${row.winRate}%` }} />
                  </div>
                  <span className="font-mono text-sm font-medium text-foreground w-10 text-right">{row.winRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PunditLayout>
  );
};

export default PunditAnalytics;
