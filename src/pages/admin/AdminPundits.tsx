import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, MoreHorizontal, Search, Plus, UserPlus, Mail, Lock, User, Loader2, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const statusStyles: Record<string, string> = {
  verified: "bg-primary/15 text-primary border-primary/20",
  pending: "bg-pending/15 text-pending border-pending/20",
  suspended: "bg-loss/15 text-loss border-loss/20",
};

const AdminPunters = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sport, setSport] = useState("Football");
  const [creating, setCreating] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<{ email: string; password: string } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: punters = [], isLoading } = useQuery({
    queryKey: ["admin-punters"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pundit_profiles")
        .select("*, profiles!pundit_profiles_user_id_fkey(display_name, avatar_url, phone)")
        .order("created_at", { ascending: false });

      if (error) {
        // Fallback: fetch without foreign key name
        const { data: ppData, error: ppError } = await supabase
          .from("pundit_profiles")
          .select("*")
          .order("created_at", { ascending: false });
        if (ppError) throw ppError;

        // Fetch profiles separately
        const userIds = ppData.map((p) => p.user_id);
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("user_id, display_name, avatar_url, phone")
          .in("user_id", userIds);

        return ppData.map((p) => ({
          ...p,
          profile: profilesData?.find((pr) => pr.user_id === p.user_id) || null,
        }));
      }

      return data.map((p: any) => ({
        ...p,
        profile: p.profiles || null,
      }));
    },
  });

  const handleCreate = async () => {
    if (!displayName.trim() || !email.trim() || !password.trim()) {
      toast({ title: "Error", description: "All fields are required", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }

    setCreating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await supabase.functions.invoke("create-punter", {
        body: { display_name: displayName, email, password, sport },
      });

      if (res.error) throw new Error(res.error.message || "Failed to create punter");
      if (res.data?.error) throw new Error(res.data.error);

      setCreatedCredentials({ email, password });
      setShowCreateDialog(false);
      setShowSuccessDialog(true);
      setDisplayName("");
      setEmail("");
      setPassword("");
      setSport("Football");
      queryClient.invalidateQueries({ queryKey: ["admin-punters"] });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const filtered = punters.filter((p: any) =>
    (p.profile?.display_name || "").toLowerCase().includes(search.toLowerCase()) ||
    p.sport.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Punters</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage punter accounts.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input type="text" placeholder="Search punters..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-48 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
          </div>
          <Button className="gap-1.5" onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4" /> Add Punter
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <UserPlus className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No punters yet. Click "Add Punter" to create one.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Punter</th>
                <th className="px-4 py-3 font-medium">Sport</th>
                <th className="px-4 py-3 font-medium text-right">Win%</th>
                <th className="px-4 py-3 font-medium text-right">ROI</th>
                <th className="px-4 py-3 font-medium text-right">Slips</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p: any, i: number) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                        {(p.profile?.display_name || "?").charAt(0)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground">{p.profile?.display_name || "Unknown"}</span>
                        {p.verified && <Shield className="h-3 w-3 text-primary" />}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{p.sport}</td>
                  <td className="px-4 py-3 text-right font-mono text-sm text-foreground">{p.win_rate || 0}%</td>
                  <td className="px-4 py-3 text-right font-mono text-sm font-medium text-primary">+{p.roi || 0}%</td>
                  <td className="px-4 py-3 text-right font-mono text-sm text-muted-foreground">{p.total_slips || 0}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold capitalize ${p.verified ? statusStyles.verified : statusStyles.pending}`}>
                      {p.verified ? "verified" : "pending"}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Punter Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" /> Add New Punter
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Display Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Bongo Tips" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="email" placeholder="punter@example.co.tz" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="text" placeholder="Set a password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Sport</label>
              <Select value={sport} onValueChange={setSport}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Football">Football</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Tennis">Tennis</SelectItem>
                  <SelectItem value="Cricket">Cricket</SelectItem>
                  <SelectItem value="Ice Hockey">Ice Hockey</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full gap-1.5" onClick={handleCreate} disabled={creating}>
              {creating ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating...</> : <><UserPlus className="h-4 w-4" /> Create Punter Account</>}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog with credentials */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <Check className="h-5 w-5" /> Punter Created Successfully
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">Share these login credentials with the punter:</p>
          {createdCredentials && (
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3">
                <div>
                  <p className="text-[11px] text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{createdCredentials.email}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => copyToClipboard(createdCredentials.email, "email")}>
                  {copiedField === "email" ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3">
                <div>
                  <p className="text-[11px] text-muted-foreground">Password</p>
                  <p className="text-sm font-medium font-mono text-foreground">{createdCredentials.password}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => copyToClipboard(createdCredentials.password, "password")}>
                  {copiedField === "password" ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground">⚠️ Make sure to share these securely. The password cannot be viewed again.</p>
            </div>
          )}
          <Button variant="outline" className="w-full" onClick={() => setShowSuccessDialog(false)}>Done</Button>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminPunters;
