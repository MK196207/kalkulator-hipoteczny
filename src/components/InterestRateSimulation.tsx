import React from 'react';
import { MortgageInputs } from '../types/mortgage';
import { calculateRateChange } from '../utils/mortgageMath';
import { Tooltip } from './Tooltip';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface InterestRateSimulationProps {
  inputs: MortgageInputs;
}

export const InterestRateSimulation: React.FC<InterestRateSimulationProps> = ({ inputs }) => {
  const deltas = [1.0, 2.0, 4.0];

  const formatPLN = (val: number) => {
    return val.toLocaleString('pl-PL', { maximumFractionDigits: 0 }) + ' zł';
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Symulacja Wzrostu Stóp Procentowych
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sprawdź, jak wzrośnie Twoja rata, jeśli stopy rynkowe pójdą w górę
            </p>
          </div>
        </div>
        <Tooltip 
          align="right"
          title="Dlaczego warto sprawdzić wzrost stóp?" 
          content="Przy kredycie ze zmiennym oprocentowaniem decyzje Rady Polityki Pieniężnej o podwyżce stóp bezpośrednio zwiększają Twoją miesięczną ratę. Zawsze warto sprawdzić, czy Twój budżet udźwignie podwyżkę o 2-4 punkty procentowe."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {deltas.map((delta) => {
          const sim = calculateRateChange(inputs, delta);
          return (
            <div 
              key={delta}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  Wzrost o +{delta.toFixed(1)}%
                </span>
                <span className="text-xs text-slate-500">
                  (do {sim.newRate.toFixed(2)}%)
                </span>
              </div>

              <div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {formatPLN(sim.newPayment)} <span className="text-xs font-normal text-slate-400">/ msc</span>
                </div>
                <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-0.5">
                  +{formatPLN(sim.paymentDelta)} więcej co miesiąc
                </div>
              </div>

              {inputs.monthlyIncome > 0 && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span>Udział w dochodzie:</span>
                  <span className={`font-bold ${sim.newDti > 45 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {sim.newDti.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <span>
          Wskazówka: Jeśli przy podwyżce o +2% rata przekracza 50% Twoich dochodów, warto rozważyć kredyt z okresowo stałym oprocentowaniem (zazwyczaj na okres 5 lat).
        </span>
      </div>
    </div>
  );
};
