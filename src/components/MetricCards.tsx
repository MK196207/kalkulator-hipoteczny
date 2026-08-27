import React from 'react';
import { CalculationResult, MortgageInputs } from '../types/mortgage';
import { Tooltip } from './Tooltip';
import { CreditCard, TrendingDown, Percent, Wallet } from 'lucide-react';

interface MetricCardsProps {
  inputs: MortgageInputs;
  result: CalculationResult;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ inputs, result }) => {
  // Formatowanie waluty PLN
  const formatPLN = (val: number) => {
    return val.toLocaleString('pl-PL', { maximumFractionDigits: 0 }) + ' zł';
  };

  // Status dla DTI (Udział w dochodzie)
  const getDtiBadge = (dti: number) => {
    if (inputs.monthlyIncome <= 0) return null;
    if (dti <= 30) {
      return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">Bezpieczny</span>;
    }
    if (dti <= 45) {
      return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">Umiarkowany</span>;
    }
    return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">Wysokie ryzyko</span>;
  };

  // Status dla LTV (Wskaźnik zadłużenia)
  const getLtvBadge = (ltv: number) => {
    if (ltv <= 80) {
      return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">Wkład min. 20%</span>;
    }
    return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">Wymagane ubezpieczenie</span>;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Karta 1: Miesięczna Rata */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider">
            <CreditCard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Miesięczna rata</span>
          </div>
          <Tooltip 
            align="right"
            title="Miesięczna rata kredytu" 
            content="Kwota, którą co miesiąc przekazujesz do banku. Składa się z części kapitałowej (spłata właściwego długu) oraz części odsetkowej (wynagrodzenie banku)."
          />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {formatPLN(result.firstMonthlyPayment)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {inputs.installmentType === 'decreasing' ? (
              <span>Rata maleje do <strong>{formatPLN(result.lastMonthlyPayment)}</strong></span>
            ) : (
              <span>Stała kwota w całym okresie</span>
            )}
          </div>
        </div>
      </div>

      {/* Karta 2: Koszt Odsetek */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider">
            <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Koszt odsetek</span>
          </div>
          <Tooltip 
            align="right"
            title="Całkowity koszt odsetek" 
            content="Suma wszystkich odsetek, które oddasz bankowi ponad pożyczoną kwotę. Całkowity koszt kredytu wynosi: kapitał + odsetki."
          />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {formatPLN(result.totalInterest)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Razem do spłaty: <strong>{formatPLN(result.totalRepayment)}</strong>
          </div>
        </div>
      </div>

      {/* Karta 3: Wskaźnik Wkładu (LTV) */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider">
            <Percent className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Wskaźnik wkładu (LTV)</span>
          </div>
          <Tooltip 
            align="right"
            title="Co to jest LTV (Loan-to-Value)?" 
            content="Procentowa relacja kwoty kredytu do wartości nieruchomości. Jeśli mieszkanie kosztuje 500 000 zł, a kredyt to 400 000 zł, LTV wynosi 80% (masz 20% wkładu własnego). Im niższy wskaźnik, tym tańsza oferta banku."
          />
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {result.ltv.toFixed(1)}%
            </div>
            {getLtvBadge(result.ltv)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Kwota kredytu: <strong>{formatPLN(result.loanAmount)}</strong>
          </div>
        </div>
      </div>

      {/* Karta 4: Udział Raty w Dochodzie (DTI) */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider">
            <Wallet className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Rata vs Dochód (DTI)</span>
          </div>
          <Tooltip 
            align="right"
            title="Co to jest DTI (Debt-to-Income)?" 
            content="Wskaźnik mówiący, jaką część Twojego miesięcznego dochodu na rękę pochłonie rata kredytu. Banki zalecają, aby wskaźnik ten nie przekraczał 35-40%, co chroni Cię przed problemami finansowymi przy ewentualnym wzroście stóp procentowych."
          />
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {inputs.monthlyIncome > 0 ? `${result.dti.toFixed(1)}%` : 'Brak danych'}
            </div>
            {getDtiBadge(result.dti)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {inputs.monthlyIncome > 0 ? (
              <span>Z dochodu: <strong>{formatPLN(inputs.monthlyIncome)}</strong></span>
            ) : (
              <span>Wpisz dochód w formularzu poniżej</span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
