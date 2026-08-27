import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: 'Jak obliczyć miesięczną ratę kredytu hipotecznego?',
    answer: 'Rata kredytu składa się z części kapitałowej (spłata właściwego długu) oraz części odsetkowej (koszt pożyczenia pieniędzy od banku). W przypadku rat równych stosuje się wzór annuitetowy uwzględniający kwotę kredytu, miesięczną stopę procentową oraz liczbę rat. Nasz kalkulator automatycznie i bezbłędnie przelicza te wartości w czasie rzeczywistym.'
  },
  {
    question: 'Czym różni się rata równa od raty malejącej?',
    answer: 'Rata równa ma taką samą wysokość przez cały okres spłaty (przy stałym oprocentowaniu), co ułatwia planowanie domowego budżetu. Rata malejąca ma stałą część kapitałową i zmienne odsetki – jest najwyższa na początku, ale z każdym miesiącem spada. Wybór rat malejących pozwala zaoszczędzić od kilkunastu do nawet ponad 100 000 zł na całkowitym koszcie odsetek w całym okresie kredytowania.'
  },
  {
    question: 'Ile można zaoszczędzić na regularnym nadpłacaniu kredytu?',
    answer: 'Każda nadpłacona kwota w 100% pomniejsza kapitał kredytu. W efekcie w kolejnych miesiącach bank nalicza odsetki od mniejszej kwoty bazowej. Nawet niewielka, regularna nadpłata rzędu 300–500 zł miesięcznie przy 30-letnim kredycie może skrócić okres spłaty o 7–9 lat i przynieść ponad 100 000 zł oszczędności na odsetkach.'
  },
  {
    question: 'Czy bank pobiera prowizję lub karę za wcześniejszą spłatę kredytu?',
    answer: 'Zgodnie z polską Ustawą o kredycie hipotecznym z dnia 23 marca 2017 r., przy kredytach ze zmiennym oprocentowaniem bank może pobierać prowizję za wcześniejszą spłatę (maksymalnie 3%) wyłącznie przez pierwsze 36 miesięcy (3 lata) trwania umowy. Po upływie 3 lat każda nadpłata i całkowita spłata jest w 100% bezpłatna z mocy prawa. Ponadto wiele banków zrezygnowało z tej prowizji całkowicie już od 1. dnia.'
  },
  {
    question: 'Czym są wskaźniki DTI oraz LTV i dlaczego banki je sprawdzają?',
    answer: 'LTV (Loan-to-Value) to stosunek kwoty kredytu do wartości nieruchomości. Im niższy (czyli im wyższy masz wkład własny), tym tańszą marżę zaoferuje bank. DTI (Debt-to-Income) to wskaźnik pokazujący, jaką część Twojego miesięcznego dochodu na rękę pochłania rata. Bezpieczny poziom DTI wynosi do 30–35%, natomiast powyżej 50% banki uznają kredyt za obarczony wysokim ryzykiem.'
  },
  {
    question: 'Jak podwyżki stóp procentowych NBP wpływają na ratę kredytu?',
    answer: 'W kredytach ze zmiennym oprocentowaniem wysokość raty opiera się na stopie referencyjnej WIBOR/WIRON oraz stałej marży banku. Każda podwyżka stóp NBP przez Radę Polityki Pieniężnej bezpośrednio podnosi ratę kredytu. W naszym kalkulatorze możesz w sekcji Symulacji sprawdzić, jak podwyżka o +1%, +2% lub +4% wpłynie na Twój miesięczny budżet.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Najczęściej Zadawane Pytania (FAQ)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Wszystko, co musisz wiedzieć o kredycie hipotecznym, nadpłatach i kosztach
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4 sm:p-5 bg-white dark:bg-slate-900/80 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-150">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
