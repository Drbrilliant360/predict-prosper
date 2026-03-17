import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search, Clock, Check, X, AlertCircle } from "lucide-react";

const slips = [
  { id: "S001", match: "Simba SC vs Young Africans", pundit: "Bongo Tips", sport: "Football", odds: 2.5, price: "TSh 5,000", status: "pending", buyers: 42, posted: "2h ago" },
  { id: "S002", match: "Azam FC vs Namungo FC", pundit: "Bongo Tips", sport: "Football", odds: 1.85, price: "TSh 3,000", status: "won", buyers: 89, posted: "1d ago" },
  { id: "S003", match: "Lakers vs Celtics", pundit: "Kimaro Bets", sport: "Basketball", odds: 1.95, price: "TSh 3,500", status: "pending", buyers: 31, posted: "4h ago" },
  { id: "S004", match: "Arsenal vs Chelsea", pundit: "Daktari wa Odds", sport: "Football", odds: 1.72, price: "TSh 5,000", status: "pending", buyers: 67, posted: "3h ago" },
  { id: "S005", match: "Djokovic vs Alcaraz", pundit: "Msimbazi Edge", sport: "Tennis", odds: 2.3, price: "TSh 3,500", status: "lost", buyers: 24, posted: "2d ago" },
  { id: "S006", match: "Coastal Union vs KMC FC", pundit: "Juma Predictions", sport: "Football", odds: 2.15, price: "TSh 4,000", status: "flagged", buyers: 15, posted: "5h ago" },
];

const statusConfig: Record<string, { icon: any; className: string }> = {
  pending: { icon: Clock, className: "text-pending" },
  won: { icon: Check, className: "text-win" },
  lost: { icon: X, className: "text-loss" },
  flagged: { icon: AlertCircle, className: "text-pending" },
};

const AdminSlips = () => {
  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">Slips</h1>
          <p className="mt-1 text-sm text-muted-foreground">Monitor and moderate all published slips.</p>
        </div>
        <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input type="text" placeholder="Search slips..." className="w-48 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Match</th>
              <th className="px-4 py-3 font-medium">Pundit</th>
              <th className="px-4 py-3 font-medium text-right">Odds</th>
              <th className="px-4 py-3 font-medium text-right">Price</th>
              <th className="px-4 py-3 font-medium text-right">Buyers</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Posted</th>
              <th className="px-4 py-3 font-medium text-right"></th>
            </tr>
          </thead>
          <tbody>
            {slips.map((slip, i) => {
              const sc = statusConfig[slip.status];
              const Icon = sc.icon;
              return (
                <motion.tr
                  key={slip.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{slip.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{slip.match}</p>
                    <p className="text-xs text-muted-foreground">{slip.sport}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{slip.pundit}</td>
                  <td className="px-4 py-3 text-right font-mono text-sm text-foreground">{slip.odds}</td>
                  <td className="px-4 py-3 text-right font-mono text-sm font-medium text-foreground">{slip.price}</td>
                  <td className="px-4 py-3 text-right font-mono text-sm text-muted-foreground">{slip.buyers}</td>
                  <td className="px-4 py-3">
                    <div className={`flex items-center gap-1 text-xs font-medium ${sc.className}`}>
                      <Icon className="h-3 w-3" />
                      <span className="capitalize">{slip.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{slip.posted}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminSlips;
