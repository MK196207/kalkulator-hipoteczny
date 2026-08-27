import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem('hipo_cookie_consent');
    if (!consent) {
      // Pokaż po krótkiej chwili, aby nie blokować renderu
      const timer = setTimeout(() => setShowBanner(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('hipo_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('hipo_cookie_consent', 'essential');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              Szanujemy Twoją prywatność
            </h3>
          </div>
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            aria-label="Zamknij"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Strona wykorzystuje pliki cookies w celu zapamiętania preferencji (np. tryb ciemny) oraz wyświetlania spersonalizowanych reklam (Google AdSense). Szczegóły znajdziesz w{' '}
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="text-indigo-600 dark:text-indigo-400 underline font-medium hover:opacity-80"
          >
            Polityce Prywatności
          </button>.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
          >
            Zezwól na wszystkie
          </button>
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="py-2 px-3 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
          >
            Tylko niezbędne
          </button>
        </div>
      </div>
    </div>
  );
};
