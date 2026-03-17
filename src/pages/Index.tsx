import AppLayout from "@/components/AppLayout";
import WalletCard from "@/components/WalletCard";
import FavoritePundits from "@/components/FavoritePundits";
import { MOCK_SLIPS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Clock, Check, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "text-pending" },
  won: { label: "Won", icon: Check, className: "text-win" },
  lost: { label: "Lost", icon: X, className: "text-loss" },
  void: { label: "Void", icon: AlertCircle, className: "text-void" },
  expired: { label: "Expired", icon: Clock, className: "text-muted-foreground" },
};

const Index = () => {
  return (
    <AppLayout>
      <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
        <div className="space-y-6">
          <WalletCard />

          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              Purchased Slips
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {MOCK_SLIPS.map((slip, i) => {
                const status = statusConfig[slip.status];
                const StatusIcon = status.icon;
                return (
                  <motion.div
                    key={slip.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="rounded-xl border border-primary/30 bg-card p-4 tap-scale"
                  >
                    <p className="text-xs text-muted-foreground mb-1">{slip.league}:</p>
                    <p className="text-sm font-semibold text-foreground mb-3">{slip.match}</p>

                    <div className="space-y-1 text-sm text-muted-foreground mb-3">
                      <p>Pundit: <span className="text-foreground">@{slip.punditName.replace(/\s/g, '')}</span></p>
                      <p>Odds: <span className="font-mono text-foreground">{slip.odds}</span></p>
                      <p>Stake: <span className="font-mono text-foreground">€{slip.price}</span></p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-1 text-xs font-medium ${status.className}`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </div>
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-cta text-accent-foreground hover:bg-cta-hover tap-scale"
                      >
                        View
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <FavoritePundits />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
