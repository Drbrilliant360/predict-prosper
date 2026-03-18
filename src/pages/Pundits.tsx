import AppLayout from "@/components/AppLayout";
import { usePunditProfiles } from "@/hooks/use-supabase-data";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Target, BarChart3, UserPlus, Eye, Users2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Punters = () => {
  const { data: punters, isLoading } = usePunditProfiles();

  return (
    <AppLayout>
      <div className="mb-6 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Users2 className="h-4.5 w-4.5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Punters</h1>
          <p className="text-xs text-muted-foreground">Browse top prediction experts</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-xl" />
          ))}
        </div>
      ) : (punters ?? []).length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">
          No punters available yet. Check back soon!
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 mb-8">
          {(punters ?? []).map((punter, i) => {
            const profile = pundit.profiles as any;
            const name = profile?.display_name ?? "Unknown";
            return (
              <motion.div
                key={punter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-all cursor-pointer tap-scale"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-foreground text-sm">{name}</span>
                      {punter.verified && <Shield className="h-3.5 w-3.5 text-primary" />}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Sparkles className="h-3 w-3" />
                      {punter.sport}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="rounded-lg bg-secondary/50 p-2 text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Target className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <p className="font-mono text-sm font-bold text-foreground">{punter.win_rate ?? 0}%</p>
                    <p className="text-[10px] text-muted-foreground">Win Rate</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-2 text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <TrendingUp className="h-3 w-3 text-win" />
                    </div>
                    <p className="font-mono text-sm font-bold text-win">+{punter.roi ?? 0}%</p>
                    <p className="text-[10px] text-muted-foreground">ROI</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-2 text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <BarChart3 className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <p className="font-mono text-sm font-bold text-foreground">{punter.total_slips ?? 0}</p>
                    <p className="text-[10px] text-muted-foreground">Picks</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 h-8 gap-1.5 text-xs bg-cta text-accent-foreground hover:bg-cta-hover tap-scale">
                    <Eye className="h-3 w-3" />
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs tap-scale">
                    <UserPlus className="h-3 w-3" />
                    Follow
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
};

export default Pundits;
