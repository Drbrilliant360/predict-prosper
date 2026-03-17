import AppLayout from "@/components/AppLayout";
import LeaderboardTable from "@/components/LeaderboardTable";
import { Trophy } from "lucide-react";

const Leaderboard = () => {
  return (
    <AppLayout>
      <div className="mb-6 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Trophy className="h-4.5 w-4.5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Leaderboard</h1>
          <p className="text-xs text-muted-foreground">Top performing pundits ranked by ROI</p>
        </div>
      </div>
      <LeaderboardTable />
    </AppLayout>
  );
};

export default Leaderboard;
