import PunditLayout from "@/components/PunditLayout";
import { motion } from "framer-motion";

const sales = [
  { id: "TX01", buyer: "Juma Mwalimu", slip: "Simba vs Yanga", amount: "TSh 5,000", commission: "TSh 750", net: "TSh 4,250", date: "2026-03-17 14:22" },
  { id: "TX02", buyer: "Amina Hassan", slip: "Azam vs Namungo", amount: "TSh 3,000", commission: "TSh 450", net: "TSh 2,550", date: "2026-03-17 13:10" },
  { id: "TX03", buyer: "Neema Kimaro", slip: "Arsenal vs Chelsea", amount: "TSh 5,000", commission: "TSh 750", net: "TSh 4,250", date: "2026-03-17 12:45" },
  { id: "TX04", buyer: "Baraka Shao", slip: "Simba vs Yanga", amount: "TSh 5,000", commission: "TSh 750", net: "TSh 4,250", date: "2026-03-17 11:30" },
  { id: "TX05", buyer: "Lilian Moshi", slip: "Coastal vs KMC", amount: "TSh 4,000", commission: "TSh 600", net: "TSh 3,400", date: "2026-03-17 10:15" },
  { id: "TX06", buyer: "Rashid Mfaume", slip: "Simba vs Yanga", amount: "TSh 5,000", commission: "TSh 750", net: "TSh 4,250", date: "2026-03-17 09:00" },
];

const PunditSales = () => {
  return (
    <PunditLayout>
      <h1 className="mb-6 text-2xl font-bold tracking-tight-custom text-foreground">Sales & Revenue</h1>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mb-8">
        {[
          { label: "Total Sales", value: "TSh 42.4M" },
          { label: "Commission Paid", value: "TSh 6.4M" },
          { label: "Net Earnings", value: "TSh 36.0M" },
          { label: "This Month", value: "TSh 3.2M" },
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
              <th className="px-4 py-3 font-medium">Buyer</th>
              <th className="px-4 py-3 font-medium">Slip</th>
              <th className="px-4 py-3 font-medium text-right">Amount</th>
              <th className="px-4 py-3 font-medium text-right">Commission</th>
              <th className="px-4 py-3 font-medium text-right">Net</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((tx, i) => (
              <motion.tr key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 text-sm text-foreground">{tx.buyer}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{tx.slip}</td>
                <td className="px-4 py-3 text-right font-mono text-sm text-foreground">{tx.amount}</td>
                <td className="px-4 py-3 text-right font-mono text-xs text-muted-foreground">{tx.commission}</td>
                <td className="px-4 py-3 text-right font-mono text-sm font-medium text-win">{tx.net}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{tx.date}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </PunditLayout>
  );
};

export default PunditSales;
