import React from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 text-slate-800 dark:text-slate-200">
        
        {/* Nagłówek modala */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Polityka Prywatności i Plików Cookies
              </h2>
              <p className="text-xs text-slate-500">
                Informacje o przetwarzaniu danych i plikach cookies
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Zamknij"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Treść polityki prawnej */}
        <div className="space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          
          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              1. Informacje Ogólne i Cel Serwisu
            </h3>
            <p>
              Serwis ma charakter wyłącznie informacyjno-edukacyjny. Wszelkie narzędzia, w tym kalkulatory i symulatory finansowe, służą do samodzielnego szacowania kosztów przez Użytkownika i nie stanowią usług doradztwa finansowego, podatkowego, prawnego ani pośrednictwa kredytowego w rozumieniu Ustawy z dnia 23 marca 2017 r. o kredycie hipotecznym oraz o nadzorze nad pośrednikami kredytu hipotecznego i agentami.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              2. Przetwarzanie Danych Osobowych
            </h3>
            <p>
              Serwis nie wymaga rejestracji, zakładania konta ani podawania danych osobowych (takich jak imię, nazwisko, PESEL, adres e-mail czy numer telefonu). Wszystkie obliczenia i parametry wprowadzane w kalkulatorze są przetwarzane lokalnie w przeglądarce Użytkownika (Client-Side) i nie są przesyłane ani zapisywane w bazach danych Administratora.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              3. Pliki Cookies (Ciasteczka) i Pamięć Lokalna
            </h3>
            <p>
              Serwis korzysta z technologii plików cookies oraz magazynu lokalnego (localStorage) w następujących celach:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Niezbędne (techniczne):</strong> Zapisanie wybranego motywu (Dark/Light Mode) oraz zapamiętanie decyzji o zgodzie na pliki cookies.</li>
              <li><strong>Reklamowe (Google AdSense):</strong> Dostawcy zewnętrzni, w tym Google, wykorzystują pliki cookies do wyświetlania reklam na podstawie poprzednich wizyt Użytkownika w tej lub innych witrynach internetowych.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              4. Zarządzanie Plikami Cookies
            </h3>
            <p>
              Użytkownik może w każdej chwili zmienić ustawienia dotyczące plików cookies w swojej przeglądarce internetowej (zablokować lub usunąć zapisane pliki cookies). Wyłączenie niezbędnych plików cookies może wpłynąć na zapamiętywanie ustawień motywu graficznego.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              5. Wyłączenie Odpowiedzialności (Disclaimer)
            </h3>
            <p>
              Wyliczenia prezentowane w serwisie mają charakter poglądowy i nie stanowią oferty handlowej w rozumieniu art. 66 § 1 Kodeksu Cywilnego. Administrator dokłada starań, aby formuły i stopy referencyjne były aktualne, jednak nie ponosi odpowiedzialności za decyzje finansowe podejmowane na podstawie wyników kalkulatora.
            </p>
          </section>

        </div>

        {/* Stopka modala */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
          >
            Rozumiem i Akceptuję
          </button>
        </div>

      </div>
    </div>
  );
};
