import { motion } from "framer-motion";
import { Shield, ChevronRight, Crown, Medal, Award, Trophy } from "lucide-react";
import { usePunditProfiles } from "@/hooks/use-supabase-data";
import { Skeleton } from "@/components/ui/skeleton";

const rankIcons = [
  { icon: Crown, color: "text-yellow-500" },
  { icon: Medal, color: "text-gray-400" },
  { icon: Award, color: "text-amber-600" },
];

const LeaderboardTable = () => {
  const { data: pundits, isLoading } = usePunditProfiles();

  const sorted = [...(pundits ?? [])].sort((a, b) => (b.roi ?? 0) - (a.roi ?? 0));

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Top ROI Leaderboard
          </h2>
        </div>
      </div>
      {isLoading ? (
        <div className="p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-muted-foreground">No pundits on the leaderboard yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-4 py-2.5 font-medium">#</th>
                <th className="px-4 py-2.5 font-medium">Pundit</th>
                <th className="px-4 py-2.5 font-medium text-right">Win%</th>
                <th className="px-4 py-2.5 font-medium text-right">ROI</th>
                <th className="px-4 py-2.5 font-medium text-right">Picks</th>
                <th className="px-4 py-2.5 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((pundit, i) => {
                const RankIcon = rankIcons[i]?.icon;
                const rankColor = rankIcons[i]?.color;
                const profile = pundit.profiles as any;
                const name = profile?.display_name ?? "Unknown";
                return (
                  <motion.tr
                    key={pundit.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="border-b border-border/50 last:border-0 hover:bg-secondary/40 transition-colors cursor-pointer tap-scale"
                  >
                    <td className="px-4 py-3">
                      {RankIcon ? (
                        <RankIcon className={`h-4 w-4 ${rankColor}`} />
                      ) : (
                        <span className="font-mono text-xs text-muted-foreground">{i + 1}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-foreground">{name}</span>
                            {pundit.verified && (
                              <Shield className="h-3.5 w-3.5 text-primary" />
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{pundit.sport}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-foreground">
                      {pundit.win_rate ?? 0}%
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-sm font-medium text-win">
                      +{pundit.roi ?? 0}%
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-muted-foreground">
                      {pundit.total_slips ?? 0}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;
