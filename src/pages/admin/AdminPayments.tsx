import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search } from "lucide-react";

const payments = [
  { id: "TX001", user: "Juma Mwalimu", type: "Slip Purchase", amount: "TSh 5,000", fee: "TSh 750", net: "TSh 4,250", method: "M-Pesa", status: "completed", date: "2026-03-17 14:22" },
  { id: "TX002", user: "Amina Hassan", type: "Subscription", amount: "TSh 25,000", fee: "TSh 3,750", net: "TSh 21,250", method: "Tigo Pesa", status: "completed", date: "2026-03-17 13:10" },
  { id: "TX003", user: "Neema Kimaro", type: "Wallet Deposit", amount: "TSh 50,000", fee: "TSh 0", net: "TSh 50,000", method: "M-Pesa", status: "completed", date: "2026-03-17 12:45" },
  { id: "TX004", user: "Baraka Shao", type: "Slip Purchase", amount: "TSh 3,500", fee: "TSh 525", net: "TSh 2,975", method: "Wallet", status: "pending", date: "2026-03-17 11:30" },
  { id: "TX005", user: "Lilian Moshi", type: "Bundle (3 Pack)", amount: "TSh 12,000", fee: "TSh 1,800", net: "TSh 10,200", method: "Airtel Money", status: "completed", date: "2026-03-17 10:15" },
  { id: "TX006", user: "Rashid Mfaume", type: "Refund", amount: "-TSh 5,000", fee: "TSh 0", net: "-TSh 5,000", method: "M-Pesa", status: "refunded", date: "2026-03-17 09:00" },
];

const statusStyles: Record<string, string> = {
  completed: "bg-primary/15 text-primary border-primary/20",
  pending: "bg-pending/15 text-pending border-pending/20",
  refunded: "bg-loss/15 text-loss border-loss/20",
};

const AdminPayments = () => {
  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">Payments</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track all transactions and revenue.</p>
        </div>
        <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input type="text" placeholder="Search payments..." className="w-48 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">TX ID</th>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium text-right">Amount</th>
              <th className="px-4 py-3 font-medium text-right">Fee</th>
              <th className="px-4 py-3 font-medium text-right">Net</th>
              <th className="px-4 py-3 font-medium">Method</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium text-right"></th>
            </tr>
          </thead>
          <tbody>
            {payments.map((tx, i) => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{tx.id}</td>
                <td className="px-4 py-3 text-sm text-foreground">{tx.user}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{tx.type}</td>
                <td className="px-4 py-3 text-right font-mono text-sm font-medium text-foreground">{tx.amount}</td>
                <td className="px-4 py-3 text-right font-mono text-xs text-muted-foreground">{tx.fee}</td>
                <td className="px-4 py-3 text-right font-mono text-sm text-foreground">{tx.net}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{tx.method}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold capitalize ${statusStyles[tx.status]}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{tx.date}</td>
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

export default AdminPayments;
