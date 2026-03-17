import { ReactNode } from "react";
import PunditSidebar from "./PunditSidebar";
import ThemeToggle from "./ThemeToggle";
import { Bell } from "lucide-react";

const PunditLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <PunditSidebar />
      <main className="ml-[220px] flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-sm">
          <span className="text-sm font-medium text-muted-foreground">Pundit Panel</span>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="relative tap-scale">
              <Bell className="h-[18px] w-[18px] text-muted-foreground hover:text-foreground transition-colors" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                4
              </span>
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
              BT
            </div>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default PunditLayout;
