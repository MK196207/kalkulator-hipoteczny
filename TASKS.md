# 📋 Zadania i Plan Testów dla Programisty: Kalkulator Hipoteczny

---

## 🚀 1. Szybki Start
```bash
npm install
npm run dev
```

---

## 🧮 2. Zaimplementowane Moduły
- [x] **`src/utils/mortgageMath.ts`** – formuły rat równych/malejących, DTI, LTV, roczny harmonogram spłat z rozbiciem na kapitał/odsetki oraz dynamiczna obsługa nadpłat.
- [x] **`src/components/AmortizationChart.tsx`** – wykres z rozgraniczeniem kapitału i odsetek, aktualizowany na żywo przy nadpłatach.
- [x] **`src/index.css`** – kontrastowe uchwyty suwaków (slider thumb) w Light i Dark Mode.
- [x] **`src/components/Tooltip.tsx`** – dymki informacyjne z definicjami (m.in. DTI, LTV, poduszka).
- [x] **`src/utils/nbpRates.ts`** – stopa NBP z API i menu historii ostatnich 6 miesięcy.
- [x] **`src/components/Footer.tsx`** – nota prawna bez emotek (art. 66 §1 KC).

---

## 🧪 3. 20 Scenariuszy Testowych (Zgodność z Wiedzą Bankową)

Uruchomienie automatycznych testów:
```bash
npm run test
```

### Zestawienie 20 scenariuszy zweryfikowanych w Vitest:
1. **Singiel (Kawalerka 250k zł, 20% wkład, 25 lat, 7.5%):** Rata równa = 1478.00 zł, LTV = 80%, DTI = 24.6%.
2. **Rodzina 2+1 (Mieszkanie 500k zł, 100k wkład, 30 lat, 7.0%):** Rata = 2661.21 zł, DTI = 29.6% (bezpieczny pułap).
3. **Apartament Warszawa (1 mln zł, 200k wkład, 25 lat, 6.8%):** Rata = 5552.58 zł, LTV = 80%.
4. **Niski wkład 10% (400k zł, 40k wkład, 30 lat, 7.8%):** LTV = 90% (wymóg ubezpieczenia).
5. **Wysoki wkład 50% (600k zł, 300k wkład, 20 lat, 6.5%):** Rata = 2236.72 zł, LTV = 50%.
6. **Szybka spłata 10 lat (250k zł kredytu, 6.0%):** Rata = 2775.51 zł, niskie łączne odsetki (< 90k zł).
7. **Długi okres 35 lat (500k zł kredytu, 7.2%):** Rata = 3264.66 zł, odsetki przewyższają kapitał.
8. **Raty malejące standard (360k zł, 30 lat, 6.0%):** Pierwsza rata = 2800 zł, ostatnia rata = 1005 zł.
9. **Porównanie równe vs malejące (500k zł, 25 lat, 7.0%):** Raty malejące dają oszczędność > 90 000 zł na odsetkach.
10. **Nadpłata +300 zł/msc (300k zł, 25 lat, 7.0%):** Skrócenie okresu o ponad 4 lata i oszczędność > 60 000 zł.
11. **Agresywna nadpłata +1500 zł/msc (500k zł, 30 lat, 7.0%):** Skrócenie okresu o > 15 lat i zysk > 300 000 zł.
12. **Nadpłata przy ratach malejących (400k zł, 25 lat, 6.5%, +500 zł):** Skrócenie okresu i oszczędność odsetek.
13. **Kredyt 0% (Program rządowy 100% dopłat):** Rata = kapitał / miesiące, odsetki = 0 zł.
14. **Wysokie stopy 12% (Kryzys inflacyjny):** Rata = 3159.67 zł, brak anomalii matematycznych.
15. **Niskie stopy 2.5% (Tani pieniądz):** Rata = 2119.61 zł.
16. **Wzrost stóp o +1.0% (Symulacja RPP):** Wzrost raty o > 250 zł.
17. **Wzrost stóp o +4.0% (Mocny test odporności):** Wzrost raty o > 1000 zł.
18. **Dochód 0 zł (Brak zarobków):** DTI = 0 bez błędu NaN lub dzielenia przez zero.
19. **Zakup za gotówkę 100% wkładu:** Kredyt = 0 zł, rata = 0 zł.
20. **Mikrokredyt 50k zł, 5 lat, 5.5%:** Rata = 955.05 zł, wysoka precyzja małych kwot.
