import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Market Overview | Multi-Timeframe Analysis Dashboard",
  description:
    "Professional multi-timeframe analysis dashboard for monitoring financial markets. Track stocks, crypto, forex, gold, and silver across 6 timeframes simultaneously.",
  keywords: [
    "trading",
    "market overview",
    "multi-timeframe analysis",
    "TradingView",
    "crypto",
    "forex",
    "stocks",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg-primary text-text-primary font-sans flex min-h-screen overflow-hidden transition-colors duration-300">
        <AppProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative">
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
