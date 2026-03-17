import AppLayout from "@/components/AppLayout";
import LeaderboardTable from "@/components/LeaderboardTable";
import { MOCK_PUNDITS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pundits = () => {
  return (
    <AppLayout>
      <h1 className="mb-6 text-2xl font-bold tracking-tight-custom text-foreground">
        Pundits
      </h1>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 mb-8">
        {MOCK_PUNDITS.map((pundit, i) => (
          <motion.div
            key={pundit.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-all cursor-pointer tap-scale"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                {pundit.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-foreground text-sm">{pundit.name}</span>
                  {pundit.verified && <Shield className="h-3.5 w-3.5 text-primary" />}
                </div>
                <span className="text-xs text-muted-foreground">{pundit.sport}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="rounded-lg bg-secondary/50 p-2 text-center">
                <p className="font-mono text-sm font-bold text-foreground">{pundit.winRate}%</p>
                <p className="text-[10px] text-muted-foreground">Win Rate</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-2 text-center">
                <p className="font-mono text-sm font-bold text-win">+{pundit.roi}%</p>
                <p className="text-[10px] text-muted-foreground">ROI</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-2 text-center">
                <p className="font-mono text-sm font-bold text-foreground">{pundit.totalSlips}</p>
                <p className="text-[10px] text-muted-foreground">Picks</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 h-8 text-xs bg-cta text-accent-foreground hover:bg-cta-hover tap-scale">
                View Profile
              </Button>
              <Button size="sm" variant="outline" className="h-8 text-xs tap-scale">
                Follow
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Pundits;
