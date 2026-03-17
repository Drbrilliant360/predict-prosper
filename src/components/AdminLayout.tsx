import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import ThemeToggle from "./ThemeToggle";
import { Bell, Shield } from "lucide-react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-[230px] flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-cta" />
            <span className="text-sm font-semibold text-cta">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="relative tap-scale">
              <Bell className="h-[18px] w-[18px] text-muted-foreground hover:text-foreground transition-colors" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pending text-[10px] font-bold text-primary-foreground">
                7
              </span>
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cta text-xs font-bold text-accent-foreground">
              A
            </div>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
