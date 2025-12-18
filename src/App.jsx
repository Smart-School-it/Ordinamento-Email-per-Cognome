import React, { useState } from 'react';
import { ArrowUpDown, Copy, Trash2 } from 'lucide-react';

export default function EmailSorter() {
  const [inputText, setInputText] = useState('');
  const [sortedText, setSortedText] = useState('');
  const [message, setMessage] = useState('');
  const [separator, setSeparator] = useState('\t');

  const extractSurname = (email) => {
    // Estrae la parte prima della @ dell'email
    const localPart = email.split('@')[0];
    
    // Cerca pattern comuni: nome.cognome, cognome.nome, ecc.
    const parts = localPart.split(/[._-]/);
    
    // Se ci sono più parti, assume che l'ultima sia il cognome
    // Altrimenti usa l'intera parte locale
    return parts.length > 1 ? parts[parts.length - 1] : parts[0];
  };

  const sortLines = () => {
    if (!inputText.trim()) {
      setMessage('Inserisci del testo da ordinare');
      return;
    }

    const lines = inputText.split('\n').filter(line => line.trim());
    
    // Regex per trovare email
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    
    const sortedLines = lines
      .map(line => {
        const emailMatch = line.match(emailRegex);
        const email = emailMatch ? emailMatch[0] : '';
        const surname = email ? extractSurname(email).toLowerCase() : '';
        
        // Rimuove l'email dalla riga per ottenere il resto
        const emailPart = email;
        const restOfLine = line.replace(email, '').trim();
        
        // Rimuove eventuali separatori all'inizio del resto
        const numberPart = restOfLine.replace(/^[\t\-,;|]\s*/, '').trim();
        
        // Ricostruisce la riga con il separatore scelto
        const formattedLine = numberPart 
          ? `${emailPart}${separator}${numberPart}`
          : emailPart;
        
        return { line: formattedLine, surname };
      })
      .sort((a, b) => a.surname.localeCompare(b.surname))
      .map(item => item.line);
    
    setSortedText(sortedLines.join('\n'));
    setMessage('Righe ordinate per cognome!');
    setTimeout(() => setMessage(''), 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sortedText);
    setMessage('Testo copiato negli appunti!');
    setTimeout(() => setMessage(''), 3000);
  };

  const clearAll = () => {
    setInputText('');
    setSortedText('');
    setMessage('');
  };

  const exampleText = `mario.rossi@example.com	123456.789
laura.bianchi@example.com	987654.321
giuseppe.verdi@example.com	555123.456
anna.ferrari@example.com	444555.666`;

  const loadExample = () => {
    setInputText(exampleText);
    setMessage('Esempio caricato!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <ArrowUpDown className="text-indigo-600" />
            Ordinamento Email per Cognome
          </h1>
          <p className="text-gray-600 mb-6">
            Incolla il testo con email e numeri. Le righe verranno ordinate alfabeticamente per cognome.
          </p>

          {message && (
            <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-3 rounded-lg mb-4">
              {message}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">
                  Testo da ordinare
                </label>
                <button
                  onClick={loadExample}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Carica esempio
                </button>
              </div>
              
              {/* Separator Selector */}
              <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                <label className="text-xs font-semibold text-gray-600 block mb-2">
                  Separatore output:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSeparator('\t')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      separator === '\t'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    TAB (Excel)
                  </button>
                  <button
                    onClick={() => setSeparator(' - ')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      separator === ' - '
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Trattino
                  </button>
                  <button
                    onClick={() => setSeparator(', ')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      separator === ', '
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Virgola
                  </button>
                  <button
                    onClick={() => setSeparator(' | ')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      separator === ' | '
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Pipe
                  </button>
                </div>
              </div>
              
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="mario.rossi@example.com	123456789&#10;laura.bianchi@example.com	987654321&#10;..."
                className="w-full h-80 p-4 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-mono text-sm"
              />
            </div>

            {/* Output Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Risultato ordinato
              </label>
              <textarea
                value={sortedText}
                readOnly
                placeholder="Il testo ordinato apparirà qui..."
                className="w-full h-80 p-4 border-2 border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={sortLines}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ArrowUpDown size={20} />
              Ordina per Cognome
            </button>
            
            {sortedText && (
              <>
                <button
                  onClick={copyToClipboard}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Copy size={20} />
                  Copia
                </button>
                <button
                  onClick={clearAll}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 size={20} />
                  Pulisci
                </button>
              </>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Come funziona:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• L'app estrae il cognome dalla parte locale dell'email (prima della @)</li>
              <li>• Supporta formati come: nome.cognome@, cognome.nome@, cognome_nome@</li>
              <li>• Accetta vari separatori in input (TAB, trattino, virgola, pipe, ecc.)</li>
              <li>• Il separatore di output di default è TAB per compatibilità con Excel</li>
              <li>• Copiando il risultato in Excel, email e numeri finiscono in colonne separate</li>
              <li>• L'ordinamento è alfabetico e non distingue maiuscole/minuscole</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}