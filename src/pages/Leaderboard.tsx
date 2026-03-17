import AppLayout from "@/components/AppLayout";
import LeaderboardTable from "@/components/LeaderboardTable";

const Leaderboard = () => {
  return (
    <AppLayout>
      <h1 className="mb-6 text-2xl font-bold tracking-tight-custom text-foreground">
        Leaderboard
      </h1>
      <LeaderboardTable />
    </AppLayout>
  );
};

export default Leaderboard;
