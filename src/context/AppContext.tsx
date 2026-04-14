"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "EN" | "TH";
type Theme = "dark" | "light";

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    dashboard: "Dashboard",
    watchlist: "Watchlist",
    analysis: "Analysis",
    news: "News",
    settings: "Settings",
    marketOverview: "IBK Market Overview",
    marketOpen: "Market Open",
    searchPlaceholder: "Search symbol",
    footerText: "© 2026 IBK Market Overview. All rights reserved. Powered by IBigkung",
    active: "Active",
    stock: "Stock",
    gold: "Gold",
    silver: "Silver",
    crypto: "Crypto",
    forex: "Forex"
  },
  TH: {
    dashboard: "หน้าหลัก",
    watchlist: "รายการเฝ้าดู",
    analysis: "วิเคราะห์",
    news: "ข่าวสาร",
    settings: "ตั้งค่า",
    marketOverview: "ภาพรวมตลาด IBK",
    marketOpen: "ตลาดเปิดอยู่",
    searchPlaceholder: "ค้นหาสัญลักษณ์ เช่น BTCUSDT",
    footerText: "© 2026 IBK ภาพรวมตลาด สงวนลิขสิทธิ์ พัฒนาโดย IBigkung",
    active: "เปิดทำงาน",
    stock: "หุ้น",
    gold: "ทองคำ",
    silver: "เงิน",
    crypto: "คริปโต",
    forex: "ฟอเร็กซ์"
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguage] = useState<Language>("EN");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === "EN" ? "TH" : "EN");
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, language, toggleLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
