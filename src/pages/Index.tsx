import AppLayout from "@/components/AppLayout";
import StatsRow from "@/components/StatsRow";
import LeaderboardTable from "@/components/LeaderboardTable";
import SlipCard from "@/components/SlipCard";
import WalletCard from "@/components/WalletCard";
import FavoritePundits from "@/components/FavoritePundits";
import { MOCK_SLIPS } from "@/lib/mock-data";

const Index = () => {
  const activeSlips = MOCK_SLIPS.filter((s) => s.status === "pending");

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Verified intelligence for the disciplined bettor.
        </p>
      </div>

      <StatsRow />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <LeaderboardTable />

          <div>
            <h2 className="mb-3 text-sm font-semibold tracking-tight-custom text-foreground">
              Active Slips
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {activeSlips.map((slip, i) => (
                <SlipCard key={slip.id} slip={slip} index={i} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <WalletCard />
          <FavoritePundits />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
