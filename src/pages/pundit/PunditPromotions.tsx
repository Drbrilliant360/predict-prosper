import PunditLayout from "@/components/PunditLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Megaphone } from "lucide-react";

const promos = [
  { id: "PR01", name: "Weekend Special - 50% Off", type: "Discount", target: "All slips", status: "active", uses: 128, expires: "2026-03-19" },
  { id: "PR02", name: "Follow & Get Free Tip", type: "Free Teaser", target: "New followers", status: "active", uses: 342, expires: "2026-04-01" },
  { id: "PR03", name: "3-Slip Bundle Deal", type: "Bundle", target: "TSh 10,000 for 3", status: "active", uses: 45, expires: "2026-03-31" },
  { id: "PR04", name: "Monthly VIP Pass", type: "Subscription", target: "TSh 25,000/month", status: "active", uses: 89, expires: "Ongoing" },
  { id: "PR05", name: "Karibu Bonus", type: "Promo Code", target: "KARIBU50", status: "expired", uses: 200, expires: "2026-03-01" },
];

const statusStyles: Record<string, string> = {
  active: "bg-primary/15 text-primary border-primary/20",
  expired: "bg-loss/15 text-loss border-loss/20",
};

const PunditPromotions = () => {
  return (
    <PunditLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">Promotions</h1>
        <Button className="bg-cta text-accent-foreground hover:bg-cta-hover tap-scale gap-1.5">
          <Megaphone className="h-4 w-4" />
          New Promotion
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Campaign</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Target</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Uses</th>
              <th className="px-4 py-3 font-medium">Expires</th>
            </tr>
          </thead>
          <tbody>
            {promos.map((p, i) => (
              <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{p.type}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{p.target}</td>
                <td className="px-4 py-3"><span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold capitalize ${statusStyles[p.status]}`}>{p.status}</span></td>
                <td className="px-4 py-3 text-right font-mono text-sm text-foreground">{p.uses}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.expires}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </PunditLayout>
  );
};

export default PunditPromotions;
