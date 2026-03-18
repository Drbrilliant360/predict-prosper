import AppLayout from "@/components/AppLayout";
import WalletCard from "@/components/WalletCard";
import FavoritePundits from "@/components/FavoritePundits";
import SlipCard from "@/components/SlipCard";
import type { SlipData } from "@/components/SlipCard";
import { useMyPurchases, useSlips } from "@/hooks/use-supabase-data";
import { motion } from "framer-motion";
import { ShoppingBag, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: purchases, isLoading: loadingPurchases } = useMyPurchases();
  const { data: slips, isLoading: loadingSlips } = useSlips();

  const purchasedSlips: SlipData[] = (purchases ?? []).map((p: any) => ({
    ...p.slips,
    pundit_name: p.slips?.profiles?.display_name ?? "Unknown",
    purchased: true,
  }));

  const trendingSlips: SlipData[] = (slips ?? []).slice(0, 6).map((s: any) => ({
    ...s,
    pundit_name: s.profiles?.display_name ?? "Unknown",
    purchased: false,
  }));

  const displaySlips = purchasedSlips.length > 0 ? purchasedSlips : trendingSlips;
  const isLoading = loadingPurchases && loadingSlips;

  return (
    <AppLayout>
      <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
        <div className="space-y-6">
          <WalletCard />

          <div>
            <div className="mb-4 flex items-center gap-2">
              {purchasedSlips.length > 0 ? (
                <ShoppingBag className="h-4 w-4 text-primary" />
              ) : (
                <Zap className="h-4 w-4 text-primary" />
              )}
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                {purchasedSlips.length > 0 ? "Purchased Slips" : "Trending Slips"}
              </h2>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                {displaySlips.length}
              </span>
            </div>

            {isLoading ? (
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-48 rounded-xl" />
                ))}
              </div>
            ) : displaySlips.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No slips available yet. Browse punters to find predictions!
              </p>
            ) : (
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {displaySlips.map((slip, i) => (
                  <SlipCard key={slip.id} slip={slip} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:block">
          <FavoritePundits />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
