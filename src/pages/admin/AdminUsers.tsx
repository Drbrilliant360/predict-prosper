import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search } from "lucide-react";

const users = [
  { id: "U001", name: "Juma Mwalimu", email: "juma@email.co.tz", role: "customer", status: "active", joined: "2026-01-15", spent: "TSh 780,000" },
  { id: "U002", name: "Amina Hassan", email: "amina@email.co.tz", role: "customer", status: "active", joined: "2026-02-08", spent: "TSh 2,800,000" },
  { id: "U003", name: "Baraka Shao", email: "baraka@email.co.tz", role: "customer", status: "suspended", joined: "2025-11-20", spent: "TSh 195,000" },
  { id: "U004", name: "Bongo Tips", email: "bongo@email.co.tz", role: "pundit", status: "active", joined: "2025-09-01", spent: "—" },
  { id: "U005", name: "Neema Kimaro", email: "neema@email.co.tz", role: "customer", status: "active", joined: "2026-03-01", spent: "TSh 1,290,000" },
  { id: "U006", name: "Kimaro Bets", email: "kimaro@email.co.tz", role: "pundit", status: "pending", joined: "2026-03-10", spent: "—" },
  { id: "U007", name: "Rashid Mfaume", email: "rashid@email.co.tz", role: "customer", status: "banned", joined: "2025-07-12", spent: "TSh 0" },
  { id: "U008", name: "Lilian Moshi", email: "lilian@email.co.tz", role: "customer", status: "active", joined: "2026-02-28", spent: "TSh 437,000" },
];

const statusStyles: Record<string, string> = {
  active: "bg-primary/15 text-primary border-primary/20",
  suspended: "bg-pending/15 text-pending border-pending/20",
  pending: "bg-cta/15 text-cta border-cta/20",
  banned: "bg-loss/15 text-loss border-loss/20",
};

const AdminUsers = () => {
  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">Users</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage all platform users.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input type="text" placeholder="Search users..." className="w-48 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 font-medium text-right">Spent</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{user.id}</td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-medium text-muted-foreground capitalize">{user.role}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold capitalize ${statusStyles[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{user.joined}</td>
                <td className="px-4 py-3 text-right font-mono text-sm text-foreground">{user.spent}</td>
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

export default AdminUsers;
