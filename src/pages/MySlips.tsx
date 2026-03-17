import AppLayout from "@/components/AppLayout";
import SlipCard from "@/components/SlipCard";
import { MOCK_SLIPS } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MySlips = () => {
  const purchased = MOCK_SLIPS.filter((s) => !s.locked);
  const active = MOCK_SLIPS.filter((s) => s.status === "pending");

  return (
    <AppLayout>
      <h1 className="mb-6 text-2xl font-bold tracking-tight-custom text-foreground">
        My Slips
      </h1>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4 bg-secondary">
          <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
          <TabsTrigger value="purchased">Purchased ({purchased.length})</TabsTrigger>
          <TabsTrigger value="all">All ({MOCK_SLIPS.length})</TabsTrigger>
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
