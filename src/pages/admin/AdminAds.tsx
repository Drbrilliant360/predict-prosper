import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Megaphone, MoreHorizontal } from "lucide-react";

const campaigns = [
  { id: "AD001", name: "Welcome Bonus 20%", type: "Promo Code", code: "WELCOME20", status: "active", uses: 342, maxUses: 1000, expires: "2026-04-01" },
  { id: "AD002", name: "Top Banner - Bet365", type: "Ad Banner", code: "—", status: "active", uses: 12480, maxUses: null, expires: "2026-03-31" },
  { id: "AD003", name: "Refer a Friend €5", type: "Referral", code: "REF5", status: "active", uses: 89, maxUses: 500, expires: "2026-06-01" },
  { id: "AD004", name: "Black Friday Deal", type: "Promo Code", code: "BF2025", status: "expired", uses: 1200, maxUses: 1200, expires: "2025-12-01" },
  { id: "AD005", name: "Sidebar Ad - 1xBet", type: "Ad Banner", code: "—", status: "paused", uses: 8920, maxUses: null, expires: "2026-04-15" },
];

const statusStyles: Record<string, string> = {
  active: "bg-primary/15 text-primary border-primary/20",
  expired: "bg-loss/15 text-loss border-loss/20",
  paused: "bg-pending/15 text-pending border-pending/20",
};

const AdminAds = () => {
  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">Ads & Promotions</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage campaigns, promo codes, and ad placements.</p>
        </div>
        <Button className="bg-cta text-accent-foreground hover:bg-cta-hover tap-scale gap-1.5">
          <Megaphone className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Campaign</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Code</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Uses</th>
              <th className="px-4 py-3 font-medium">Expires</th>
              <th className="px-4 py-3 font-medium text-right"></th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{c.type}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.code}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold capitalize ${statusStyles[c.status]}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-sm text-foreground">
                  {c.uses.toLocaleString()}{c.maxUses ? `/${c.maxUses.toLocaleString()}` : ""}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.expires}</td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminAds;
