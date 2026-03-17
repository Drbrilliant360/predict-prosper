import PunditLayout from "@/components/PunditLayout";
import { motion } from "framer-motion";
import { Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const PunditProfile = () => {
  return (
    <PunditLayout>
      <h1 className="mb-6 text-2xl font-bold tracking-tight-custom text-foreground">Profile & Performance</h1>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex flex-col items-center text-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-xl font-bold text-primary mb-3">
              BT
            </div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-bold text-foreground">Bongo Tips</h2>
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Football · NBC Premier League & EPL</p>
          </div>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            NBC Premier League na EPL specialist. Miaka 5 ya utabiri sahihi.
          </p>
          <Button variant="outline" className="w-full tap-scale">Edit Profile</Button>
        </motion.div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { label: "Win Rate", value: "72%", sub: "347 wins" },
              { label: "ROI", value: "+14.2%", sub: "482 picks" },
              { label: "Avg Odds", value: "1.92", sub: "all markets" },
              { label: "Strike Rate", value: "68%", sub: "last 30 days" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-border bg-card p-4 text-center"
              >
                <p className="font-mono text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-[11px] text-primary mt-0.5">{stat.sub}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card"
          >
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold tracking-tight-custom text-foreground">Performance by Sport</h2>
            </div>
            <div className="divide-y divide-border/50">
              {[
                { sport: "Football (NBC PL)", picks: 280, winRate: 74, roi: 16.1 },
                { sport: "Football (EPL)", picks: 142, winRate: 69, roi: 11.8 },
                { sport: "Football (La Liga)", picks: 60, winRate: 70, roi: 13.2 },
              ].map((row) => (
                <div key={row.sport} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{row.sport}</p>
                    <p className="text-xs text-muted-foreground">{row.picks} picks</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-foreground">{row.winRate}%</span>
                    <span className="font-mono text-sm font-medium text-win">+{row.roi}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl border border-border bg-card"
          >
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold tracking-tight-custom text-foreground">Recent Results (Transparency Ledger)</h2>
            </div>
            <div className="divide-y divide-border/50">
              {[
                { match: "Simba vs Yanga", prediction: "Home Win", odds: 2.5, result: "won" },
                { match: "Azam vs Namungo", prediction: "Over 2.5", odds: 1.85, result: "won" },
                { match: "Arsenal vs Chelsea", prediction: "BTTS", odds: 1.72, result: "pending" },
                { match: "Man City vs Liverpool", prediction: "Over 2.5", odds: 1.85, result: "won" },
                { match: "Coastal vs KMC", prediction: "Home Win", odds: 2.15, result: "lost" },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.match}</p>
                    <p className="text-xs text-muted-foreground">{r.prediction} @{r.odds}</p>
                  </div>
                  <span className={`text-xs font-semibold capitalize ${
                    r.result === "won" ? "text-win" : r.result === "lost" ? "text-loss" : "text-pending"
                  }`}>
                    {r.result}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PunditLayout>
  );
};

export default PunditProfile;
