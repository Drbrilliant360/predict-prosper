import PunditLayout from "@/components/PunditLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const followers = [
  { name: "Juma Mwalimu", joined: "2026-01-15", slipsBought: 24, totalSpent: "TSh 120,000" },
  { name: "Amina Hassan", joined: "2026-02-08", slipsBought: 18, totalSpent: "TSh 90,000" },
  { name: "Neema Kimaro", joined: "2026-03-01", slipsBought: 12, totalSpent: "TSh 60,000" },
  { name: "Baraka Shao", joined: "2025-11-20", slipsBought: 32, totalSpent: "TSh 160,000" },
  { name: "Lilian Moshi", joined: "2026-02-28", slipsBought: 8, totalSpent: "TSh 40,000" },
  { name: "Rashid Mfaume", joined: "2025-07-12", slipsBought: 42, totalSpent: "TSh 210,000" },
  { name: "Fatma Bakari", joined: "2026-01-22", slipsBought: 15, totalSpent: "TSh 75,000" },
  { name: "Hamisi Doto", joined: "2025-12-10", slipsBought: 28, totalSpent: "TSh 140,000" },
];

const PunditFollowers = () => {
  return (
    <PunditLayout>
      <h1 className="mb-6 text-2xl font-bold tracking-tight-custom text-foreground">Followers</h1>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 mb-8">
        {[
          { label: "Total Followers", value: "3,420" },
          { label: "New This Week", value: "+86" },
          { label: "Growth Rate", value: "+2.6%" },
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
              <th className="px-4 py-3 font-medium">Follower</th>
              <th className="px-4 py-3 font-medium">Since</th>
              <th className="px-4 py-3 font-medium text-right">Slips Bought</th>
              <th className="px-4 py-3 font-medium text-right">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {followers.map((f, i) => (
              <motion.tr key={f.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">{f.name.charAt(0)}</div>
                    <span className="text-sm font-medium text-foreground">{f.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{f.joined}</td>
                <td className="px-4 py-3 text-right font-mono text-sm text-foreground">{f.slipsBought}</td>
                <td className="px-4 py-3 text-right font-mono text-sm text-primary">{f.totalSpent}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </PunditLayout>
  );
};

export default PunditFollowers;
