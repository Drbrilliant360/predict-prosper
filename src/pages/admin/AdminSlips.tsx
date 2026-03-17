import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search, Clock, Check, X, AlertCircle } from "lucide-react";

const slips = [
  { id: "S001", match: "Arsenal vs Chelsea", pundit: "Alpha Picks", sport: "Football", odds: 2.5, price: "€15", status: "pending", buyers: 42, posted: "2h ago" },
  { id: "S002", match: "Man City vs Liverpool", pundit: "Alpha Picks", sport: "Football", odds: 1.85, price: "€12", status: "won", buyers: 89, posted: "1d ago" },
  { id: "S003", match: "Lakers vs Celtics", pundit: "Court Vision", sport: "Basketball", odds: 1.95, price: "€10", status: "pending", buyers: 31, posted: "4h ago" },
  { id: "S004", match: "Real Madrid vs Barcelona", pundit: "Goal Machine", sport: "Football", odds: 1.72, price: "€20", status: "pending", buyers: 67, posted: "3h ago" },
  { id: "S005", match: "Djokovic vs Alcaraz", pundit: "Ace Serve", sport: "Tennis", odds: 2.3, price: "€14", status: "lost", buyers: 24, posted: "2d ago" },
  { id: "S006", match: "Dortmund vs Bayern", pundit: "Sharp Edge", sport: "Football", odds: 2.15, price: "€18", status: "flagged", buyers: 15, posted: "5h ago" },
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
