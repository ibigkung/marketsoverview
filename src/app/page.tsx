"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ChartGrid from "@/components/ChartGrid";
import ExpandedChart from "@/components/ExpandedChart";

export type AssetFilter =
  | "Stock"
  | "Gold"
  | "Silver"
  | "BTC"
  | "Crypto"
  | "Forex";

export interface AssetPreset {
  label: string;
  symbol: string;
  exchange: string;
}

const ASSET_PRESETS: Record<AssetFilter, AssetPreset> = {
  Stock: { label: "Apple", symbol: "AAPL", exchange: "NASDAQ" },
  Gold: { label: "Gold", symbol: "XAUUSD", exchange: "OANDA" },
  Silver: { label: "Silver", symbol: "XAGUSD", exchange: "OANDA" },
  BTC: { label: "Bitcoin", symbol: "BTCUSDT", exchange: "BINANCE" },
  Crypto: { label: "Ethereum", symbol: "ETHUSDT", exchange: "BINANCE" },
  Forex: { label: "EUR/USD", symbol: "EURUSD", exchange: "OANDA" },
};

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<AssetFilter>("BTC");
  const [searchSymbol, setSearchSymbol] = useState<string>("");
  const [expandedTimeframe, setExpandedTimeframe] = useState<string | null>(
    null
  );

  const currentSymbol = searchSymbol
    ? searchSymbol
    : `${ASSET_PRESETS[activeFilter].exchange}:${ASSET_PRESETS[activeFilter].symbol}`;

  const handleFilterChange = useCallback((filter: AssetFilter) => {
    setActiveFilter(filter);
    setSearchSymbol("");
  }, []);

  const handleSearch = useCallback((symbol: string) => {
    setSearchSymbol(symbol);
  }, []);

  const handleExpand = useCallback((timeframe: string) => {
    setExpandedTimeframe(timeframe);
  }, []);

  const handleCloseExpand = useCallback(() => {
    setExpandedTimeframe(null);
  }, []);

  return (
    <main className="relative w-full bg-bg-primary">
      {/* Background gradient accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[400px] -left-[200px] w-[800px] h-[800px] rounded-full bg-accent-orange/[0.03] blur-[120px]" />
        <div className="absolute -bottom-[400px] -right-[200px] w-[800px] h-[800px] rounded-full bg-accent-blue/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header
          currentSymbol={currentSymbol}
          onSearch={handleSearch}
        />

        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          presets={ASSET_PRESETS}
        />

        <ChartGrid
          symbol={currentSymbol}
          onExpand={handleExpand}
        />
      </div>

      {expandedTimeframe && (
        <ExpandedChart
          symbol={currentSymbol}
          timeframe={expandedTimeframe}
          onClose={handleCloseExpand}
        />
      )}
    </main>
  );
}
