import { MortgageInputs, CalculationResult, AdvisorAdvice } from '../types/mortgage';

/**
 * Generuje praktyczne wskazówki doradcy na podstawie wprowadzonych danych.
 * Bez marketingowego żargonu, prosty i bezpośredni język.
 */
export function generateAdvisorAdvice(inputs: MortgageInputs, result: CalculationResult): AdvisorAdvice[] {
  const advice: AdvisorAdvice[] = [];

  // 1. Analiza udziału raty w dochodzie (DTI)
  if (inputs.monthlyIncome > 0) {
    if (result.dti > 50) {
      advice.push({
        id: 'dti-danger',
        category: 'safety',
        level: 'warning',
        title: 'Wysoki udział raty w dochodzie (' + result.dti.toFixed(0) + '%)',
        description: 'Rata przekracza 50% Twoich zarobków na rękę. Banki uznają to za wysokie ryzyko i mogą odrzucić wniosek lub zażądać dodatkowego współkredytobiorcy.'
      });
    } else if (result.dti > 40) {
      advice.push({
        id: 'dti-caution',
        category: 'safety',
        level: 'warning',
        title: 'Umiarkowany bufor finansowy (' + result.dti.toFixed(0) + '%)',
        description: 'Rata pochłania ponad 40% dochodu. Przy ewentualnej podwyżce stóp procentowych domowy budżet może być mocno obciążony.'
      });
    } else if (result.dti > 0 && result.dti <= 30) {
      advice.push({
        id: 'dti-healthy',
        category: 'safety',
        level: 'success',
        title: 'Bezpieczny poziom raty (' + result.dti.toFixed(0) + '%)',
        description: 'Rata poniżej 30% dochodu na rękę daje wysokie poczucie bezpieczeństwa i stabilną zdolność kredytową w większości banków.'
      });
    }
  }

  // 2. Analiza wkładu własnego (LTV)
  if (result.ltv > 80) {
    advice.push({
      id: 'ltv-high',
      category: 'cost',
      level: 'warning',
      title: 'Wkład własny poniżej 20%',
      description: 'Przy wkładzie poniżej 20% wartości mieszkania bank doliczy ubezpieczenie niskiego wkładu lub podwyższy marżę o 0.2-0.5 p.p. do czasu spłaty kapitału.'
    });
  } else if (result.ltv > 0 && result.ltv <= 80) {
    advice.push({
      id: 'ltv-ok',
      category: 'cost',
      level: 'success',
      title: 'Optymalny wkład własny (' + (100 - result.ltv).toFixed(0) + '%)',
      description: 'Posiadasz co najmniej 20% wkładu własnego, co pozwala uzyskać standardową (najniższą) marżę bankową bez dodatkowych ubezpieczeń pomostowych.'
    });
  }

  // 3. Nadpłaty i prawo do bezpłatnej wcześniejszej spłaty
  if (inputs.monthlyOverpayment > 0) {
    advice.push({
      id: 'overpayment-law',
      category: 'optimization',
      level: 'success',
      title: 'Zasada 36 miesięcy przy nadpłacaniu',
      description: 'Zgodnie z Ustawą o kredycie hipotecznym, po upływie 36 miesięcy od podpisania umowy bank nie ma prawa pobierać żadnych prowizji za nadpłatę przy zmiennym oprocentowaniu.'
    });
  }

  // 4. Wskazówka dotycząca typu raty
  if (inputs.installmentType === 'equal') {
    const decResult = calculateDecreasingTotalInterest(inputs);
    const diff = result.totalInterest - decResult;
    if (diff > 5000) {
      advice.push({
        id: 'installment-diff',
        category: 'optimization',
        level: 'info',
        title: 'Opcja rat malejących: oszczędność ' + Math.round(diff).toLocaleString('pl-PL') + ' zł',
        description: 'Wybierając raty malejące zapłacisz wyższe raty na początku, ale w całym okresie kredytu zaoszczędzisz znaczną sumę na odsetkach.'
      });
    }
  }

  // 5. Poduszka finansowa
  advice.push({
    id: 'safety-buffer',
    category: 'safety',
    level: 'info',
    title: 'Poduszka finansowa',
    description: 'Pamiętaj, aby po wpłacie wkładu własnego zachować oszczędności na min. 3-6 miesięcy kosztów życia na wypadek nieprzewidzianych wydatków.'
  });

  return advice;
}

function calculateDecreasingTotalInterest(inputs: MortgageInputs): number {
  const loanAmount = Math.max(0, inputs.propertyValue - inputs.downPayment);
  const totalMonths = Math.max(1, inputs.loanTermYears * 12);
  const monthlyRate = inputs.interestRate / 100 / 12;
  const principalPerMonth = loanAmount / totalMonths;

  let totalInterest = 0;
  let remaining = loanAmount;

  for (let m = 1; m <= totalMonths; m++) {
    totalInterest += remaining * monthlyRate;
    remaining = Math.max(0, remaining - principalPerMonth);
  }

  return totalInterest;
}
