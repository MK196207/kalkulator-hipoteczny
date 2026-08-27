export type InstallmentType = 'equal' | 'decreasing'; // Rata równa lub malejąca
export type InterestType = 'fixed' | 'variable'; // Oprocentowanie stałe lub zmienne

export interface MortgageInputs {
  propertyValue: number;          // Wartość nieruchomości w PLN
  downPayment: number;            // Wkład własny w PLN
  loanTermYears: number;          // Okres kredytowania w latach
  interestRate: number;           // Oprocentowanie w skali roku (%)
  monthlyIncome: number;          // Dochód netto gospodarstwa (na rękę) w PLN
  installmentType: InstallmentType;
  interestType: InterestType;
  monthlyOverpayment: number;     // Miesięczna kwota nadpłaty w PLN
  overpaymentFeePercent: number;  // Prowizja za nadpłatę w % (np. 0%, 1%, 2%, 3%)
  overpaymentFeeDurationMonths: number; // Przez ile miesięcy obowiązuje prowizja (domyślnie 36 msc wg ustawy)
}

export interface CalculationResult {
  loanAmount: number;                 // Kwota kredytu do spłaty
  firstMonthlyPayment: number;        // Pierwsza / bazowa rata miesięczna (bez nadpłaty)
  lastMonthlyPayment: number;         // Ostatnia rata (przy ratach malejących)
  totalRepayment: number;             // Całkowita kwota do spłaty (z uwzględnieniem ewentualnej nadpłaty)
  totalInterest: number;              // Łączny koszt samych odsetek
  actualMonths: number;               // Rzeczywisty czas spłaty w miesiącach
  actualYears: number;                // Rzeczywisty czas spłaty w latach
  ltv: number;                        // Wskaźnik wkładu (udział kredytu w wartości nieruchomości w %)
  dti: number;                        // Udział raty w dochodzie na rękę (%)
  schedule: AmortizationPoint[];      // Harmonogram spłat w czasie (roczny z podziałem)
}

export interface OverpaymentResult {
  newTotalInterest: number;           // Łączne odsetki po nadpłatach
  interestSavings: number;            // Ile zł zaoszczędzono na samych odsetkach
  overpaymentFeesPaid: number;        // Suma prowizji/kar zapłaconych bankowi za wcześniejszą spłatę
  netSavings: number;                 // Zysk netto (zaoszczędzone odsetki minus prowizje banku)
  originalMonths: number;             // Pierwotna liczba miesięcy
  newMonths: number;                  // Nowa liczba miesięcy spłaty
  monthsSaved: number;                // Ile miesięcy zaoszczędzono
  yearsSaved: number;                 // Ile lat zaoszczędzono
}

export interface AmortizationPoint {
  year: number;
  month: number;
  installment: number;                // Miesięczna rata bazowa
  principalPayment: number;           // Część kapitałowa raty
  interestPayment: number;            // Część odsetkowa raty
  remainingBalance: number;           // Pozostały kapitał do spłaty na koniec okresu
  annualPrincipal: number;            // Suma kapitału spłaconego w danym roku
  annualInterest: number;             // Suma odsetek zapłaconych w danym roku
  cumulativePrincipal: number;        // Skumulowany spłacony kapitał
  cumulativeInterest: number;         // Skumulowane zapłacone odsetki
}

export interface RateHistoryPoint {
  date: string;     // format RRRR-MM
  label: string;    // np. "Luty 2026"
  rate: number;     // np. 5.75
}

export interface AdvisorAdvice {
  id: string;
  category: 'safety' | 'optimization' | 'cost' | 'info';
  level: 'success' | 'warning' | 'info';
  title: string;
  description: string;
}
