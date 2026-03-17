import PunditLayout from "@/components/PunditLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const withdrawals = [
  { id: "W001", amount: "TSh 2,500,000", method: "M-Pesa", phone: "0712 XXX XXX", status: "completed", date: "2026-03-15" },
  { id: "W002", amount: "TSh 1,800,000", method: "Tigo Pesa", phone: "0652 XXX XXX", status: "completed", date: "2026-03-10" },
  { id: "W003", amount: "TSh 3,200,000", method: "M-Pesa", phone: "0712 XXX XXX", status: "processing", date: "2026-03-17" },
  { id: "W004", amount: "TSh 1,000,000", method: "Bank Transfer", phone: "NMB ****4521", status: "pending", date: "2026-03-17" },
];

const statusStyles: Record<string, string> = {
  completed: "bg-primary/15 text-primary border-primary/20",
  processing: "bg-cta/15 text-cta border-cta/20",
  pending: "bg-pending/15 text-pending border-pending/20",
};

const PunditWithdrawals = () => {
  return (
    <PunditLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">Withdrawals</h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 tap-scale">
          Request Withdrawal
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 mb-8">
        {[
          { label: "Available Balance", value: "TSh 4,280,000" },
          { label: "Pending", value: "TSh 4,200,000" },
          { label: "Total Withdrawn", value: "TSh 31,720,000" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
            <p className="font-mono text-xl font-bold text-foreground mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium text-right">Amount</th>
              <th className="px-4 py-3 font-medium">Method</th>
              <th className="px-4 py-3 font-medium">Account</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((w, i) => (
              <motion.tr key={w.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{w.id}</td>
                <td className="px-4 py-3 text-right font-mono text-sm font-medium text-foreground">{w.amount}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{w.method}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{w.phone}</td>
                <td className="px-4 py-3"><span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold capitalize ${statusStyles[w.status]}`}>{w.status}</span></td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{w.date}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </PunditLayout>
  );
};

export default PunditWithdrawals;
