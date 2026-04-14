"use client";

import type { AssetFilter, AssetPreset } from "@/app/page";
import {
  BarChart3,
  CircleDollarSign,
  Gem,
  Bitcoin,
  Coins,
  DollarSign,
} from "lucide-react";

interface FilterBarProps {
  activeFilter: AssetFilter;
  onFilterChange: (filter: AssetFilter) => void;
  presets: Record<AssetFilter, AssetPreset>;
}

const FILTER_CONFIG: Record<
  AssetFilter,
  { icon: React.ElementType; color: string; gradient: string }
> = {
  Stock: {
    icon: BarChart3,
    color: "text-accent-blue",
    gradient: "from-blue-500/20 to-blue-600/5",
  },
  Gold: {
    icon: CircleDollarSign,
    color: "text-accent-gold",
    gradient: "from-yellow-500/20 to-yellow-600/5",
  },
  Silver: {
    icon: Gem,
    color: "text-accent-silver",
    gradient: "from-slate-400/20 to-slate-500/5",
  },
  BTC: {
    icon: Bitcoin,
    color: "text-accent-orange",
    gradient: "from-orange-500/20 to-orange-600/5",
  },
  Crypto: {
    icon: Coins,
    color: "text-accent-purple",
    gradient: "from-purple-500/20 to-purple-600/5",
  },
  Forex: {
    icon: DollarSign,
    color: "text-accent-green",
    gradient: "from-green-500/20 to-green-600/5",
  },
};

export default function FilterBar({
  activeFilter,
  onFilterChange,
  presets,
}: FilterBarProps) {
  const filters = Object.keys(presets) as AssetFilter[];

  return (
    <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {filters.map((filter) => {
          const config = FILTER_CONFIG[filter];
          const Icon = config.icon;
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              id={`filter-${filter.toLowerCase()}`}
              onClick={() => onFilterChange(filter)}
              className={`filter-btn relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 cursor-pointer ${
                isActive
                  ? "active border-accent-orange bg-accent-orange text-white shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                  : "border-border-primary bg-bg-card text-text-secondary hover:text-text-primary hover:border-text-muted"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isActive ? "text-white" : config.color}`}
              />
              <span>{filter}</span>
              {isActive && (
                <span className="ml-1 text-xs opacity-75 hidden sm:inline">
                  {presets[filter].label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
