import AppLayout from "@/components/AppLayout";
import WalletCard from "@/components/WalletCard";
import SlipCard from "@/components/SlipCard";
import type { SlipData } from "@/components/SlipCard";
import { useMyPurchases } from "@/hooks/use-supabase-data";
import { Wallet, ShoppingBag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const WalletPage = () => {
  const { data: purchases, isLoading } = useMyPurchases();

  const purchasedSlips: SlipData[] = (purchases ?? []).map((p: any) => ({
    ...p.slips,
    pundit_name: p.slips?.profiles?.display_name ?? "Unknown",
    purchased: true,
  }));

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
      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : purchasedSlips.length === 0 ? (
        <p className="text-sm text-muted-foreground py-6 text-center">No purchased slips yet</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {purchasedSlips.map((slip, i) => (
            <SlipCard key={slip.id} slip={slip} index={i} />
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default WalletPage;
