'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check saved theme in localStorage, fallback to system or light
    try {
      const saved = localStorage.getItem('meritto_telephony_theme') as Theme | null;
      if (saved === 'dark' || saved === 'light') {
        setThemeState(saved);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setThemeState(prefersDark ? 'dark' : 'light');
      }
    } catch {
      setThemeState('light');
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('meritto_telephony_theme', newTheme);
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Sync class on documentElement for tailwind and data-theme
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl transition-all duration-200 border ${
        theme === 'dark'
          ? 'bg-[#151D33] border-[#2A3557] shadow-inner'
          : 'bg-slate-100/90 border-slate-200 shadow-inner'
      } ${className}`}
      role="group"
      aria-label="Theme selector"
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
          theme === 'light'
            ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80 scale-[1.02]'
            : 'text-slate-500 hover:text-slate-800'
        }`}
        title="Switch to Light Mode"
      >
        <span className="text-amber-500 text-sm">☀️</span>
        <span>Light</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-[#222E4E] text-blue-300 shadow-sm border border-blue-500/40 scale-[1.02]'
            : 'text-slate-500 hover:text-slate-300'
        }`}
        title="Switch to Dark Mode"
      >
        <span className="text-blue-400 text-sm">🌙</span>
        <span>Dark</span>
      </button>
    </div>
  );
}
