import AppLayout from "@/components/AppLayout";
import SlipCard from "@/components/SlipCard";
import { MOCK_SLIPS } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Zap, CheckCircle2, Layers } from "lucide-react";

const MySlips = () => {
  const purchased = MOCK_SLIPS.filter((s) => !s.locked);
  const active = MOCK_SLIPS.filter((s) => s.status === "pending");

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
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4 bg-secondary">
          <TabsTrigger value="active" className="gap-1.5">
            <Zap className="h-3.5 w-3.5" />
            Active ({active.length})
          </TabsTrigger>
          <TabsTrigger value="purchased" className="gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Purchased ({purchased.length})
          </TabsTrigger>
          <TabsTrigger value="all" className="gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            All ({MOCK_SLIPS.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {active.map((slip, i) => (
              <SlipCard key={slip.id} slip={slip} index={i} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="purchased">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {purchased.map((slip, i) => (
              <SlipCard key={slip.id} slip={slip} index={i} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="all">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {MOCK_SLIPS.map((slip, i) => (
              <SlipCard key={slip.id} slip={slip} index={i} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default MySlips;
