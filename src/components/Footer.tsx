import React from 'react';

interface FooterProps {
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Nota prawna bez żadnych emotek */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <strong className="text-slate-700 dark:text-slate-300 block mb-1">
            Nota prawna i zastrzeżenia
          </strong>
          Przedstawione kalkulacje mają charakter wyłącznie informacyjny oraz edukacyjny i nie stanowią oferty handlowej w rozumieniu art. 66 § 1 Kodeksu Cywilnego. Rzeczywiste warunki kredytowania, wysokość marży, prowizji oraz ostateczna zdolność kredytowa ustalane są indywidualnie przez poszczególne instytucje bankowe na podstawie weryfikacji dochodów, historii w BIK i scoringu wnioskodawcy.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 dark:text-slate-500 pt-2">
          <div>
            &copy; {new Date().getFullYear()} Kalkulator Hipoteczny. Wszelkie prawa zastrzeżone.
          </div>
          <div className="flex gap-4">
            <button 
              type="button" 
              onClick={onOpenPrivacy} 
              className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors underline"
            >
              Polityka prywatności i cookies
            </button>
            <button 
              type="button" 
              onClick={onOpenPrivacy} 
              className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors underline"
            >
              Regulamin serwisu
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
