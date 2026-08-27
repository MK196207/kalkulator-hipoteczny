import React from 'react';
import { InstallmentType, InterestType } from '../types/mortgage';
import { Tooltip } from './Tooltip';

interface ComparisonToggleProps {
  installmentType: InstallmentType;
  interestType: InterestType;
  onChangeInstallmentType: (type: InstallmentType) => void;
  onChangeInterestType: (type: InterestType) => void;
}

export const ComparisonToggle: React.FC<ComparisonToggleProps> = ({
  installmentType,
  interestType,
  onChangeInstallmentType,
  onChangeInterestType,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* Przełącznik 1: Rodzaj rat */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Wybór rodzaju rat
          </div>
          <Tooltip 
            align="right"
            title="Raty równe vs malejące" 
            content="Raty równe mają taką samą wysokość co miesiąc (wygoda w budżecie). Raty malejące są najwyższe na początku, ale pozwalają zaoszczędzić od kilkunastu do kilkudziesięciu tysięcy złotych na odsetkach w całym okresie kredytu."
          />
        </div>

        <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => onChangeInstallmentType('equal')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              installmentType === 'equal'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Raty równe
          </button>
          <button
            type="button"
            onClick={() => onChangeInstallmentType('decreasing')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              installmentType === 'decreasing'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Raty malejące
          </button>
        </div>
      </div>

      {/* Przełącznik 2: Rodzaj oprocentowania */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Rodzaj oprocentowania
          </div>
          <Tooltip 
            align="right"
            title="Oprocentowanie stałe vs zmienne" 
            content="Oprocentowanie stałe (zazwyczaj na 5 lat) gwarantuje niezmienność raty bez względu na decyzje Rady Polityki Pieniężnej. Oprocentowanie zmienne zmienia się wraz ze stopami rynkowymi (WIBOR/WIRON)."
          />
        </div>

        <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => onChangeInterestType('fixed')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              interestType === 'fixed'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Oprocentowanie stałe
          </button>
          <button
            type="button"
            onClick={() => onChangeInterestType('variable')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              interestType === 'variable'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Oprocentowanie zmienne
          </button>
        </div>
      </div>

    </div>
  );
};
