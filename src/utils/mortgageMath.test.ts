import { describe, it, expect } from 'vitest';
import { calculateMortgage, calculateOverpayment, calculateRateChange } from './mortgageMath';
import { MortgageInputs } from '../types/mortgage';

describe('20 Kompleksowych Scenariuszy Testowych (Zgodność z Wiedzą Bankową)', () => {

  // Scenariusz 1: Singiel w kawalerce (Kredyt 200 000 zł, 25 lat, 7.5%)
  it('Scenariusz 1: Singiel - kawalerka 250k zł, 20% wkład, 25 lat, 7.5%', () => {
    const inputs: MortgageInputs = {
      propertyValue: 250000,
      downPayment: 50000,
      loanTermYears: 25,
      interestRate: 7.5,
      monthlyIncome: 6000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const res = calculateMortgage(inputs);
    expect(res.loanAmount).toBe(200000);
    expect(res.firstMonthlyPayment).toBeCloseTo(1478.00, 1);
    expect(res.ltv).toBe(80);
    expect(res.dti).toBeCloseTo(24.6, 0.5);
  });

  // Scenariusz 2: Małżeństwo - mieszkanie 500k zł, 30 lat, 7.0%, dochód 9k zł
  it('Scenariusz 2: Rodzina 2+1 - 500k zł, 100k wkład, 30 lat, 7.0%', () => {
    const inputs: MortgageInputs = {
      propertyValue: 500000,
      downPayment: 100000,
      loanTermYears: 30,
      interestRate: 7.0,
      monthlyIncome: 9000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const res = calculateMortgage(inputs);
    expect(res.loanAmount).toBe(400000);
    expect(res.firstMonthlyPayment).toBeCloseTo(2661.21, 1);
    expect(res.dti).toBeCloseTo(29.6, 0.5);
  });

  // Scenariusz 3: Duże mieszkanie Warszawa (Kredyt 800 000 zł, 25 lat, 6.8%)
  it('Scenariusz 3: Apartament - 1 mln zł, 200k wkład, 25 lat, 6.8%', () => {
    const inputs: MortgageInputs = {
      propertyValue: 1000000,
      downPayment: 200000,
      loanTermYears: 25,
      interestRate: 6.8,
      monthlyIncome: 18000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const res = calculateMortgage(inputs);
    expect(res.loanAmount).toBe(800000);
    expect(res.firstMonthlyPayment).toBeCloseTo(5552.58, 1);
    expect(res.ltv).toBe(80);
  });

  // Scenariusz 4: Minimalny wkład własny 10% (LTV 90%)
  it('Scenariusz 4: Niski wkład 10% - 400k zł, 40k wkład, 30 lat, 7.8%', () => {
    const inputs: MortgageInputs = {
      propertyValue: 400000,
      downPayment: 40000,
      loanTermYears: 30,
      interestRate: 7.8,
      monthlyIncome: 8500,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const res = calculateMortgage(inputs);
    expect(res.loanAmount).toBe(360000);
    expect(res.ltv).toBe(90);
  });

  // Scenariusz 5: Bardzo wysoki wkład własny 50% (LTV 50%)
  it('Scenariusz 5: Wysoki wkład 50% - 600k zł, 300k wkład, 20 lat, 6.5%', () => {
    const inputs: MortgageInputs = {
      propertyValue: 600000,
      downPayment: 300000,
      loanTermYears: 20,
      interestRate: 6.5,
      monthlyIncome: 10000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const res = calculateMortgage(inputs);
    expect(res.loanAmount).toBe(300000);
    expect(res.ltv).toBe(50);
    expect(res.firstMonthlyPayment).toBeCloseTo(2236.72, 1);
  });

  // Scenariusz 6: Krótki okres kredytowania 10 lat
  it('Scenariusz 6: Szybka spłata 10 lat - 250k zł kredytu, 6.0%', () => {
    const inputs: MortgageInputs = {
      propertyValue: 350000,
      downPayment: 100000,
      loanTermYears: 10,
      interestRate: 6.0,
      monthlyIncome: 9000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const res = calculateMortgage(inputs);
    expect(res.firstMonthlyPayment).toBeCloseTo(2775.51, 1);
    expect(res.totalInterest).toBeLessThan(90000);
  });

  // Scenariusz 7: Maksymalny okres 35 lat
  it('Scenariusz 7: Długi okres 35 lat - 500k zł kredytu, 7.2%', () => {
    const inputs: MortgageInputs = {
      propertyValue: 600000,
      downPayment: 100000,
      loanTermYears: 35,
      interestRate: 7.2,
      monthlyIncome: 11000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const res = calculateMortgage(inputs);
    expect(res.firstMonthlyPayment).toBeCloseTo(3264.66, 1);
    expect(res.totalInterest).toBeGreaterThan(res.loanAmount);
  });

  // Scenariusz 8: Raty malejące - weryfikacja pierwszej i ostatniej raty
  it('Scenariusz 8: Raty malejące - 360k zł, 30 lat (360 msc), 6.0%', () => {
    const inputs: MortgageInputs = {
      propertyValue: 400000,
      downPayment: 40000,
      loanTermYears: 30,
      interestRate: 6.0,
      monthlyIncome: 9000,
      installmentType: 'decreasing',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const res = calculateMortgage(inputs);
    expect(res.firstMonthlyPayment).toBeCloseTo(2800, 1);
    expect(res.lastMonthlyPayment).toBeCloseTo(1005, 1);
  });

  // Scenariusz 9: Porównanie odsetek: równe vs malejące
  it('Scenariusz 9: Raty malejące generują mniejszy łączny koszt odsetek niż równe', () => {
    const base: MortgageInputs = {
      propertyValue: 500000,
      downPayment: 100000,
      loanTermYears: 25,
      interestRate: 7.0,
      monthlyIncome: 10000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const resEqual = calculateMortgage(base);
    const resDec = calculateMortgage({ ...base, installmentType: 'decreasing' });

    expect(resDec.totalInterest).toBeLessThan(resEqual.totalInterest);
    expect(resEqual.totalInterest - resDec.totalInterest).toBeGreaterThan(90000);
  });

  // Scenariusz 10: Umiarkowana comiesięczna nadpłata (+300 zł)
  it('Scenariusz 10: Nadpłata 300 zł/msc przy kredycie 300k zł, 25 lat, 7.0%', () => {
    const inputs: MortgageInputs = {
      propertyValue: 400000,
      downPayment: 100000,
      loanTermYears: 25,
      interestRate: 7.0,
      monthlyIncome: 8000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 300,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const overpayment = calculateOverpayment(inputs);
    expect(overpayment.yearsSaved).toBeGreaterThanOrEqual(4.0);
    expect(overpayment.interestSavings).toBeGreaterThan(60000);
    expect(overpayment.netSavings).toBe(overpayment.interestSavings);
  });

  // Scenariusz 11: Duża comiesięczna nadpłata (+1500 zł)
  it('Scenariusz 11: Agresywna nadpłata 1500 zł/msc - skrócenie okresu o ponad połowę', () => {
    const inputs: MortgageInputs = {
      propertyValue: 600000,
      downPayment: 100000,
      loanTermYears: 30,
      interestRate: 7.0,
      monthlyIncome: 15000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 1500,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const overpayment = calculateOverpayment(inputs);
    expect(overpayment.yearsSaved).toBeGreaterThanOrEqual(15.0);
    expect(overpayment.interestSavings).toBeGreaterThan(300000);
  });

  // Scenariusz 12: Nadpłata z prowizją banku (2.0% przez pierwsze 36 miesięcy wg umowy)
  it('Scenariusz 12: Nadpłata z prowizją 2% przez 36 msc - weryfikacja zysku netto', () => {
    const inputs: MortgageInputs = {
      propertyValue: 500000,
      downPayment: 100000,
      loanTermYears: 25,
      interestRate: 6.5,
      monthlyIncome: 10000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 500,
      overpaymentFeePercent: 2.0, // 2% prowizji od każdej nadpłaty
      overpaymentFeeDurationMonths: 36, // Przez 36 miesięcy: 36 * 500 * 0.02 = 360 zł
    };
    const overpayment = calculateOverpayment(inputs);
    expect(overpayment.overpaymentFeesPaid).toBe(360);
    expect(overpayment.netSavings).toBe(overpayment.interestSavings - 360);
    expect(overpayment.netSavings).toBeGreaterThan(80000);
  });

  // Scenariusz 13: Oprocentowanie 0% (Dopłata państwowa 100%)
  it('Scenariusz 13: Kredyt 0% (rata = kapitał / miesiące, odsetki = 0)', () => {
    const inputs: MortgageInputs = {
      propertyValue: 300000,
      downPayment: 60000,
      loanTermYears: 20,
      interestRate: 0,
      monthlyIncome: 8000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const res = calculateMortgage(inputs);
    expect(res.firstMonthlyPayment).toBe(1000);
    expect(res.totalInterest).toBe(0);
    expect(res.totalRepayment).toBe(240000);
  });

  // Scenariusz 14: Skrajnie wysokie stopy 12% (Kryzys / wysoka inflacja)
  it('Scenariusz 14: Wysokie oprocentowanie 12% - kalkulacja nie rzuca błędów', () => {
    const inputs: MortgageInputs = {
      propertyValue: 400000,
      downPayment: 100000,
      loanTermYears: 25,
      interestRate: 12.0,
      monthlyIncome: 12000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const res = calculateMortgage(inputs);
    expect(res.firstMonthlyPayment).toBeCloseTo(3159.67, 1);
    expect(res.totalInterest).toBeGreaterThan(600000);
  });

  // Scenariusz 15: Niskie stopy 2.5% (Tani pieniądz)
  it('Scenariusz 15: Niskie oprocentowanie 2.5% - mały koszt odsetek', () => {
    const inputs: MortgageInputs = {
      propertyValue: 500000,
      downPayment: 100000,
      loanTermYears: 20,
      interestRate: 2.5,
      monthlyIncome: 9000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const res = calculateMortgage(inputs);
    expect(res.firstMonthlyPayment).toBeCloseTo(2119.61, 1);
  });

  // Scenariusz 16: Symulacja wzrostu stóp o +1.0%
  it('Scenariusz 16: Symulacja wzrostu stóp o +1.0%', () => {
    const inputs: MortgageInputs = {
      propertyValue: 500000,
      downPayment: 100000,
      loanTermYears: 25,
      interestRate: 7.0,
      monthlyIncome: 9000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const sim = calculateRateChange(inputs, 1.0);
    expect(sim.newRate).toBe(8.0);
    expect(sim.paymentDelta).toBeGreaterThan(250);
  });

  // Scenariusz 17: Symulacja wzrostu stóp o +4.0%
  it('Scenariusz 17: Symulacja wzrostu stóp o +4.0%', () => {
    const inputs: MortgageInputs = {
      propertyValue: 500000,
      downPayment: 100000,
      loanTermYears: 25,
      interestRate: 6.0,
      monthlyIncome: 9000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const sim = calculateRateChange(inputs, 4.0);
    expect(sim.newRate).toBe(10.0);
    expect(sim.paymentDelta).toBeGreaterThan(1000);
  });

  // Scenariusz 18: Dochód 0 zł (Brak danych o dochodzie)
  it('Scenariusz 18: Dochód 0 zł -> DTI = 0 bez błędu NaN / Infinity', () => {
    const inputs: MortgageInputs = {
      propertyValue: 400000,
      downPayment: 80000,
      loanTermYears: 25,
      interestRate: 7.0,
      monthlyIncome: 0,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const res = calculateMortgage(inputs);
    expect(res.dti).toBe(0);
    expect(Number.isNaN(res.dti)).toBe(false);
  });

  // Scenariusz 19: Zakup w 100% za gotówkę (Wkład = Wartość)
  it('Scenariusz 19: 100% wkład własny -> kredyt = 0, rata = 0', () => {
    const inputs: MortgageInputs = {
      propertyValue: 500000,
      downPayment: 500000,
      loanTermYears: 25,
      interestRate: 7.0,
      monthlyIncome: 10000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const res = calculateMortgage(inputs);
    expect(res.loanAmount).toBe(0);
    expect(res.firstMonthlyPayment).toBe(0);
    expect(res.totalInterest).toBe(0);
    expect(res.ltv).toBe(0);
  });

  // Scenariusz 20: Mały kredyt 50k zł na 5 lat
  it('Scenariusz 20: Mikrokredyt 50k zł, 5 lat, 5.5% - wysoka precyzja', () => {
    const inputs: MortgageInputs = {
      propertyValue: 100000,
      downPayment: 50000,
      loanTermYears: 5,
      interestRate: 5.5,
      monthlyIncome: 5000,
      installmentType: 'equal',
      interestType: 'variable',
      monthlyOverpayment: 0,
      overpaymentFeePercent: 0,
      overpaymentFeeDurationMonths: 36,
    };
    const res = calculateMortgage(inputs);
    expect(res.loanAmount).toBe(50000);
    expect(res.firstMonthlyPayment).toBeCloseTo(955.05, 1);
    expect(res.schedule.length).toBeGreaterThan(0);
  });

});
