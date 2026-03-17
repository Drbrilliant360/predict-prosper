import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, ArrowDownRight, Plus, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const WalletCard = () => {
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
          TSh 5,840,000
        </p>
        <div className="mt-1.5 flex items-center gap-1 text-xs text-win font-medium">
          <ArrowUpRight className="h-3 w-3" />
          +TSh 320,000 this week
        </div>
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
