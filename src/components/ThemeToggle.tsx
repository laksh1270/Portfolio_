"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-6 right-6 p-4 rounded-full bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[#ffbb00] shadow-[0_0_15px_rgba(255,187,0,0.3)] z-[100] hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun size={28} /> : <Moon size={28} />}
    </button>
  );
}
