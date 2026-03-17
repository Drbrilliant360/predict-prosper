import { motion } from "framer-motion";
import { MOCK_PUNDITS } from "@/lib/mock-data";
import { Shield } from "lucide-react";

const FavoritePundits = () => {
  const favorites = MOCK_PUNDITS.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl border border-border bg-card"
    >
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold tracking-tight-custom text-foreground">
          Favorite Pundits
        </h2>
      </div>
      <div className="divide-y divide-border/50">
        {favorites.map((pundit) => (
          <div
            key={pundit.id}
            className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/30 cursor-pointer tap-scale"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
              {pundit.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-foreground truncate">
                  {pundit.name}
                </span>
                {pundit.verified && (
                  <Shield className="h-3 w-3 flex-shrink-0 text-primary" />
                )}
              </div>
            </div>
            <span className="rounded-md bg-win/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-win">
              {pundit.winRate}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FavoritePundits;
