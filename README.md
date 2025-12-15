# Ordinamento-Email-per-Cognome
Data una lista di email nel formato nome.cognome@dominio, esse vengono ordinate alfabeticamente secondo il cognome.

Come funziona:
• L'app estrae il cognome dalla parte locale dell'email (prima della @)
• Supporta formati come: nome.cognome@, cognome.nome@, cognome_nome@
• Accetta vari separatori in input (TAB, trattino, virgola, pipe, ecc.)
• Il separatore di output di default è TAB per compatibilità con Excel
• Copiando il risultato in Excel, email e numeri finiscono in colonne separate
• L'ordinamento è alfabetico e non distingue maiuscole/minuscole
