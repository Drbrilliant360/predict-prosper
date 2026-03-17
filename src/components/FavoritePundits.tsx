import { motion } from "framer-motion";
import { Shield, Star, Heart } from "lucide-react";
import { usePunditProfiles } from "@/hooks/use-supabase-data";
import { Skeleton } from "@/components/ui/skeleton";

const FavoritePundits = () => {
  const { data: pundits, isLoading } = usePunditProfiles();

  const topPundits = (pundits ?? []).slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl border border-border bg-card"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Heart className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          Top Pundits
        </h2>
      </div>
      <div className="divide-y divide-border/50">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-5 w-12 rounded-md" />
            </div>
          ))
        ) : topPundits.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">No pundits yet</p>
        ) : (
          topPundits.map((pundit) => {
            const profile = pundit.profiles as any;
            const name = profile?.display_name ?? "Unknown";
            return (
              <div
                key={pundit.id}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/30 cursor-pointer tap-scale"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-foreground truncate">
                      {name}
                    </span>
                    {pundit.verified && (
                      <Shield className="h-3 w-3 flex-shrink-0 text-primary" />
                    )}
                  </div>
                  <span className="text-[11px] text-muted-foreground">{pundit.sport}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span className="rounded-md bg-win/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-win">
                    {pundit.win_rate ?? 0}%
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default FavoritePundits;
