"use client";

import { useState, useEffect, useRef } from "react";
import { Expand, Clock } from "lucide-react";

interface ChartCardProps {
  symbol: string;
  timeframe: string;
  label: string;
  shortLabel: string;
  color: string;
  onExpand: () => void;
  index: number;
}

export default function ChartCard({
  symbol,
  timeframe,
  label,
  shortLabel,
  color,
  onExpand,
  index,
}: ChartCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 500 + index * 100);
    return () => clearTimeout(timer);
  }, [symbol, timeframe, index]);

  const widgetUrl = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${timeframe}&symbol=${encodeURIComponent(symbol)}&interval=${timeframe}&hidesidetoolbar=1&hidetoptoolbar=0&symboledit=0&saveimage=0&toolbarbg=0a0a0f&studies=[]&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&hide_side_toolbar=1&allow_symbol_change=0&details=0&calendar=0&hotlist=0&locale=en&utm_source=&utm_medium=widget&utm_campaign=chart&utm_term=${encodeURIComponent(symbol)}&width=100%25&height=100%25`;

  return (
    <div
      ref={containerRef}
      className="chart-card group relative flex flex-col bg-bg-card border border-border-primary rounded-2xl overflow-hidden glow-card"
      style={{
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-primary bg-bg-secondary/50">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-text-muted" />
            <span className="text-sm font-semibold text-text-primary">
              {label}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-bg-primary text-xs font-mono font-bold text-text-secondary border border-border-primary">
            {shortLabel}
          </span>
        </div>

        <button
          id={`expand-${timeframe}`}
          onClick={onExpand}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-primary border border-border-primary text-text-muted hover:text-accent-orange hover:border-accent-orange/50 transition-all duration-200 text-xs font-medium cursor-pointer"
        >
          <Expand className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Expand</span>
        </button>
      </div>

      {/* Chart Area */}
      <div className="relative w-full h-[350px] sm:h-[400px]">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-card">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-accent-orange border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-text-muted">Loading chart...</span>
            </div>
          </div>
        )}
        <iframe
          src={widgetUrl}
          className={`w-full h-full border-0 transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          title={`TradingView Chart - ${symbol} - ${label}`}
          sandbox="allow-scripts allow-same-origin allow-popups"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
}
