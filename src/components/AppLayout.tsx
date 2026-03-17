import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";
import { Bell, Search } from "lucide-react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-[220px] flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search pundits, matches..."
                className="w-56 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative tap-scale">
              <Bell className="h-[18px] w-[18px] text-muted-foreground hover:text-foreground transition-colors" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cta text-[10px] font-bold text-accent-foreground">
                3
              </span>
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
              JD
            </div>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
