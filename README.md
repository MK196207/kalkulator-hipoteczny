# 🏠 Projekt 01: Kalkulator Hipoteczny – Dashboard i Doradca Finansowy

## 📌 Podsumowanie Założeń Projektu
Nowoczesna, jednostronicowa aplikacja webowa (SPA) w technologii **React + TypeScript + Tailwind CSS + Recharts**. Aplikacja łączy natychmiastowe przeliczanie rat w czasie rzeczywistym z modułem doradczym (analiza wskaźników DTI i LTV, symulator oszczędności z nadpłat, test wzrostu stóp procentowych oraz historia stóp NBP z ostatnich 6 miesięcy).

---

## 🎯 Główne Funkcjonalności
1. **Wykres Harmonogramu z Podziałem na Kapitał i Odsetki:**
   - Wykres słupkowy roczny (Stacked Bar) precyzyjnie rozdziela spłatę właściwego długu (kapitał) od kosztu dla banku (odsetki).
   - Alternatywne widoki: Saldo zadłużenia (Area Chart) oraz Całkowita struktura kosztów (Donut Chart).
2. **Dynamiczna Aktualizacja po Nadpłacie:** Zmiana suwaka comiesięcznej nadpłaty natychmiast skraca harmonogram na wykresie i aktualizuje podsumowanie roczne.
3. **Kontrastowe i Wygodne Suwaki:** Wyraźne, powiększone uchwyty suwaków (slider thumbs) z obramowaniem i cieniem, widoczne idealnie w trybie jasnym oraz ciemnym.
4. **Pomocne Dymki (Tooltipy):** Każde pojęcie finansowe (DTI, LTV, koszt odsetek, poduszka finansowa) posiada dymek wyjaśniający prostym językiem bez żargonu bankowego.
5. **Symulacja Wzrostu Stóp Procentowych:** Sprawdzenie obciążenia budżetu domowego w przypadku podwyżki stóp o +1%, +2% lub +4%.
6. **Stopa Referencyjna NBP:** Pasek informacyjny pobierający stopę NBP z historią z ostatnich 6 miesięcy po najechaniu kursorem.
7. **Dark Mode & Light Mode:** Przełącznik motywu z automatycznym zapamiętywaniem w `localStorage`.

---

## 💰 Monetyzacja
- **Google AdSense:** Dwa estetyczne sloty reklamowe (górny baner oraz boczny boks) zoptymalizowane pod kątem czytelności i szybkości ładowania.
- **Bezpieczeństwo RODO:** Brak zbierania danych osobowych i newsletterów na starcie.

---

## 🚀 Uruchomienie i Testy
```bash
# Instalacja zależności
npm install

# Uruchomienie serwera lokalnego
npm run dev

# Uruchomienie 20 scenariuszy testowych (Vitest)
npm run test

# Budowanie wersji produkcyjnej
npm run build
```
