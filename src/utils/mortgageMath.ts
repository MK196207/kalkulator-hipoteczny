import { MortgageInputs, CalculationResult, OverpaymentResult, AmortizationPoint } from '../types/mortgage';

/**
 * Oblicza pełny wynik kalkulacji kredytu hipotecznego z harmonogramem
 * uwzględniającym comiesięczną nadpłatę oraz rozgraniczenie kapitału i odsetek.
 */
export function calculateMortgage(inputs: MortgageInputs): CalculationResult {
  const loanAmount = Math.max(0, inputs.propertyValue - inputs.downPayment);
  const totalMonths = Math.max(1, inputs.loanTermYears * 12);
  const annualRate = Math.max(0, inputs.interestRate);
  const monthlyRate = annualRate / 100 / 12;
  const overpayment = Math.max(0, inputs.monthlyOverpayment || 0);

  if (loanAmount === 0) {
    return {
      loanAmount: 0,
      firstMonthlyPayment: 0,
      lastMonthlyPayment: 0,
      totalRepayment: 0,
      totalInterest: 0,
      actualMonths: 0,
      actualYears: 0,
      ltv: 0,
      dti: 0,
      schedule: []
    };
  }

  const schedule: AmortizationPoint[] = [];
  let totalInterest = 0;
  let remainingPrincipal = loanAmount;
  let cumulativePrincipal = 0;
  let cumulativeInterest = 0;

  // Obliczenie pierwszej bazowej raty
  let firstMonthlyPayment = 0;
  let lastMonthlyPayment = 0;

  if (inputs.installmentType === 'equal') {
    if (monthlyRate === 0) {
      firstMonthlyPayment = loanAmount / totalMonths;
    } else {
      const factor = Math.pow(1 + monthlyRate, totalMonths);
      firstMonthlyPayment = loanAmount * (monthlyRate * factor) / (factor - 1);
    }
    lastMonthlyPayment = firstMonthlyPayment;
  } else {
    const principalPerMonth = loanAmount / totalMonths;
    firstMonthlyPayment = principalPerMonth + (loanAmount * monthlyRate);
    lastMonthlyPayment = principalPerMonth + (principalPerMonth * monthlyRate);
  }

  // Symulacja miesiąc po miesiącu
  let month = 0;
  let currentYear = 1;
  let yearPrincipal = 0;
  let yearInterest = 0;
  const baseMonthlyPayment = firstMonthlyPayment;
  const principalPerMonthDecreasing = loanAmount / totalMonths;

  while (remainingPrincipal > 0 && month < totalMonths * 2) {
    month++;
    const interestPart = remainingPrincipal * monthlyRate;
    let principalPart = 0;

    if (inputs.installmentType === 'equal') {
      if (monthlyRate === 0) {
        principalPart = (loanAmount / totalMonths) + overpayment;
      } else {
        principalPart = (baseMonthlyPayment - interestPart) + overpayment;
      }
    } else {
      principalPart = principalPerMonthDecreasing + overpayment;
    }

    if (principalPart > remainingPrincipal) {
      principalPart = remainingPrincipal;
    }

    remainingPrincipal = Math.max(0, remainingPrincipal - principalPart);
    totalInterest += interestPart;
    cumulativePrincipal += principalPart;
    cumulativeInterest += interestPart;
    yearPrincipal += principalPart;
    yearInterest += interestPart;

    // Zapis punktu rocznego w harmonogramie
    if (month % 12 === 0 || remainingPrincipal <= 0) {
      schedule.push({
        year: currentYear,
        month,
        installment: Math.round((principalPart + interestPart) * 100) / 100,
        principalPayment: Math.round(principalPart * 100) / 100,
        interestPayment: Math.round(interestPart * 100) / 100,
        remainingBalance: Math.round(remainingPrincipal * 100) / 100,
        annualPrincipal: Math.round(yearPrincipal * 100) / 100,
        annualInterest: Math.round(yearInterest * 100) / 100,
        cumulativePrincipal: Math.round(cumulativePrincipal * 100) / 100,
        cumulativeInterest: Math.round(cumulativeInterest * 100) / 100,
      });

      currentYear++;
      yearPrincipal = 0;
      yearInterest = 0;
    }

    if (remainingPrincipal <= 0) break;
  }

  const ltv = inputs.propertyValue > 0 ? (loanAmount / inputs.propertyValue) * 100 : 0;
  const dti = inputs.monthlyIncome > 0 ? (firstMonthlyPayment / inputs.monthlyIncome) * 100 : 0;

  return {
    loanAmount,
    firstMonthlyPayment: Math.round(firstMonthlyPayment * 100) / 100,
    lastMonthlyPayment: Math.round(lastMonthlyPayment * 100) / 100,
    totalRepayment: Math.round((loanAmount + totalInterest) * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    actualMonths: month,
    actualYears: Math.round((month / 12) * 10) / 10,
    ltv: Math.round(ltv * 10) / 10,
    dti: Math.round(dti * 10) / 10,
    schedule
  };
}

/**
 * Oblicza korzyści z nadpłaty kredytu z uwzględnieniem ewentualnych prowizji i kar bankowych
 */
export function calculateOverpayment(inputs: MortgageInputs): OverpaymentResult {
  const loanAmount = Math.max(0, inputs.propertyValue - inputs.downPayment);
  const totalMonths = Math.max(1, inputs.loanTermYears * 12);
  const overpayment = Math.max(0, inputs.monthlyOverpayment || 0);
  const feePercent = Math.max(0, inputs.overpaymentFeePercent || 0);
  const feeMonths = Math.max(0, inputs.overpaymentFeeDurationMonths ?? 36);

  // Bazowa kalkulacja bez nadpłaty
  const baseCalc = calculateMortgage({ ...inputs, monthlyOverpayment: 0 });
  const originalInterest = baseCalc.totalInterest;

  if (loanAmount === 0 || overpayment === 0) {
    return {
      newTotalInterest: originalInterest,
      interestSavings: 0,
      overpaymentFeesPaid: 0,
      netSavings: 0,
      originalMonths: totalMonths,
      newMonths: totalMonths,
      monthsSaved: 0,
      yearsSaved: 0
    };
  }

  // Kalkulacja z nadpłatą
  const overpaidCalc = calculateMortgage(inputs);
  const monthsSaved = Math.max(0, totalMonths - overpaidCalc.actualMonths);
  const interestSavings = Math.max(0, originalInterest - overpaidCalc.totalInterest);

  // Obliczenie sumy prowizji za wcześniejszą spłatę (jeśli występują w pierwszych X miesiącach)
  let overpaymentFeesPaid = 0;
  if (feePercent > 0) {
    const applicableMonths = Math.min(feeMonths, overpaidCalc.actualMonths);
    overpaymentFeesPaid = applicableMonths * overpayment * (feePercent / 100);
  }

  const netSavings = Math.max(0, interestSavings - overpaymentFeesPaid);

  return {
    newTotalInterest: overpaidCalc.totalInterest,
    interestSavings: Math.round(interestSavings * 100) / 100,
    overpaymentFeesPaid: Math.round(overpaymentFeesPaid * 100) / 100,
    netSavings: Math.round(netSavings * 100) / 100,
    originalMonths: totalMonths,
    newMonths: overpaidCalc.actualMonths,
    monthsSaved,
    yearsSaved: Math.round((monthsSaved / 12) * 10) / 10
  };
}

/**
 * Oblicza wpływ zmiany stopy procentowej (symulacja wzrostu stóp)
 */
export function calculateRateChange(inputs: MortgageInputs, rateDelta: number): {
  newRate: number;
  newPayment: number;
  paymentDelta: number;
  newDti: number;
} {
  const newRate = Math.max(0, inputs.interestRate + rateDelta);
  const simulatedInputs = { ...inputs, interestRate: newRate, monthlyOverpayment: 0 };
  const baseResult = calculateMortgage({ ...inputs, monthlyOverpayment: 0 });
  const newResult = calculateMortgage(simulatedInputs);

  const paymentDelta = newResult.firstMonthlyPayment - baseResult.firstMonthlyPayment;

  return {
    newRate: Math.round(newRate * 100) / 100,
    newPayment: newResult.firstMonthlyPayment,
    paymentDelta: Math.round(paymentDelta * 100) / 100,
    newDti: newResult.dti
  };
}
