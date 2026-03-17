import { ReactNode, useState } from "react";
import { PunditSidebarContent } from "./PunditSidebar";
import ThemeToggle from "./ThemeToggle";
import { Bell, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const PunditLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[220px] flex-col border-r border-border bg-sidebar py-6 md:flex">
        <PunditSidebarContent />
      </aside>

      <main className="flex-1 md:ml-[220px]">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 md:px-6 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="tap-scale p-1 md:hidden">
                  <Menu className="h-5 w-5 text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[260px] bg-sidebar p-0 pt-6 flex flex-col">
                <PunditSidebarContent onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <span className="text-sm font-medium text-muted-foreground">Pundit Panel</span>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
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
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
};

export default PunditLayout;
