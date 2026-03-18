import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, MoreHorizontal, Search } from "lucide-react";

const punters = [
  { id: "P001", name: "Bongo Tips", sport: "Football", winRate: 72, roi: 14.2, slips: 482, status: "verified", earnings: "TSh 42,400,000", kyc: "approved" },
  { id: "P002", name: "Kimaro Bets", sport: "Basketball", winRate: 68, roi: 11.8, slips: 310, status: "verified", earnings: "TSh 22,650,000", kyc: "approved" },
  { id: "P003", name: "Msimbazi Edge", sport: "Tennis", winRate: 65, roi: 9.4, slips: 198, status: "verified", earnings: "TSh 12,240,000", kyc: "approved" },
  { id: "P004", name: "Daktari wa Odds", sport: "Football", winRate: 70, roi: 12.1, slips: 415, status: "verified", earnings: "TSh 32,430,000", kyc: "approved" },
  { id: "P005", name: "Juma Predictions", sport: "Football", winRate: 63, roi: 18.7, slips: 256, status: "pending", earnings: "TSh 0", kyc: "pending" },
  { id: "P006", name: "Baraka Analyst", sport: "Ice Hockey", winRate: 61, roi: 8.3, slips: 142, status: "suspended", earnings: "TSh 4,830,000", kyc: "approved" },
];

const statusStyles: Record<string, string> = {
  verified: "bg-primary/15 text-primary border-primary/20",
  pending: "bg-pending/15 text-pending border-pending/20",
  suspended: "bg-loss/15 text-loss border-loss/20",
};

const AdminPunters = () => {
  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">Punters</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage punter accounts and verification.</p>
        </div>
        <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input type="text" placeholder="Search punters..." className="w-48 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">Pundit</th>
              <th className="px-4 py-3 font-medium">Sport</th>
              <th className="px-4 py-3 font-medium text-right">Win%</th>
              <th className="px-4 py-3 font-medium text-right">ROI</th>
              <th className="px-4 py-3 font-medium text-right">Slips</th>
              <th className="px-4 py-3 font-medium">KYC</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Earnings</th>
              <th className="px-4 py-3 font-medium text-right"></th>
            </tr>
          </thead>
          <tbody>
            {punters.map((p, i) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                      {p.name.charAt(0)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-foreground">{p.name}</span>
                      {p.status === "verified" && <Shield className="h-3 w-3 text-primary" />}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{p.sport}</td>
                <td className="px-4 py-3 text-right font-mono text-sm text-foreground">{p.winRate}%</td>
                <td className="px-4 py-3 text-right font-mono text-sm font-medium text-win">+{p.roi}%</td>
                <td className="px-4 py-3 text-right font-mono text-sm text-muted-foreground">{p.slips}</td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-semibold capitalize ${p.kyc === "approved" ? "text-primary" : "text-pending"}`}>
                    {p.kyc}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold capitalize ${statusStyles[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-sm text-foreground">{p.earnings}</td>
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

export default AdminPunters;
