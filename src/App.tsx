import { useState, useMemo, useEffect } from 'react';
import { MortgageInputs, InstallmentType, InterestType } from './types/mortgage';
import { calculateMortgage, calculateOverpayment } from './utils/mortgageMath';
import { generateAdvisorAdvice } from './utils/advisorLogic';

import { Navbar } from './components/Navbar';
import { MetricCards } from './components/MetricCards';
import { InputDashboard } from './components/InputDashboard';
import { ComparisonToggle } from './components/ComparisonToggle';
import { OverpaymentSim } from './components/OverpaymentSim';
import { InterestRateSimulation } from './components/InterestRateSimulation';
import { AmortizationChart } from './components/AmortizationChart';
import { AdvisorAlerts } from './components/AdvisorAlerts';
import { AdSlot } from './components/AdSlot';
import { CookieBanner } from './components/CookieBanner';
import { PrivacyModal } from './components/PrivacyModal';
import { Footer } from './components/Footer';

const INITIAL_INPUTS: MortgageInputs = {
  propertyValue: 550000,
  downPayment: 110000,
  loanTermYears: 25,
  interestRate: 7.25,
  monthlyIncome: 9500,
  installmentType: 'equal',
  interestType: 'variable',
  monthlyOverpayment: 0,
  overpaymentFeePercent: 0,
  overpaymentFeeDurationMonths: 36,
};

export function App() {
  // Motyw ciemny / jasny z pamięcią w localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('hipo_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Stan modala polityki prywatności
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('hipo_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('hipo_theme', 'light');
    }
  }, [darkMode]);

  // Główny stan parametrów kredytu
  const [inputs, setInputs] = useState<MortgageInputs>(INITIAL_INPUTS);

  // Natychmiastowe przeliczanie matematyki w pamięci podręcznej (bez opóźnień)
  const calculationResult = useMemo(() => {
    return calculateMortgage(inputs);
  }, [inputs]);

  const overpaymentResult = useMemo(() => {
    return calculateOverpayment(inputs);
  }, [inputs]);

  const adviceList = useMemo(() => {
    return generateAdvisorAdvice(inputs, calculationResult);
  }, [inputs, calculationResult]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Pasek górny */}
      <Navbar 
        darkMode={darkMode} 
        onToggleDarkMode={() => setDarkMode(!darkMode)} 
      />

      {/* Główna zawartość */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Górny slot reklamowy AdSense */}
        <AdSlot format="banner" />

        {/* 4 Główne Kafelki Metryk (Rata, Odsetki, LTV, DTI) */}
        <MetricCards 
          inputs={inputs} 
          result={calculationResult} 
        />

        {/* Sekcja 2 kolumny na desktopie: Formularz + Opcje / Wykres */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Lewa kolumna: Suwaki i wybór wariantów (7 kolumn) */}
          <div className="lg:col-span-7 space-y-6">
            <InputDashboard 
              inputs={inputs} 
              onChange={setInputs} 
            />

            <ComparisonToggle 
              installmentType={inputs.installmentType}
              interestType={inputs.interestType}
              onChangeInstallmentType={(type: InstallmentType) => setInputs({ ...inputs, installmentType: type })}
              onChangeInterestType={(type: InterestType) => setInputs({ ...inputs, interestType: type })}
            />

            <OverpaymentSim 
              inputs={inputs}
              overpaymentResult={overpaymentResult}
              onChangeOverpayment={(amount: number) => setInputs({ ...inputs, monthlyOverpayment: amount })}
              onChangeFee={(feePercent, feeDurationMonths) => setInputs({ ...inputs, overpaymentFeePercent: feePercent, overpaymentFeeDurationMonths: feeDurationMonths })}
            />
          </div>

          {/* Prawa kolumna: Wykres, Symulacja stóp i Wskazówki (5 kolumn) */}
          <div className="lg:col-span-5 space-y-6">
            <AmortizationChart 
              result={calculationResult} 
              monthlyOverpayment={inputs.monthlyOverpayment}
            />

            <InterestRateSimulation 
              inputs={inputs} 
            />

            <AdvisorAlerts 
              adviceList={adviceList} 
            />

            {/* Boczny slot reklamowy */}
            <AdSlot format="rectangle" />
          </div>

        </div>

      </main>

      {/* Stopka z formalną notą prawną */}
      <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {/* Baner cookies i modal polityki */}
      <CookieBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

    </div>
  );
}

export default App;
