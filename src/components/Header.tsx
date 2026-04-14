"use client";

import { useState, useRef, useEffect } from "react";
import { Search, TrendingUp, Activity, X } from "lucide-react";

interface HeaderProps {
  currentSymbol: string;
  onSearch: (symbol: string) => void;
}

export default function Header({ currentSymbol, onSearch }: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-orange to-accent-orange/70 flex items-center justify-center glow-orange">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-accent-green rounded-full border-2 border-bg-primary animate-pulse-live" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Market Overview
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <Activity className="w-3.5 h-3.5 text-accent-orange" />
              <p className="text-sm text-text-secondary">
                Multi-Timeframe Analysis (MTA) Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Search & Symbol Info */}
        <div className="flex items-center gap-4">
          {/* Current symbol badge */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card border border-border-primary">
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse-live" />
            <span className="text-xs text-text-muted uppercase tracking-wider">Active</span>
            <span className="text-sm font-semibold text-accent-orange">{currentSymbol}</span>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSubmit} className="relative group">
            <div
              className={`flex items-center gap-2 bg-bg-input border rounded-xl px-4 py-2.5 transition-all duration-300 w-[280px] sm:w-[340px] ${
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
                placeholder="Search pair (e.g. BINANCE:BTCUSDT)"
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
        </div>
      </div>
    </header>
  );
}
