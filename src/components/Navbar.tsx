import React, { useEffect, useState } from 'react';
import { Sun, Moon, Landmark, ChevronDown } from 'lucide-react';
import { fetchNbpInterestRate, NbpRateResponse } from '../utils/nbpRates';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, onToggleDarkMode }) => {
  const [nbpData, setNbpData] = useState<NbpRateResponse | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchNbpInterestRate().then(data => setNbpData(data));
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo i Nazwa */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            HK
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Kalkulator Hipoteczny
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Analiza kosztów, nadpłat i zdolności
            </p>
          </div>
        </div>

        {/* Prawa strona: Wskaźnik NBP i Przełącznik Motywu */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Informacja o stopie NBP z historią 6 miesięcy */}
          <div 
            className="relative"
            onMouseEnter={() => setShowHistory(true)}
            onMouseLeave={() => setShowHistory(false)}
          >
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <Landmark className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Stopa NBP: <strong className="text-slate-900 dark:text-white">{nbpData ? `${nbpData.currentRate.toFixed(2)}%` : '5.75%'}</strong></span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {/* Menu historii stóp z 6 miesięcy */}
            {showHistory && nbpData && (
              <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 text-xs">
                <div className="font-semibold text-slate-900 dark:text-white mb-2 pb-1.5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span>Historia stopy NBP</span>
                  <span className="text-[10px] font-normal text-slate-500">(ostatnie 6 msc)</span>
                </div>
                <div className="space-y-1.5">
                  {nbpData.history.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 px-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800/60">
                      <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{item.rate.toFixed(2)}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 text-center">
                  Główna stopa referencyjna NBP
                </div>
              </div>
            )}
          </div>

          {/* Przełącznik Dark Mode */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label="Przełącz motyw"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
};
