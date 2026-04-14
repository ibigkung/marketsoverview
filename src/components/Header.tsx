"use client";

import { useState, useRef, useEffect } from "react";
import { Search, TrendingUp, Activity, X, Moon, Sun } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

interface HeaderProps {
  currentSymbol: string;
  onSearch: (symbol: string) => void;
}

export default function Header({ currentSymbol, onSearch }: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme, language, toggleLanguage, t } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim().toUpperCase());
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
    inputRef.current?.focus();
  };

  // Keyboard shortcut: Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="mb-6 animate-fade-in-up">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              {t('marketOverview')}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse-live" />
              <p className="text-xs sm:text-sm font-semibold text-teal-400 tracking-wide uppercase">
                {t('marketOpen')}
              </p>
            </div>
          </div>
        </div>

        {/* Search & Symbol Info */}
        <div className="flex items-center gap-4">
          {/* Current symbol badge */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card border border-border-primary">
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse-live" />
            <span className="text-xs text-text-muted uppercase tracking-wider">{t('active')}</span>
            <span className="text-sm font-semibold text-accent-orange">{currentSymbol}</span>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSubmit} className="relative group">
            <div
              className={`flex items-center gap-2 bg-bg-input border rounded-xl px-4 py-2.5 transition-all duration-300 w-[200px] sm:w-[280px] lg:w-[340px] ${
                isFocused
                  ? "border-accent-orange shadow-[0_0_0_3px_rgba(249,115,22,0.1)]"
                  : "border-border-primary hover:border-text-muted"
              }`}
            >
              <Search
                className={`w-4 h-4 flex-shrink-0 transition-colors ${
                  isFocused ? "text-accent-orange" : "text-text-muted"
                }`}
              />
              <input
                ref={inputRef}
                id="symbol-search"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={t('searchPlaceholder')}
                className="bg-transparent outline-none text-sm text-text-primary placeholder:text-text-muted w-full"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex-shrink-0 text-text-muted hover:text-text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              {!searchValue && (
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-bg-card border border-border-primary text-[10px] text-text-muted font-mono flex-shrink-0">
                  ⌘K
                </kbd>
              )}
            </div>
          </form>

          {/* Theme & Language Controls */}
          <div className="flex items-center gap-1 sm:gap-2 pl-2 sm:pl-4 border-l border-border-primary">
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-lg text-text-muted hover:bg-bg-card hover:text-text-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Moon className="w-4 h-4 sm:w-5 sm:h-5" /> : <Sun className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            <button
              onClick={toggleLanguage}
              className="px-2 sm:px-3 py-2 rounded-lg text-text-muted hover:bg-bg-card hover:text-text-primary transition-colors font-semibold text-xs sm:text-sm min-w-[2.5rem] sm:min-w-[3rem] text-center"
            >
              {language}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
