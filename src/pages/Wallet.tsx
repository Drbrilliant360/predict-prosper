import AppLayout from "@/components/AppLayout";
import WalletCard from "@/components/WalletCard";
import SlipCard from "@/components/SlipCard";
import { MOCK_SLIPS } from "@/lib/mock-data";
import { Wallet, ShoppingBag } from "lucide-react";

const WalletPage = () => {
  const purchased = MOCK_SLIPS.filter((s) => !s.locked);

  return (
    <AppLayout>
      <div className="mb-6 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Wallet className="h-4.5 w-4.5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Wallet</h1>
          <p className="text-xs text-muted-foreground">Manage your balance and transactions</p>
        </div>
      </div>
      <div className="max-w-sm mb-8">
        <WalletCard />
      </div>
      <div className="mb-3 flex items-center gap-2">
        <ShoppingBag className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          Purchased Slips
        </h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {purchased.map((slip, i) => (
          <SlipCard key={slip.id} slip={slip} index={i} />
        ))}
      </div>
    </AppLayout>
  );
};

export default WalletPage;
