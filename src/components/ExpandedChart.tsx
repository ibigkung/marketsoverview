"use client";

import { useEffect, useCallback, useState } from "react";
import { X, Minimize2 } from "lucide-react";

interface ExpandedChartProps {
  symbol: string;
  timeframe: string;
  onClose: () => void;
}

const TIMEFRAME_LABELS: Record<string, string> = {
  "1": "1 Minute",
  "5": "5 Minutes",
  "15": "15 Minutes",
  "60": "1 Hour",
  "240": "4 Hours",
  D: "1 Day",
};

export default function ExpandedChart({
  symbol,
  timeframe,
  onClose,
}: ExpandedChartProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => setIsVisible(true));

    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const widgetUrl = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_expanded&symbol=${encodeURIComponent(symbol)}&interval=${timeframe}&hidesidetoolbar=0&hidetoptoolbar=0&symboledit=0&saveimage=1&toolbarbg=0a0a0f&studies=[]&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&hide_side_toolbar=0&allow_symbol_change=0&details=1&calendar=0&hotlist=0&locale=en&width=100%25&height=100%25`;

  return (
    <div
      className={`expand-overlay transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={`relative w-full h-full max-w-[95vw] max-h-[92vh] bg-bg-card border border-border-primary rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Expanded Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-primary bg-bg-secondary/80">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-accent-orange animate-pulse-live" />
            <div>
              <h2 className="text-lg font-bold text-text-primary">{symbol}</h2>
              <p className="text-xs text-text-muted">
                {TIMEFRAME_LABELS[timeframe] || timeframe} Timeframe — Expanded
                View
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-primary border border-border-primary text-text-secondary hover:text-accent-orange hover:border-accent-orange/50 transition-all duration-200 text-sm font-medium cursor-pointer"
            >
              <Minimize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Minimize</span>
            </button>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-bg-primary border border-border-primary text-text-secondary hover:text-accent-red hover:border-accent-red/50 transition-all duration-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded Chart */}
        <div className="w-full h-[calc(100%-70px)]">
          <iframe
            src={widgetUrl}
            className="w-full h-full border-0"
            title={`TradingView Expanded - ${symbol} - ${TIMEFRAME_LABELS[timeframe]}`}
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </div>
    </div>
  );
}
