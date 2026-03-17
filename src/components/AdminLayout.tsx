import { ReactNode, useState } from "react";
import { AdminSidebarContent } from "./AdminSidebar";
import ThemeToggle from "./ThemeToggle";
import { Bell, Shield, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile && (
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-[230px] flex-col border-r border-border bg-sidebar py-6">
          <AdminSidebarContent />
        </aside>
      )}

      <main className={`flex-1 ${!isMobile ? "ml-[230px]" : ""}`}>
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 md:px-6 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <button className="tap-scale p-1">
                    <Menu className="h-5 w-5 text-foreground" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[260px] bg-sidebar p-0 pt-6 flex flex-col">
                  <AdminSidebarContent onNavigate={() => setOpen(false)} />
                </SheetContent>
              </Sheet>
            )}
            <Shield className="h-4 w-4 text-cta" />
            <span className="text-sm font-semibold text-cta">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
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
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
