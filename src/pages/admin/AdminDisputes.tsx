import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const disputes = [
  { id: "D001", user: "Juma Mwalimu", punter: "Bongo Tips", slip: "S001", reason: "Slip posted after match started", amount: "TSh 5,000", status: "open", opened: "2026-03-17" },
  { id: "D002", user: "Baraka Shao", punter: "Kimaro Bets", slip: "S003", reason: "Wrong odds displayed", amount: "TSh 3,500", status: "under_review", opened: "2026-03-16" },
  { id: "D003", user: "Lilian Moshi", punter: "Daktari wa Odds", slip: "S004", reason: "Duplicate slip content", amount: "TSh 5,000", status: "resolved", opened: "2026-03-15" },
  { id: "D004", user: "Neema Kimaro", punter: "Msimbazi Edge", slip: "S005", reason: "Prediction changed after purchase", amount: "TSh 3,500", status: "open", opened: "2026-03-17" },
  { id: "D005", user: "Amina Hassan", punter: "Juma Predictions", slip: "S006", reason: "Suspected fake screenshot", amount: "TSh 4,000", status: "escalated", opened: "2026-03-14" },
];

const statusStyles: Record<string, string> = {
  open: "bg-pending/15 text-pending border-pending/20",
  under_review: "bg-cta/15 text-cta border-cta/20",
  resolved: "bg-primary/15 text-primary border-primary/20",
  escalated: "bg-loss/15 text-loss border-loss/20",
};

const AdminDisputes = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">Disputes</h1>
        <p className="mt-1 text-sm text-muted-foreground">Review and resolve customer disputes.</p>
      </div>

      <div className="space-y-3">
        {disputes.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-pending/10">
                  <AlertTriangle className="h-4 w-4 text-pending" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-muted-foreground">{d.id}</span>
                    <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold capitalize ${statusStyles[d.status]}`}>
                      {d.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">{d.reason}</p>
                  <p className="text-xs text-muted-foreground">
                    {d.user} vs {d.punter} · Slip {d.slip} · {d.amount}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{d.opened}</span>
                <Button size="sm" variant="outline" className="h-7 text-xs">Review</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDisputes;
