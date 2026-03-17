import AppLayout from "@/components/AppLayout";
import WalletCard from "@/components/WalletCard";
import FavoritePundits from "@/components/FavoritePundits";
import { MOCK_SLIPS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, XCircle, AlertCircle, ShoppingBag, Eye, Flame, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "text-pending" },
  won: { label: "Won", icon: CheckCircle2, className: "text-win" },
  lost: { label: "Lost", icon: XCircle, className: "text-loss" },
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
            <div className="mb-4 flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Purchased Slips
              </h2>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                {MOCK_SLIPS.length}
              </span>
            </div>
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
                    <div className="flex items-center gap-1.5 mb-1">
                      <Zap className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{slip.league}</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground mb-3">{slip.match}</p>

                    <div className="space-y-1 text-sm text-muted-foreground mb-3">
                      <p>Pundit: <span className="text-foreground">@{slip.punditName.replace(/\s/g, '')}</span></p>
                      <p>Odds: <span className="font-mono text-foreground">{slip.odds}</span></p>
                      <p>Stake: <span className="font-mono text-foreground">TSh {slip.price.toLocaleString()}</span></p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-1 text-xs font-medium ${status.className}`}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {status.label}
                      </div>
                      <Button
                        size="sm"
                        className="h-7 gap-1 text-xs bg-cta text-accent-foreground hover:bg-cta-hover tap-scale"
                      >
                        <Eye className="h-3 w-3" />
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
