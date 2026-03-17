import { motion } from "framer-motion";
import { Lock, Clock, CheckCircle2, XCircle, AlertCircle, Eye, ShieldCheck, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SlipData {
  id: string;
  match_name: string;
  league: string;
  market: string;
  bookmaker: string;
  odds: number;
  price: number;
  confidence: "low" | "medium" | "high";
  risk: "low" | "medium" | "high";
  status: "pending" | "won" | "lost" | "void" | "expired";
  prediction?: string | null;
  pundit_name?: string;
  purchased?: boolean;
}

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "text-pending" },
  won: { label: "Won", icon: CheckCircle2, className: "text-win" },
  lost: { label: "Lost", icon: XCircle, className: "text-loss" },
  void: { label: "Void", icon: AlertCircle, className: "text-void" },
  expired: { label: "Expired", icon: Clock, className: "text-muted-foreground" },
};

const confidenceColors = {
  low: "bg-loss/20 text-loss",
  medium: "bg-pending/20 text-pending",
  high: "bg-win/20 text-win",
};

const confidenceIcons = {
  low: AlertCircle,
  medium: ShieldCheck,
  high: ShieldCheck,
};

const SlipCard = ({ slip, index = 0 }: { slip: SlipData; index?: number }) => {
  const status = statusConfig[slip.status];
  const StatusIcon = status.icon;
  const ConfIcon = confidenceIcons[slip.confidence];
  const isLocked = !slip.purchased;

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
            className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${confidenceColors[slip.confidence]}`}
          >
            <ConfIcon className="h-2.5 w-2.5" />
            {slip.confidence.toUpperCase()}
          </span>
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${status.className}`}>
          <StatusIcon className="h-3.5 w-3.5" />
          {status.label}
        </div>
      </div>

      <h3 className="mb-1 text-sm font-semibold text-foreground tracking-tight">
        {slip.match_name}
      </h3>
      <p className="mb-3 text-xs text-muted-foreground">
        {slip.market} · {slip.bookmaker}
      </p>

      {isLocked ? (
        <div className="relative mb-3 overflow-hidden rounded-lg bg-muted/30 p-3">
          <div className="absolute inset-0 backdrop-blur-md" />
          <div className="relative z-10 flex flex-col items-center gap-1 py-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Prediction locked</span>
          </div>
        </div>
      ) : slip.prediction ? (
        <div className="mb-3 rounded-lg bg-primary/5 border border-primary/10 p-3">
          <p className="text-sm text-foreground">{slip.prediction}</p>
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-foreground">
            @{slip.odds}
          </span>
          {slip.pundit_name && (
            <span className="text-xs text-muted-foreground">
              by {slip.pundit_name}
            </span>
          )}
        </div>
        {isLocked ? (
          <Button
            size="sm"
            className="h-8 gap-1.5 bg-cta text-accent-foreground hover:bg-cta-hover font-semibold text-xs tap-scale"
          >
            <Unlock className="h-3 w-3" />
            TSh {slip.price.toLocaleString()}
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1.5 text-xs"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default SlipCard;
