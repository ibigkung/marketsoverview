"use client";

import { useAppContext } from "@/context/AppContext";

export default function Footer() {
  const { t } = useAppContext();

  return (
    <footer className="w-full py-5 px-6 border-t border-border-primary/40 bg-bg-primary mt-auto">
      <div className="max-w-[1920px] mx-auto flex items-center justify-center">
        <p className="text-center text-xs sm:text-sm text-text-muted/80 font-medium whitespace-pre-line">
          {t('footerText')}
        </p>
      </div>
    </footer>
  );
}
