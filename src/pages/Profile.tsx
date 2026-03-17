import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, ShoppingCart, Trophy, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const purchaseHistory = [
  { id: "s1", pundit: "Bongo Tips", title: "Simba vs Yanga", price: 5000, odds: 2.5, status: "pending" as const, date: "Mar 17, 2026" },
  { id: "s2", pundit: "Bongo Tips", title: "Azam vs Namungo", price: 3000, odds: 1.85, status: "won" as const, date: "Mar 16, 2026" },
  { id: "s3", pundit: "Kimaro Bets", title: "Lakers vs Celtics", price: 3500, odds: 1.95, status: "pending" as const, date: "Mar 17, 2026" },
  { id: "s4", pundit: "Daktari wa Odds", title: "Arsenal vs Chelsea", price: 5000, odds: 1.72, status: "won" as const, date: "Mar 15, 2026" },
  { id: "s5", pundit: "Juma Predictions", title: "Coastal Union vs KMC", price: 4000, odds: 2.15, status: "lost" as const, date: "Mar 14, 2026" },
  { id: "s6", pundit: "Msimbazi Edge", title: "Djokovic vs Alcaraz", price: 3500, odds: 2.30, status: "lost" as const, date: "Mar 13, 2026" },
  { id: "s7", pundit: "Bongo Tips", title: "Yanga vs Azam", price: 5000, odds: 1.90, status: "won" as const, date: "Mar 12, 2026" },
  { id: "s8", pundit: "Daktari wa Odds", title: "Man City vs Liverpool", price: 5000, odds: 2.10, status: "won" as const, date: "Mar 11, 2026" },
];

const statusConfig = {
  won: { label: "Won", class: "bg-green-500/10 text-green-500", icon: Trophy },
  lost: { label: "Lost", class: "bg-red-500/10 text-red-500", icon: XCircle },
  pending: { label: "Pending", class: "bg-yellow-500/10 text-yellow-500", icon: Clock },
};

const Profile = () => {
  const totalSpent = purchaseHistory.reduce((sum, p) => sum + p.price, 0);
  const wins = purchaseHistory.filter((p) => p.status === "won").length;
  const losses = purchaseHistory.filter((p) => p.status === "lost").length;

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">My Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">View your account info and purchase history.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 max-w-5xl">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-card lg:col-span-1"
        >
          <div className="flex flex-col items-center p-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
              JD
            </div>
            <h2 className="mt-4 text-lg font-bold text-foreground">John Daudi</h2>
            <span className="mt-0.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              Premium Member
            </span>
          </div>

          <div className="border-t border-border divide-y divide-border/50">
            <div className="flex items-center gap-3 px-5 py-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">john.daudi@example.co.tz</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground">+255 712 345 678</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium text-foreground">Dar es Salaam, Tanzania</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="text-sm font-medium text-foreground">January 2026</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border p-4">
            <Button variant="outline" className="w-full" size="sm">Edit Profile</Button>
          </div>
        </motion.div>

        {/* Stats + Purchase History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {[
              { label: "Total Spent", value: `TSh ${totalSpent.toLocaleString()}` },
              { label: "Slips Bought", value: purchaseHistory.length.toString() },
              { label: "Wins", value: wins.toString() },
              { label: "Losses", value: losses.toString() },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-lg font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Purchase History */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <ShoppingCart className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Purchase History</h2>
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-xs text-muted-foreground">
                    <th className="px-4 py-2.5 text-left font-medium">Slip</th>
                    <th className="px-4 py-2.5 text-left font-medium">Pundit</th>
                    <th className="px-4 py-2.5 text-right font-medium">Odds</th>
                    <th className="px-4 py-2.5 text-right font-medium">Price</th>
                    <th className="px-4 py-2.5 text-center font-medium">Status</th>
                    <th className="px-4 py-2.5 text-right font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {purchaseHistory.map((p) => {
                    const s = statusConfig[p.status];
                    const Icon = s.icon;
                    return (
                      <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{p.title}</td>
                        <td className="px-4 py-3 text-muted-foreground">{p.pundit}</td>
                        <td className="px-4 py-3 text-right font-mono text-foreground">{p.odds}</td>
                        <td className="px-4 py-3 text-right font-mono text-foreground">TSh {p.price.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${s.class}`}>
                            <Icon className="h-3 w-3" />
                            {s.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{p.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden divide-y divide-border/50">
              {purchaseHistory.map((p) => {
                const s = statusConfig[p.status];
                const Icon = s.icon;
                return (
                  <div key={p.id} className="px-4 py-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{p.title}</p>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${s.class}`}>
                        <Icon className="h-3 w-3" />
                        {s.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{p.pundit} · {p.odds}</span>
                      <span className="font-mono">TSh {p.price.toLocaleString()}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground/70">{p.date}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
