import PunditLayout from "@/components/PunditLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Check, X, Edit, Trash2 } from "lucide-react";

const slips = [
  { id: "S001", match: "Simba SC vs Young Africans", league: "NBC Premier League", odds: 2.5, price: "TSh 5,000", status: "published", buyers: 42, market: "Match Result", posted: "2h ago" },
  { id: "S002", match: "Azam FC vs Namungo FC", league: "NBC Premier League", odds: 1.85, price: "TSh 3,000", status: "settled", buyers: 89, market: "Over 2.5", result: "won", posted: "1d ago" },
  { id: "S003", match: "Arsenal vs Chelsea", league: "Premier League", odds: 1.72, price: "TSh 5,000", status: "published", buyers: 67, market: "BTTS", posted: "3h ago" },
  { id: "S004", match: "Coastal Union vs KMC FC", league: "NBC Premier League", odds: 2.15, price: "TSh 4,000", status: "draft", buyers: 0, market: "Home Win", posted: "—" },
  { id: "S005", match: "Djokovic vs Alcaraz", league: "ATP Masters", odds: 2.3, price: "TSh 3,500", status: "settled", buyers: 24, market: "Match Winner", result: "lost", posted: "2d ago" },
  { id: "S006", match: "Lakers vs Celtics", league: "NBA", odds: 1.95, price: "TSh 3,500", status: "expired", buyers: 31, market: "Spread -4.5", posted: "3d ago" },
];

const statusStyles: Record<string, string> = {
  published: "bg-primary/15 text-primary border-primary/20",
  settled: "bg-cta/15 text-cta border-cta/20",
  draft: "bg-muted text-muted-foreground border-border",
  expired: "bg-loss/15 text-loss border-loss/20",
};

const ManageSlips = () => {
  return (
    <PunditLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">Manage Slips</h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 tap-scale" asChild>
          <a href="/punter/create-slip">+ New Slip</a>
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Match</th>
              <th className="px-4 py-3 font-medium">Market</th>
              <th className="px-4 py-3 font-medium text-right">Odds</th>
              <th className="px-4 py-3 font-medium text-right">Price</th>
              <th className="px-4 py-3 font-medium text-right">Buyers</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slips.map((slip, i) => (
              <motion.tr
                key={slip.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{slip.match}</p>
                  <p className="text-xs text-muted-foreground">{slip.league}</p>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{slip.market}</td>
                <td className="px-4 py-3 text-right font-mono text-sm text-foreground">{slip.odds}</td>
                <td className="px-4 py-3 text-right font-mono text-sm text-foreground">{slip.price}</td>
                <td className="px-4 py-3 text-right font-mono text-sm text-muted-foreground">{slip.buyers}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold capitalize ${statusStyles[slip.status]}`}>
                    {slip.status}
                    {slip.result && ` (${slip.result})`}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {(slip.status === "draft" || slip.status === "published") && (
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    )}
                    {slip.status === "draft" && (
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Trash2 className="h-3.5 w-3.5 text-loss" />
                      </Button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </PunditLayout>
  );
};

export default ManageSlips;
