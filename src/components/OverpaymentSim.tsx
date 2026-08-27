import React, { useState } from 'react';
import { MortgageInputs, OverpaymentResult } from '../types/mortgage';
import { Tooltip } from './Tooltip';
import { PiggyBank, ArrowDownRight, Clock, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';

interface OverpaymentSimProps {
  inputs: MortgageInputs;
  overpaymentResult: OverpaymentResult;
  onChangeOverpayment: (amount: number) => void;
  onChangeFee: (feePercent: number, feeDurationMonths: number) => void;
}

export const OverpaymentSim: React.FC<OverpaymentSimProps> = ({
  inputs,
  overpaymentResult,
  onChangeOverpayment,
  onChangeFee,
}) => {
  const [showFeeSettings, setShowFeeSettings] = useState(false);

  const formatPLN = (val: number) => {
    return val.toLocaleString('pl-PL', { maximumFractionDigits: 0 }) + ' zł';
  };

  const formatThousands = (val: number | string) => {
    if (val === '' || val === undefined || isNaN(Number(val))) return '';
    return Number(val).toLocaleString('pl-PL');
  };

  const parseThousands = (str: string) => {
    const cleaned = str.replace(/\s+/g, '').replace(/,/g, '.');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      
      {/* Nagłówek symulatora */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Symulator Nadpłat i Wcześniejszej Spłaty
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Oblicz zysk netto z uwzględnieniem zasad i prowizji bankowych
            </p>
          </div>
        </div>
        <Tooltip 
          align="right"
          title="Prawo a prowizje za nadpłatę" 
          content="Zgodnie z polską Ustawą o kredycie hipotecznym, przy kredycie ze zmienną stopą bank może pobierać prowizję za wcześniejszą spłatę (maks. 3%) wyłącznie przez pierwsze 36 miesięcy (3 lata). Po 36 miesiącach każda nadpłata jest w 100% darmowa. W wielu bankach prowizja wynosi 0% od pierwszego dnia."
        />
      </div>

      {/* Suwak comiesięcznej nadpłaty */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-300">
          <label htmlFor="overpaymentSlider">Dodatkowa miesięczna nadpłata</label>
          <div className="flex items-center gap-1">
            <input
              id="overpaymentSlider"
              type="text"
              value={formatThousands(inputs.monthlyOverpayment)}
              onChange={(e) => onChangeOverpayment(Math.max(0, parseThousands(e.target.value)))}
              className="w-32 px-2.5 py-1 text-right text-sm font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-xs text-slate-500">zł / msc</span>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="20000"
          step="100"
          value={inputs.monthlyOverpayment}
          onChange={(e) => onChangeOverpayment(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>0 zł</span>
          <span>5 000 zł</span>
          <span>10 000 zł</span>
          <span>20 000 zł</span>
        </div>
      </div>

      {/* Szybkie przyciski kwot */}
      <div className="flex flex-wrap gap-2">
        {[500, 1000, 2000, 5000, 10000].map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => onChangeOverpayment(amount)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              inputs.monthlyOverpayment === amount
                ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold'
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            +{formatThousands(amount)} zł
          </button>
        ))}
        {inputs.monthlyOverpayment > 0 && (
          <button
            type="button"
            onClick={() => onChangeOverpayment(0)}
            className="text-xs px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-900/50 dark:text-rose-400 dark:hover:bg-rose-950/50 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Opcjonalne ustawienia prowizji / kar bankowych */}
      <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowFeeSettings(!showFeeSettings)}
          className="w-full px-4 py-2.5 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-indigo-500" />
            <span>Prowizja banku za wcześniejszą spłatę: <strong>{inputs.overpaymentFeePercent > 0 ? `${inputs.overpaymentFeePercent}% (przez ${inputs.overpaymentFeeDurationMonths} msc)` : 'Brak (0%)'}</strong></span>
          </div>
          {showFeeSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showFeeSettings && (
          <div className="p-4 bg-white dark:bg-slate-900 space-y-4 text-xs border-t border-slate-100 dark:border-slate-800">
            <p className="text-slate-500 leading-relaxed">
              Zazwyczaj banki nie pobierają prowizji lub pobierają ją tylko przez pierwsze 36 miesięcy (maksymalnie 3% wg ustawy).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="feePercentSelect">
                  Prowizja za nadpłatę (%)
                </label>
                <select
                  id="feePercentSelect"
                  value={inputs.overpaymentFeePercent}
                  onChange={(e) => onChangeFee(Number(e.target.value), inputs.overpaymentFeeDurationMonths)}
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white"
                >
                  <option value={0}>0% (Brak prowizji / darmowa nadpłata)</option>
                  <option value={1}>1.0%</option>
                  <option value={1.5}>1.5%</option>
                  <option value={2}>2.0%</option>
                  <option value={2.5}>2.5%</option>
                  <option value={3}>3.0% (Maksymalna stawka ustawowa)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="feeDurationSelect">
                  Okres pobierania prowizji
                </label>
                <select
                  id="feeDurationSelect"
                  value={inputs.overpaymentFeeDurationMonths}
                  onChange={(e) => onChangeFee(inputs.overpaymentFeePercent, Number(e.target.value))}
                  disabled={inputs.overpaymentFeePercent === 0}
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white disabled:opacity-50"
                >
                  <option value={12}>Przez pierwsze 12 miesięcy (1 rok)</option>
                  <option value={24}>Przez pierwsze 24 miesiące (2 lata)</option>
                  <option value={36}>Przez pierwsze 36 miesięcy (3 lata - standard)</option>
                  <option value={60}>Przez pierwsze 60 miesięcy (5 lat - stała stopa)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Podsumowanie zysków z nadpłaty */}
      {inputs.monthlyOverpayment > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">
              <ArrowDownRight className="w-4 h-4" />
              <span>Zysk Netto z Nadpłat</span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
              {formatPLN(overpaymentResult.netSavings)}
            </div>
            <div className="text-xs text-emerald-800/80 dark:text-emerald-300/80 mt-1">
              {overpaymentResult.overpaymentFeesPaid > 0 ? (
                <span>Oszczędzone odsetki: {formatPLN(overpaymentResult.interestSavings)} (po odliczeniu {formatPLN(overpaymentResult.overpaymentFeesPaid)} prowizji banku)</span>
              ) : (
                <span>Czysta oszczędność na odsetkach (0 zł prowizji)</span>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" />
              <span>Skrócenie czasu spłaty</span>
            </div>
            <div className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-400">
              {overpaymentResult.yearsSaved > 0 
                ? `${overpaymentResult.yearsSaved} lat` 
                : `${overpaymentResult.monthsSaved} msc`}
            </div>
            <div className="text-xs text-indigo-800/80 dark:text-indigo-300/80 mt-1">
              Nowy czas spłaty: {Math.floor(overpaymentResult.newMonths / 12)} lat i {overpaymentResult.newMonths % 12} msc
            </div>
          </div>

        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400">
          Ustaw kwotę nadpłaty powyżej, aby zobaczyć wyliczenie zysku netto.
        </div>
      )}
    </div>
  );
};
