import { useState, useEffect } from "react";
//linguas escolidas para a tradução experimento 
const languages = [
  { code: "en", name: "Inglês" },
  { code: "es", name: "Espanhol" },
  { code: "fr", name: "Francês" },
  { code: "de", name: "Alemão" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
]
//usado para chamar as funções 
function App() {
  const [sourcelang, setsourcelang] = useState("pt");
  const [targetlang, settargetlang] = useState("en");
  const [sourcetext, setsourcetext] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [translatedText, settranslatedtext] = useState("");
  const [error, seterror] = useState("");


  useEffect(() => {
    if (sourcetext) {
      const delay = setTimeout(() => {
        handletranslate();
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [sourcetext]);

  const handletranslate = async () => {
    setIsloading(true);
    seterror("")// usado para limpar o erro da tela.

    try {
      //HTTP site mymemory usado para fazer a tradução.
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${sourcetext}&langpair=${sourcelang}|${targetlang}`
      );

      if (!response.ok) {
        throw new Error(`HTTP ERROR: ${response.status}`);
      }

      const data = await response.json();

      // acesso ao texto traduzido
      settranslatedtext(data.responseData.translatedText);

    } catch (err) {
      seterror(`erro ao tentar traduzir, ${error}tente novamente`);
    } finally {
      setIsloading(false);
    }


  };

  const swaptranslate = () => {
    setsourcelang(targetlang)
    settargetlang(sourcelang)
    setsourcetext(translatedText)
    settranslatedtext(sourcetext)
  }
  //cabeçario
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-white py-3 flex justify-between items-center px-6 shadow">
        <h1 className="text-xl font-semibold">Maximum Translator</h1>
        <div className="flex space-x-4">
          {/* Espaço para futuros ícones */}
        </div>
      </header>



      <main className="flex-grow flex item-start justify-center px-4 px-8">
        <div className="w-full max-w-5xl bg-white rounded-lg shodow-md overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <select
              value={sourcelang}
              onChange={(event) => setsourcelang(event.target.value)}
              className="text-sm text-textcolor bg-white border p-2 rounded-md"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            {/* Botão de troca de idiomas mais destacado */}
            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>

            <select
              value={targetlang}
              onChange={(event) => settargetlang(event.target.value)}
              className="text-sm text-textcolor bg-white border p-2 rounded-md"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* Área de Texto de Entrada */}
            <div className="p-4 bg-gray-100 border rounded-md shadow-sm">
              <textarea
                value={sourcetext}
                onChange={(event) => setsourcetext(event.target.value)}
                placeholder="Digite seu texto aqui..."
                className="w-full h-40 p-2 text-lg bg-white border rounded-md resize-none"
              />
            </div>

            {/* Área de Texto Traduzido */}
            <div className="p-4 bg-gray-100 border rounded-md shadow-sm relative">

              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
                </div>
              ) : (
                <p className="text-lg">{translatedText}</p>
              )}
            </div>
          </div>
        </div>
      </main >

      <footer className="bg-white py-4 text-center text-gray-600 border-t">
        &copy; {new Date().getFullYear()} Maximum Translator
      </footer>

    </div >
  );
}

export default App;
