"use client";

import ChartCard from "./ChartCard";

interface ChartGridProps {
  symbol: string;
  onExpand: (timeframe: string) => void;
}

const TIMEFRAMES = [
  { id: "1", label: "1 Minute", short: "1m", color: "bg-accent-blue" },
  { id: "5", label: "5 Minutes", short: "5m", color: "bg-accent-green" },
  { id: "15", label: "15 Minutes", short: "15m", color: "bg-accent-purple" },
  { id: "60", label: "1 Hour", short: "1H", color: "bg-accent-orange" },
  { id: "240", label: "4 Hours", short: "4H", color: "bg-accent-red" },
  { id: "D", label: "1 Day", short: "1D", color: "bg-accent-gold" },
];

export default function ChartGrid({ symbol, onExpand }: ChartGridProps) {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {TIMEFRAMES.map((tf, index) => (
          <ChartCard
            key={tf.id}
            symbol={symbol}
            timeframe={tf.id}
            label={tf.label}
            shortLabel={tf.short}
            color={tf.color}
            onExpand={() => onExpand(tf.id)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
