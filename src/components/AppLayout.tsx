import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppSidebarContent } from "./AppSidebar";
import ThemeToggle from "./ThemeToggle";
import { Search, Menu, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NotificationBell from "./NotificationBell";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? "?";

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[220px] flex-col border-r border-border bg-sidebar py-6 md:flex">
        <AppSidebarContent />
      </aside>

      <main className="flex-1 md:ml-[220px]">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 md:px-6 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="tap-scale p-1 md:hidden">
                  <Menu className="h-5 w-5 text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[260px] bg-sidebar p-0 pt-6 flex flex-col">
                <AppSidebarContent onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search pundits, matches..."
                className="w-32 md:w-56 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <NotificationBell accentClass="bg-cta text-accent-foreground" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground hover:ring-2 hover:ring-primary/30 transition-all">
                  {initials}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
