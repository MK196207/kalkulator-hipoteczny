import React from 'react';
import { AdvisorAdvice } from '../types/mortgage';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface AdvisorAlertsProps {
  adviceList: AdvisorAdvice[];
}

export const AdvisorAlerts: React.FC<AdvisorAlertsProps> = ({ adviceList }) => {
  if (adviceList.length === 0) return null;

  const getIcon = (level: AdvisorAdvice['level']) => {
    switch (level) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />;
    }
  };

  const getContainerStyle = (level: AdvisorAdvice['level']) => {
    switch (level) {
      case 'success':
        return 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/20';
      case 'warning':
        return 'border-amber-200 bg-amber-50/60 dark:border-amber-900/40 dark:bg-amber-950/20';
      case 'info':
      default:
        return 'border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/40';
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Wskazówki i Rekomendacje
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Spersonalizowane porady na podstawie Twojej kalkulacji
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {adviceList.map((advice) => (
          <div
            key={advice.id}
            className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${getContainerStyle(advice.level)}`}
          >
            {getIcon(advice.level)}
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                {advice.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {advice.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
