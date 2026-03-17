import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, Plus, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-supabase-data";
import { Skeleton } from "@/components/ui/skeleton";

const WalletCard = () => {
  const { data: wallet, isLoading } = useWallet();

  if (isLoading) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-3 w-32" />
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
  );
};

export default WalletCard;
