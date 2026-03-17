import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return true;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Init on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setDark(false);
    } else {
      setDark(true);
    }
  }, []);

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 tap-scale"
      onClick={() => setDark(!dark)}
    >
      {dark ? (
        <Sun className="h-[18px] w-[18px] text-muted-foreground hover:text-foreground transition-colors" />
      ) : (
        <Moon className="h-[18px] w-[18px] text-muted-foreground hover:text-foreground transition-colors" />
      )}
    </Button>
  );
};

export default ThemeToggle;
