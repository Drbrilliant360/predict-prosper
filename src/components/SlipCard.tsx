import { motion } from "framer-motion";
import type { Slip } from "@/lib/mock-data";
import { Lock, Clock, Check, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "text-pending" },
  won: { label: "Won", icon: Check, className: "text-win" },
  lost: { label: "Lost", icon: X, className: "text-loss" },
  void: { label: "Void", icon: AlertCircle, className: "text-void" },
  expired: { label: "Expired", icon: Clock, className: "text-muted-foreground" },
};

const confidenceColors = {
  low: "bg-loss/20 text-loss",
  medium: "bg-pending/20 text-pending",
  high: "bg-win/20 text-win",
};

const SlipCard = ({ slip, index = 0 }: { slip: Slip; index?: number }) => {
  const status = statusConfig[slip.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 tap-scale"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {slip.league}
          </span>
          <span
            className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
              confidenceColors[slip.confidence]
            }`}
          >
            {slip.confidence.toUpperCase()}
          </span>
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${status.className}`}>
          <StatusIcon className="h-3 w-3" />
          {status.label}
        </div>
      </div>

      <h3 className="mb-1 text-sm font-semibold text-foreground tracking-tight-custom">
        {slip.match}
      </h3>
      <p className="mb-3 text-xs text-muted-foreground">
        {slip.market} · {slip.bookmaker}
      </p>

      {slip.locked ? (
        <div className="relative mb-3 overflow-hidden rounded-lg bg-muted/30 p-3">
          <div className="absolute inset-0 backdrop-blur-md" />
          <div className="relative z-10 flex flex-col items-center gap-1 py-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Prediction locked</span>
          </div>
        </div>
      ) : (
        <div className="mb-3 rounded-lg bg-primary/5 border border-primary/10 p-3">
          <p className="text-sm text-foreground">{slip.prediction}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-foreground">
            @{slip.odds}
          </span>
          <span className="text-xs text-muted-foreground">
            by {slip.punditName}
          </span>
        </div>
        {slip.locked ? (
          <Button
            size="sm"
            className="h-8 bg-cta text-accent-foreground hover:bg-cta-hover font-semibold text-xs tap-scale"
          >
            Unlock €{slip.price}
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs"
          >
            View
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default SlipCard;
