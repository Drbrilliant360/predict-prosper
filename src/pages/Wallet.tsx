import AppLayout from "@/components/AppLayout";
import WalletCard from "@/components/WalletCard";
import SlipCard from "@/components/SlipCard";
import { MOCK_SLIPS } from "@/lib/mock-data";

const WalletPage = () => {
  const purchased = MOCK_SLIPS.filter((s) => !s.locked);

  return (
    <AppLayout>
      <h1 className="mb-6 text-2xl font-bold tracking-tight-custom text-foreground">
        Wallet
      </h1>
      <div className="max-w-sm mb-8">
        <WalletCard />
      </div>
      <h2 className="mb-3 text-sm font-semibold tracking-tight-custom text-foreground">
        Purchased Slips
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {purchased.map((slip, i) => (
          <SlipCard key={slip.id} slip={slip} index={i} />
        ))}
      </div>
    </AppLayout>
  );
};

export default WalletPage;
