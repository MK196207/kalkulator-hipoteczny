import React from 'react';
import { MortgageInputs } from '../types/mortgage';
import { Tooltip } from './Tooltip';
import { Home, ShieldCheck, Calendar, Percent, Banknote } from 'lucide-react';

interface InputDashboardProps {
  inputs: MortgageInputs;
  onChange: (inputs: MortgageInputs) => void;
}

export const InputDashboard: React.FC<InputDashboardProps> = ({ inputs, onChange }) => {
  // Pomocnik do formatowania tysięcy (np. 1 000 000)
  const formatThousands = (val: number | string) => {
    if (val === '' || val === undefined || isNaN(Number(val))) return '';
    return Number(val).toLocaleString('pl-PL');
  };

  // Pomocnik do parsowania sformatowanego tekstu na liczbę
  const parseThousands = (str: string) => {
    const cleaned = str.replace(/\s+/g, '').replace(/,/g, '.');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  const handleDownPaymentPLNChange = (val: number) => {
    onChange({ ...inputs, downPayment: Math.min(val, inputs.propertyValue) });
  };

  const handleDownPaymentPercentChange = (pct: number) => {
    const pln = Math.round((inputs.propertyValue * pct) / 100);
    onChange({ ...inputs, downPayment: pln });
  };

  const downPaymentPercent = inputs.propertyValue > 0 
    ? Math.round((inputs.downPayment / inputs.propertyValue) * 100) 
    : 0;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Parametry Kredytu
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Wpisz kwoty lub użyj suwaków
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Wartość nieruchomości (do 10 mln zł) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-300">
            <label className="flex items-center gap-1.5" htmlFor="propertyValue">
              <Home className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Wartość nieruchomości</span>
            </label>
            <div className="flex items-center gap-1">
              <input
                id="propertyValue"
                type="text"
                value={formatThousands(inputs.propertyValue)}
                onChange={(e) => {
                  const val = Math.max(0, Math.min(20000000, parseThousands(e.target.value)));
                  const newDown = Math.min(inputs.downPayment, val);
                  onChange({ ...inputs, propertyValue: val, downPayment: newDown });
                }}
                className="w-36 px-2.5 py-1 text-right text-sm font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-xs text-slate-500">zł</span>
            </div>
          </div>
          <input
            type="range"
            min="100000"
            max="10000000"
            step="25000"
            value={Math.min(10000000, inputs.propertyValue)}
            onChange={(e) => {
              const val = Number(e.target.value);
              const newDown = Math.min(inputs.downPayment, val);
              onChange({ ...inputs, propertyValue: val, downPayment: newDown });
            }}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>100 tys. zł</span>
            <span>2.5 mln zł</span>
            <span>5 mln zł</span>
            <span>10 mln zł</span>
          </div>
        </div>

        {/* 2. Wkład własny */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <label htmlFor="downPayment">Wkład własny</label>
              <Tooltip 
                title="Wkład własny" 
                content="Gotówka, którą przeznaczasz na zakup mieszkania. Standardem w polskich bankach jest minimum 10% lub 20% wartości nieruchomości."
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="downPayment"
                type="text"
                value={formatThousands(inputs.downPayment)}
                onChange={(e) => handleDownPaymentPLNChange(parseThousands(e.target.value))}
                className="w-32 px-2 py-1 text-right text-sm font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-xs text-slate-500">zł ({downPaymentPercent}%)</span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max={inputs.propertyValue}
            step="10000"
            value={inputs.downPayment}
            onChange={(e) => handleDownPaymentPLNChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex gap-2 pt-1">
            {[10, 20, 30, 40, 50].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => handleDownPaymentPercentChange(pct)}
                className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                  downPaymentPercent === pct 
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        {/* 3. Okres kredytowania */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-300">
            <label className="flex items-center gap-1.5" htmlFor="loanTerm">
              <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Okres kredytowania</span>
            </label>
            <div className="flex items-center gap-1">
              <input
                id="loanTerm"
                type="number"
                min="1"
                max="35"
                value={inputs.loanTermYears}
                onChange={(e) => onChange({ ...inputs, loanTermYears: Math.min(35, Math.max(1, Number(e.target.value))) })}
                className="w-20 px-2.5 py-1 text-right text-sm font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-xs text-slate-500">lat</span>
            </div>
          </div>
          <input
            type="range"
            min="5"
            max="35"
            step="1"
            value={inputs.loanTermYears}
            onChange={(e) => onChange({ ...inputs, loanTermYears: Number(e.target.value) })}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>5 lat</span>
            <span>15 lat</span>
            <span>25 lat</span>
            <span>35 lat</span>
          </div>
        </div>

        {/* 4. Oprocentowanie roczne */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <label htmlFor="interestRate">Oprocentowanie roczne</label>
              <Tooltip 
                title="Oprocentowanie kredytu" 
                content="Całkowite roczne oprocentowanie kredytu (np. WIBOR/WIRON + marża banku lub stała stopa bankowa)."
              />
            </div>
            <div className="flex items-center gap-1">
              <input
                id="interestRate"
                type="number"
                step="0.05"
                min="0"
                max="25"
                value={inputs.interestRate}
                onChange={(e) => onChange({ ...inputs, interestRate: Math.max(0, Number(e.target.value)) })}
                className="w-20 px-2.5 py-1 text-right text-sm font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-xs text-slate-500">%</span>
            </div>
          </div>
          <input
            type="range"
            min="2.0"
            max="15.0"
            step="0.05"
            value={inputs.interestRate}
            onChange={(e) => onChange({ ...inputs, interestRate: Number(e.target.value) })}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>2%</span>
            <span>6.5%</span>
            <span>10%</span>
            <span>15%</span>
          </div>
        </div>

        {/* 5. Dochód miesięczny netto (do 50k zł na suwaku, pole do 200k zł) */}
        <div className="space-y-2 md:col-span-2">
          <div className="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-1.5">
              <Banknote className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <label htmlFor="monthlyIncome">Miesięczny dochód na rękę (gospodarstwa)</label>
              <Tooltip 
                title="Dochód netto gospodarstwa" 
                content="Łączny dochód na rękę wszystkich osób przystępujących do kredytu. Służy do automatycznego wyliczenia wskaźnika DTI (jaką część pensji pochłonie rata)."
              />
            </div>
            <div className="flex items-center gap-1">
              <input
                id="monthlyIncome"
                type="text"
                value={inputs.monthlyIncome ? formatThousands(inputs.monthlyIncome) : ''}
                placeholder="np. 15 000"
                onChange={(e) => onChange({ ...inputs, monthlyIncome: Math.max(0, parseThousands(e.target.value)) })}
                className="w-36 px-2.5 py-1 text-right text-sm font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-xs text-slate-500">zł</span>
            </div>
          </div>
          <input
            type="range"
            min="3000"
            max="50000"
            step="500"
            value={Math.min(50000, inputs.monthlyIncome || 0)}
            onChange={(e) => onChange({ ...inputs, monthlyIncome: Number(e.target.value) })}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>3 000 zł</span>
            <span>15 000 zł</span>
            <span>30 000 zł</span>
            <span>50 000 zł</span>
          </div>
        </div>

      </div>
    </div>
  );
};
