import React, { useState } from 'react';
import { CalculationResult } from '../types/mortgage';
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Tooltip } from './Tooltip';
import { BarChart3, PieChart as PieChartIcon, Layers, Sparkles } from 'lucide-react';

interface AmortizationChartProps {
  result: CalculationResult;
  monthlyOverpayment?: number;
}

export const AmortizationChart: React.FC<AmortizationChartProps> = ({ result, monthlyOverpayment = 0 }) => {
  const [chartMode, setChartMode] = useState<'yearly' | 'timeline' | 'breakdown'>('yearly');

  // Dane do wykresu kołowego
  const pieData = [
    { name: 'Spłacony kapitał', value: result.loanAmount, color: '#4f46e5' }, // indigo-600
    { name: 'Koszt odsetek (bank)', value: result.totalInterest, color: '#f59e0b' }, // amber-500
  ];

  // Formatowanie waluty w tooltipie i osiach
  const formatPLN = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)} mln zł`;
    if (value >= 1000) return `${Math.round(value / 1000)} tys. zł`;
    return `${value} zł`;
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      
      {/* Nagłówek i przełączniki widoków */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Harmonogram: Kapitał vs Odsetki</span>
                {monthlyOverpayment > 0 && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Z nadpłatą
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Rozbicie rocznych wpłat na część kapitałową i odsetkową
              </p>
            </div>
          </div>
        </div>

        {/* Przyciski zmiany widoku */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setChartMode('yearly')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                chartMode === 'yearly'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Roczny</span>
            </button>
            <button
              type="button"
              onClick={() => setChartMode('timeline')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                chartMode === 'timeline'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Saldo długu</span>
            </button>
            <button
              type="button"
              onClick={() => setChartMode('breakdown')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                chartMode === 'breakdown'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <PieChartIcon className="w-3.5 h-3.5" />
              <span>Struktura</span>
            </button>
          </div>

          <Tooltip 
            align="right"
            title="Podział na Kapitał i Odsetki" 
            content="Fioletowy pasek to kapitał (faktyczna spłata mieszkania, która buduje Twój majątek). Pomarańczowy pasek to odsetki (zarobek banku). W pierwszych latach odsetki dominują, ale z każdym kolejnym rokiem udział spłaty kapitału rośnie."
          />
        </div>
      </div>

      {/* Kontener wykresów */}
      <div className="h-72 w-full pt-2">
        {chartMode === 'yearly' ? (
          // 1. Wykres słupkowy z rozgraniczeniem kapitału i odsetek w każdym roku
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={result.schedule}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis 
                dataKey="year" 
                tickFormatter={(year) => `${year} r.`}
                tick={{ fontSize: 11, fill: '#888' }}
              />
              <YAxis 
                tickFormatter={formatPLN}
                tick={{ fontSize: 11, fill: '#888' }}
                width={75}
              />
              <RechartsTooltip 
                formatter={(value: number, name: string) => {
                  const label = name === 'annualPrincipal' ? 'Spłata kapitału w roku' : 'Odsetki dla banku w roku';
                  return [`${value.toLocaleString('pl-PL')} zł`, label];
                }}
                labelFormatter={(label) => `Rok ${label}`}
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Legend 
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
                formatter={(value) => value === 'annualPrincipal' ? 'Kapitał (Twoja własność)' : 'Odsetki (koszt banku)'}
              />
              <Bar dataKey="annualPrincipal" name="annualPrincipal" stackId="a" fill="#4f46e5" radius={[0, 0, 0, 0]} />
              <Bar dataKey="annualInterest" name="annualInterest" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : chartMode === 'timeline' ? (
          // 2. Wykres warstwowy salda długu
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={result.schedule}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis 
                dataKey="year" 
                tickFormatter={(year) => `${year} r.`}
                tick={{ fontSize: 11, fill: '#888' }}
              />
              <YAxis 
                tickFormatter={formatPLN}
                tick={{ fontSize: 11, fill: '#888' }}
                width={75}
              />
              <RechartsTooltip 
                formatter={(value: number) => [`${value.toLocaleString('pl-PL')} zł`, 'Pozostały dług']}
                labelFormatter={(label) => `Koniec roku ${label}`}
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="remainingBalance" 
                stroke="#10b981" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorBalance)" 
                name="Pozostały kapitał"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          // 3. Wykres kołowy (struktura)
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value: number) => [`${value.toLocaleString('pl-PL')} zł`, 'Wartość']}
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-xs text-slate-700 dark:text-slate-300">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Pasek statusu pod wykresem */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
            <span>Kapitał: <strong>{formatPLN(result.loanAmount)}</strong></span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Odsetki: <strong>{formatPLN(result.totalInterest)}</strong></span>
          </span>
        </div>
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          Rzeczywisty czas spłaty: {result.actualYears} lat ({result.actualMonths} msc)
        </span>
      </div>

    </div>
  );
};
