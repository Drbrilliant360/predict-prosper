import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WalletCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="mb-4 flex items-center gap-2 text-muted-foreground">
        <Wallet className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wider">
          Total Balance
        </span>
      </div>
      <p className="mb-5 font-mono text-3xl font-bold tracking-tight-custom text-foreground">
        €2,540.50
      </p>
      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tap-scale"
        >
          <ArrowDownRight className="h-3.5 w-3.5" />
          Deposit
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 gap-1.5 font-semibold tap-scale"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
          Withdraw
        </Button>
      </div>
    </motion.div>
  );
};

export default WalletCard;
