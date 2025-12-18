# Ordinamento Email per Cognome

Questa applicazione permette di **ordinare alfabeticamente una lista di indirizzi email**
nel formato `nome.cognome@dominio` in base al **cognome**.

È pensata per un utilizzo rapido anche in ambito scolastico o amministrativo,
con output compatibile con **Excel**.

---

## 🧠 Come funziona

- L'app estrae il **cognome** dalla parte locale dell'email (prima della `@`)
- Supporta email nel formato:
  - `nome.cognome@dominio`
- Accetta input con **separatori diversi**, tra cui:
  - TAB
  - virgola `,`
  - punto e virgola `;`
  - trattino `-`
  - pipe `|`
- Il **separatore di output** predefinito è **TAB**
- Incollando il risultato in **Excel**, email e numeri finiscono automaticamente in colonne separate
- L’ordinamento:
  - è **alfabetico**
  - **non distingue maiuscole/minuscole**

---

## 🚀 Utilizzo

1. Inserisci la lista di email nel campo di input
2. Seleziona (o lascia automatico) il separatore
3. Avvia l’ordinamento
4. Copia il risultato e incollalo in Excel o LibreOffice

---

## 🛠️ Installazione (sviluppo)

```bash
npm install
npm run dev

