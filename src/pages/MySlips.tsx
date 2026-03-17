import AppLayout from "@/components/AppLayout";
import SlipCard from "@/components/SlipCard";
import type { SlipData } from "@/components/SlipCard";
import { useMyPurchases, useSlips } from "@/hooks/use-supabase-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Zap, CheckCircle2, Layers } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const MySlips = () => {
  const { data: purchases, isLoading } = useMyPurchases();

  const allSlips: SlipData[] = (purchases ?? []).map((p: any) => ({
    ...p.slips,
    pundit_name: p.slips?.profiles?.display_name ?? "Unknown",
    purchased: true,
  }));

  const active = allSlips.filter((s) => s.status === "pending");
  const settled = allSlips.filter((s) => s.status !== "pending");

  return (
    <AppLayout>
      <div className="mb-6 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <FileText className="h-4.5 w-4.5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">My Slips</h1>
          <p className="text-xs text-muted-foreground">Track your purchased predictions</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : allSlips.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">
          You haven't purchased any slips yet. Browse pundits to find predictions!
        </p>
      ) : (
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4 bg-secondary">
            <TabsTrigger value="active" className="gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              Active ({active.length})
            </TabsTrigger>
            <TabsTrigger value="settled" className="gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Settled ({settled.length})
            </TabsTrigger>
            <TabsTrigger value="all" className="gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              All ({allSlips.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {active.map((slip, i) => (
                <SlipCard key={slip.id} slip={slip} index={i} />
              ))}
            </div>
            {active.length === 0 && (
              <p className="text-sm text-muted-foreground py-6 text-center">No active slips</p>
            )}
          </TabsContent>
          <TabsContent value="settled">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {settled.map((slip, i) => (
                <SlipCard key={slip.id} slip={slip} index={i} />
              ))}
            </div>
            {settled.length === 0 && (
              <p className="text-sm text-muted-foreground py-6 text-center">No settled slips</p>
            )}
          </TabsContent>
          <TabsContent value="all">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {allSlips.map((slip, i) => (
                <SlipCard key={slip.id} slip={slip} index={i} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </AppLayout>
  );
};

export default MySlips;
