import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Plus, ArrowDown, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useWallet } from "@/hooks/use-supabase-data";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

const WalletCard = () => {
  const { data: wallet, isLoading } = useWallet();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [depositOpen, setDepositOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleDeposit = async () => {
    if (!phone || !amount) {
      toast.error("Please enter phone number and amount");
      return;
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < 500) {
      toast.error("Minimum deposit is 500 TZS");
      return;
    }

    let phoneClean = phone.replace(/\D/g, "");
    if (phoneClean.startsWith("0")) {
      phoneClean = "255" + phoneClean.slice(1);
    }
    if (!/^255\d{9}$/.test(phoneClean)) {
      toast.error("Enter a valid Tanzanian phone number");
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("sonic-pesa-deposit", {
        body: { phone: phoneClean, amount: numAmount },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success(data.message || "Check your phone to approve the payment");
      setDepositOpen(false);
      setPhone("");
      setAmount("");

      // Refresh wallet and transactions after a delay
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["wallet", user?.id] });
        queryClient.invalidateQueries({ queryKey: ["transactions", user?.id] });
      }, 5000);
    } catch (err: any) {
      toast.error(err.message || "Deposit failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    );
  }

  const balance = wallet?.balance ?? 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between rounded-xl border border-border bg-card p-5"
      >
        <div>
          <div className="mb-1 flex items-center gap-2 text-muted-foreground">
            <Wallet className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Total Balance
            </span>
          </div>
          <p className="font-mono text-3xl font-bold tracking-tight text-primary">
            TSh {balance.toLocaleString()}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setDepositOpen(true)}
            className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider tap-scale px-6"
          >
            <Plus className="h-4 w-4" />
            Deposit
          </Button>
          <Button
            variant="outline"
            className="gap-1.5 font-bold uppercase tracking-wider tap-scale px-6 border-primary/30 text-primary hover:bg-primary/10"
          >
            <ArrowDown className="h-4 w-4" />
            Withdraw
          </Button>
        </div>
      </motion.div>

      <Dialog open={depositOpen} onOpenChange={setDepositOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Deposit Funds
            </DialogTitle>
            <DialogDescription>
              Enter your mobile money number. A USSD push will be sent to approve the payment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="0712 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  disabled={submitting}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                M-Pesa, Tigo Pesa, or Airtel Money
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (TZS)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="5000"
                min={500}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={submitting}
              />
              <p className="text-xs text-muted-foreground">Minimum: 500 TZS</p>
            </div>
            <div className="flex gap-2 pt-2">
              {[1000, 5000, 10000, 25000].map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(String(preset))}
                  disabled={submitting}
                  className="flex-1 text-xs"
                >
                  {preset.toLocaleString()}
                </Button>
              ))}
            </div>
            <Button
              onClick={handleDeposit}
              disabled={submitting}
              className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Deposit
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletCard;
