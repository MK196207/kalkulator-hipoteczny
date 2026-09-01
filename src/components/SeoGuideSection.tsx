import React from 'react';
import { BookOpen, TrendingDown, Scale, ShieldAlert, Award } from 'lucide-react';

export const SeoGuideSection: React.FC = () => {
  return (
    <section className="w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Nagłówek sekcji edukacyjnej */}
      <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Poradnik Kredytobiorcy: Jak Skutecznie Obniżyć Koszt Kredytu Hipotecznego?
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Praktyczna wiedza finansowa, strategie nadpłat i prawa konsumenta
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        
        {/* Artykuł 1: Strategia Nadpłat */}
        <article className="space-y-2.5 p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <TrendingDown className="w-4 h-4" />
            <h3>1. Dlaczego comiesięczna nadpłata jest najbardziej opłacalna?</h3>
          </div>
          <p>
            Większość osób nie zdaje sobie sprawy, że w pierwszych 5–10 latach kredytu hipotecznego nawet <strong>70–80% miesięcznej raty stanowią odsetki</strong>, a zaledwie 20–30% to faktyczna spłata mieszkania. 
          </p>
          <p>
            Każda dodatkowa złotówka wpłacona w ramach nadpłaty w 100% pomniejsza kapitał bazowy. Oznacza to, że bank natychmiast przelicza harmonogram i w kolejnym miesiącu nalicza odsetki od mniejszego długu. W skali 25–30 lat nadpłacanie zaledwie <strong>300–500 zł miesięcznie</strong> pozwala zaoszczędzić od 60 000 do nawet 150 000 zł na odsetkach i skrócić czas spłaty o 6–9 lat.
          </p>
        </article>

        {/* Artykuł 2: Zasada 36 miesięcy */}
        <article className="space-y-2.5 p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <ShieldAlert className="w-4 h-4" />
            <h3>2. Prowizje za wcześniejszą spłatę a prawo (Zasada 36 miesięcy)</h3>
          </div>
          <p>
            Kluczowym aktem prawnym chroniącym kredytobiorców w Polsce jest <strong>Ustawa z dnia 23 marca 2017 r. o kredycie hipotecznym</strong>. Zgodnie z art. 40 tej ustawy:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-slate-500 dark:text-slate-400">
            <li>Przy kredytach ze zmiennym oprocentowaniem bank może pobierać prowizję (maks. 3%) <strong>wyłącznie przez pierwsze 36 miesięcy (3 lata)</strong> od zawarcia umowy.</li>
            <li>Po upływie 36 miesięcy nadpłacanie i całkowita wcześniejsza spłata są <strong>w 100% bezpłatne z mocy prawa</strong>.</li>
            <li>Wiele polskich banków (m.in. ING, mBank, Millennium) zrezygnowało z tej prowizji i oferuje darmowe nadpłaty od 1. dnia.</li>
          </ul>
        </article>

        {/* Artykuł 3: Raty równe vs malejące */}
        <article className="space-y-2.5 p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
            <Scale className="w-4 h-4" />
            <h3>3. Raty równe (annuitetowe) czy raty malejące?</h3>
          </div>
          <p>
            <strong>Raty równe:</strong> Zapewniają stałą wysokość obciążenia budżetu co miesiąc, co ułatwia planowanie wydatków i daje wyższą zdolność kredytową przy wnioskowaniu.
          </p>
          <p>
            <strong>Raty malejące:</strong> Wymagają wyższych zarobków na początku, ponieważ pierwsza rata jest wyższa o ok. 20–30%. W zamian kapitał spłacany jest w równym tempie od pierwszego miesiąca, co generuje <strong>oszczędność rzędu kilkudziesięciu tysięcy złotych</strong> w porównaniu do rat równych.
          </p>
        </article>

        {/* Artykuł 4: Zdolność kredytowa i bufor bezpieczeństwa */}
        <article className="space-y-2.5 p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <Award className="w-4 h-4" />
            <h3>4. Wskaźnik DTI i bezpieczny bufor na podwyżki stóp</h3>
          </div>
          <p>
            Wskaźnik <strong>DTI (Debt-to-Income)</strong> określa, jaki procent Twojego dochodu na rękę pochłania rata kredytu. Komisja Nadzoru Finansowego (KNF) rekomenduje, aby wskaźnik ten nie przekraczał <strong>40–50%</strong>.
          </p>
          <p>
            Przed zaciągnięciem kredytu ze zmiennym oprocentowaniem zawsze wykonaj symulację wzrostu stóp procentowych o <strong>+2% do +4%</strong>. Jeśli przy takim scenariuszu rata nadal mieści się w Twoim budżecie, Twój kredyt jest bezpieczny.
          </p>
        </article>

      </div>
    </section>
  );
};
