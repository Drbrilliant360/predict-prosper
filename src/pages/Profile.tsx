import AppLayout from "@/components/AppLayout";
import { useProfile, useMyPurchases } from "@/hooks/use-supabase-data";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Calendar, ShoppingCart, Trophy, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const statusConfig = {
  won: { label: "Won", class: "bg-green-500/10 text-green-500", icon: Trophy },
  lost: { label: "Lost", class: "bg-red-500/10 text-red-500", icon: XCircle },
  pending: { label: "Pending", class: "bg-yellow-500/10 text-yellow-500", icon: Clock },
  void: { label: "Void", class: "bg-gray-500/10 text-gray-500", icon: Clock },
  expired: { label: "Expired", class: "bg-gray-500/10 text-gray-400", icon: Clock },
};

const Profile = () => {
  const { user } = useAuth();
  const { data: profile, isLoading: loadingProfile } = useProfile();
  const { data: purchases, isLoading: loadingPurchases } = useMyPurchases();

  const purchaseHistory = (purchases ?? []).map((p: any) => ({
    id: p.id,
    pundit: p.slips?.profiles?.display_name ?? "Unknown",
    title: p.slips?.match_name ?? p.slips?.title ?? "Unknown",
    price: p.amount,
    odds: p.slips?.odds ?? 0,
    status: (p.slips?.status ?? "pending") as keyof typeof statusConfig,
    date: format(new Date(p.created_at), "MMM dd, yyyy"),
  }));

  const totalSpent = purchaseHistory.reduce((sum: number, p: any) => sum + p.price, 0);
  const wins = purchaseHistory.filter((p: any) => p.status === "won").length;
  const losses = purchaseHistory.filter((p: any) => p.status === "lost").length;

  const initials = profile?.display_name
    ? profile.display_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

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
          {loadingProfile ? (
            <div className="p-6 space-y-4">
              <div className="flex flex-col items-center gap-3">
                <Skeleton className="h-20 w-20 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center p-6">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile.display_name} className="h-20 w-20 rounded-full object-cover" />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                    {initials}
                  </div>
                )}
                <h2 className="mt-4 text-lg font-bold text-foreground">{profile?.display_name ?? "User"}</h2>
                <span className="mt-0.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Member
                </span>
              </div>

              <div className="border-t border-border divide-y divide-border/50">
                <div className="flex items-center gap-3 px-5 py-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground">{user?.email ?? "—"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium text-foreground">{profile?.phone ?? "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground">{profile?.location ?? "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                    <p className="text-sm font-medium text-foreground">
                      {profile?.created_at ? format(new Date(profile.created_at), "MMMM yyyy") : "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border p-4">
                <Button variant="outline" className="w-full" size="sm" asChild>
                  <Link to="/settings">Edit Profile</Link>
                </Button>
              </div>
            </>
          )}
        </motion.div>

        {/* Stats + Purchase History */}
        <div className="lg:col-span-2 space-y-6">
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

            {loadingPurchases ? (
              <div className="p-4 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : purchaseHistory.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">No purchases yet</p>
            ) : (
              <>
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
                      {purchaseHistory.map((p: any) => {
                        const s = statusConfig[p.status as keyof typeof statusConfig] ?? statusConfig.pending;
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
                  {purchaseHistory.map((p: any) => {
                    const s = statusConfig[p.status as keyof typeof statusConfig] ?? statusConfig.pending;
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
              </>
            )}
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
