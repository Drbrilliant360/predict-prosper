import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Eye, Search, Loader2 } from "lucide-react";
import { format } from "date-fns";

type KycSubmission = {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  date_of_birth: string;
  id_type: string;
  id_number: string;
  id_front_url: string | null;
  id_back_url: string | null;
  selfie_url: string | null;
  status: string;
  rejection_reason: string | null;
  created_at: string;
};

const statusStyles: Record<string, string> = {
  pending: "bg-cta/15 text-cta border-cta/20",
  approved: "bg-primary/15 text-primary border-primary/20",
  rejected: "bg-loss/15 text-loss border-loss/20",
};

const idTypeLabels: Record<string, string> = {
  national_id: "National ID (NIDA)",
  passport: "Passport",
  driving_license: "Driving License",
  voter_id: "Voter ID",
};

const AdminKYC = () => {
  const [selectedKyc, setSelectedKyc] = useState<KycSubmission | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["kyc-submissions", filter],
    queryFn: async () => {
      let query = supabase.from("kyc_submissions").select("*").order("created_at", { ascending: false });
      if (filter !== "all") query = query.eq("status", filter);
      const { data, error } = await query;
      if (error) throw error;
      return data as KycSubmission[];
    },
  });

  const updateKyc = useMutation({
    mutationFn: async ({ id, status, rejection_reason }: { id: string; status: string; rejection_reason?: string }) => {
      const { error } = await supabase
        .from("kyc_submissions")
        .update({ status, rejection_reason: rejection_reason || null, reviewed_by: (await supabase.auth.getUser()).data.user?.id })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kyc-submissions"] });
      setSelectedKyc(null);
      setShowRejectDialog(false);
      setRejectReason("");
      toast({ title: "KYC updated successfully" });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const filtered = submissions.filter((s) =>
    s.full_name.toLowerCase().includes(search.toLowerCase()) ||
    s.id_number.toLowerCase().includes(search.toLowerCase()) ||
    s.phone.includes(search)
  );

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">KYC Verification</h1>
          <p className="mt-1 text-sm text-muted-foreground">Review and verify user identity documents.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input type="text" placeholder="Search by name, ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-48 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-4 flex gap-2">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="capitalize text-xs">
            {f}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">No KYC submissions found.</div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">ID Type</th>
                <th className="px-4 py-3 font-medium">ID Number</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((kyc, i) => (
                <motion.tr key={kyc.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{kyc.full_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{kyc.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{idTypeLabels[kyc.id_type] || kyc.id_type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{kyc.id_number}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold capitalize ${statusStyles[kyc.status] || ""}`}>
                      {kyc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{format(new Date(kyc.created_at), "yyyy-MM-dd")}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={() => setSelectedKyc(kyc)}>
                      <Eye className="h-3.5 w-3.5" /> Review
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Review dialog */}
      <Dialog open={!!selectedKyc} onOpenChange={(o) => !o && setSelectedKyc(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>KYC Review — {selectedKyc?.full_name}</DialogTitle>
          </DialogHeader>
          {selectedKyc && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-xs text-muted-foreground">Full Name</span><p className="font-medium text-foreground">{selectedKyc.full_name}</p></div>
                <div><span className="text-xs text-muted-foreground">Phone</span><p className="font-medium text-foreground">{selectedKyc.phone}</p></div>
                <div><span className="text-xs text-muted-foreground">Date of Birth</span><p className="font-medium text-foreground">{selectedKyc.date_of_birth}</p></div>
                <div><span className="text-xs text-muted-foreground">ID Type</span><p className="font-medium text-foreground">{idTypeLabels[selectedKyc.id_type] || selectedKyc.id_type}</p></div>
                <div className="col-span-2"><span className="text-xs text-muted-foreground">ID Number</span><p className="font-mono font-medium text-foreground">{selectedKyc.id_number}</p></div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Documents</p>
                <div className="grid grid-cols-2 gap-2">
                  {selectedKyc.id_front_url && (
                    <div>
                      <p className="mb-1 text-[11px] text-muted-foreground">ID Front</p>
                      <img src={selectedKyc.id_front_url} alt="ID Front" className="rounded-lg border border-border object-cover w-full h-32" />
                    </div>
                  )}
                  {selectedKyc.id_back_url && (
                    <div>
                      <p className="mb-1 text-[11px] text-muted-foreground">ID Back</p>
                      <img src={selectedKyc.id_back_url} alt="ID Back" className="rounded-lg border border-border object-cover w-full h-32" />
                    </div>
                  )}
                </div>
                {selectedKyc.selfie_url && (
                  <div>
                    <p className="mb-1 text-[11px] text-muted-foreground">Selfie with ID</p>
                    <img src={selectedKyc.selfie_url} alt="Selfie" className="rounded-lg border border-border object-cover w-full h-40" />
                  </div>
                )}
              </div>

              {selectedKyc.rejection_reason && (
                <div className="rounded-lg bg-loss/10 p-3">
                  <p className="text-xs font-medium text-loss">Rejection Reason</p>
                  <p className="mt-1 text-sm text-foreground">{selectedKyc.rejection_reason}</p>
                </div>
              )}

              {selectedKyc.status === "pending" && (
                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 gap-1" onClick={() => updateKyc.mutate({ id: selectedKyc.id, status: "approved" })} disabled={updateKyc.isPending}>
                    <Check className="h-4 w-4" /> Approve
                  </Button>
                  <Button variant="destructive" className="flex-1 gap-1" onClick={() => setShowRejectDialog(true)} disabled={updateKyc.isPending}>
                    <X className="h-4 w-4" /> Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject reason dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Rejection Reason</DialogTitle>
          </DialogHeader>
          <Textarea placeholder="Explain why the KYC was rejected..." value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} rows={3} />
          <Button variant="destructive" className="w-full" disabled={!rejectReason.trim() || updateKyc.isPending} onClick={() => selectedKyc && updateKyc.mutate({ id: selectedKyc.id, status: "rejected", rejection_reason: rejectReason })}>
            {updateKyc.isPending ? "Rejecting..." : "Confirm Rejection"}
          </Button>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminKYC;
