import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { ScrollText } from "lucide-react";

const logs = [
  { id: "LOG001", actor: "Admin (root)", action: "Approved pundit", target: "Kimaro Bets (P002)", ip: "192.168.1.1", timestamp: "2026-03-17 14:30:22" },
  { id: "LOG002", actor: "Admin (root)", action: "Processed payout", target: "PO001 - TSh 4,574,700", ip: "192.168.1.1", timestamp: "2026-03-17 14:28:15" },
  { id: "LOG003", actor: "System", action: "Auto-flagged slip", target: "S006 - Fraud check", ip: "—", timestamp: "2026-03-17 14:15:00" },
  { id: "LOG004", actor: "Admin (root)", action: "Suspended user", target: "Baraka Shao (U003)", ip: "192.168.1.1", timestamp: "2026-03-17 13:45:10" },
  { id: "LOG005", actor: "System", action: "Settled results", target: "42 slips (NBC Premier League)", ip: "—", timestamp: "2026-03-17 13:00:00" },
  { id: "LOG006", actor: "Admin (mod1)", action: "Removed slip", target: "S098 - Misleading content", ip: "10.0.0.5", timestamp: "2026-03-17 12:30:45" },
  { id: "LOG007", actor: "Admin (root)", action: "Updated commission", target: "15% → 15% (no change)", ip: "192.168.1.1", timestamp: "2026-03-17 11:20:00" },
  { id: "LOG008", actor: "System", action: "KYC auto-check", target: "Juma Predictions (P005) - Pending", ip: "—", timestamp: "2026-03-17 10:15:30" },
  { id: "LOG009", actor: "Admin (root)", action: "Banned user", target: "Rashid Mfaume (U007)", ip: "192.168.1.1", timestamp: "2026-03-16 18:00:00" },
  { id: "LOG010", actor: "System", action: "Refund processed", target: "TX006 - TSh 5,000 to Rashid Mfaume", ip: "—", timestamp: "2026-03-16 17:55:00" },
];

const AdminAuditLogs = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">Audit Logs</h1>
        <p className="mt-1 text-sm text-muted-foreground">Complete record of all admin and system actions.</p>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Actor</th>
              <th className="px-4 py-3 font-medium">Action</th>
              <th className="px-4 py-3 font-medium">Target</th>
              <th className="px-4 py-3 font-medium">IP</th>
              <th className="px-4 py-3 font-medium">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <motion.tr
                key={log.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{log.id}</td>
                <td className="px-4 py-3 text-sm text-foreground">{log.actor}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{log.action}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{log.target}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{log.ip}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{log.timestamp}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminAuditLogs;
