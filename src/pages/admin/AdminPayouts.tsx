import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Banknote } from "lucide-react";

const payouts = [
  { id: "PO001", punter: "Bongo Tips", amount: "TSh 5,382,000", commission: "TSh 807,300", net: "TSh 4,574,700", method: "M-Pesa", status: "completed", date: "2026-03-16" },
  { id: "PO002", punter: "Daktari wa Odds", amount: "TSh 4,186,000", commission: "TSh 627,900", net: "TSh 3,558,100", method: "Tigo Pesa", status: "processing", date: "2026-03-17" },
  { id: "PO003", punter: "Kimaro Bets", amount: "TSh 2,185,000", commission: "TSh 327,750", net: "TSh 1,857,250", method: "Bank Transfer", status: "pending", date: "2026-03-17" },
  { id: "PO004", punter: "Msimbazi Edge", amount: "TSh 1,426,000", commission: "TSh 213,900", net: "TSh 1,212,100", method: "M-Pesa", status: "pending", date: "2026-03-17" },
  { id: "PO005", punter: "Juma Predictions", amount: "TSh 0", commission: "TSh 0", net: "TSh 0", method: "—", status: "held", date: "—" },
];

const statusStyles: Record<string, string> = {
  completed: "bg-primary/15 text-primary border-primary/20",
  processing: "bg-cta/15 text-cta border-cta/20",
  pending: "bg-pending/15 text-pending border-pending/20",
  held: "bg-loss/15 text-loss border-loss/20",
};

const AdminPayouts = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">Payouts</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage punter withdrawal requests and payouts.</p>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Pundit</th>
              <th className="px-4 py-3 font-medium text-right">Gross</th>
              <th className="px-4 py-3 font-medium text-right">Commission</th>
              <th className="px-4 py-3 font-medium text-right">Net</th>
              <th className="px-4 py-3 font-medium">Method</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p, i) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{p.punter}</td>
                <td className="px-4 py-3 text-right font-mono text-sm text-foreground">{p.amount}</td>
                <td className="px-4 py-3 text-right font-mono text-xs text-muted-foreground">{p.commission}</td>
                <td className="px-4 py-3 text-right font-mono text-sm font-medium text-win">{p.net}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{p.method}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold capitalize ${statusStyles[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.date}</td>
                <td className="px-4 py-3 text-right">
                  {(p.status === "pending" || p.status === "held") && (
                    <Button size="sm" className="h-7 text-xs bg-cta text-accent-foreground hover:bg-cta-hover">
                      Approve
                    </Button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminPayouts;
