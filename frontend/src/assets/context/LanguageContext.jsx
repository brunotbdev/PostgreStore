import { useContext, createContext, useState } from "react";
import translations from "../translations/translations.js";

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const langBrowser = navigator.language.toLowerCase().split("-").join("");
  const langCode = translations[langBrowser] || translations["ptbr"];
  const langStorage = localStorage.getItem("lang");

  const [lang, setLang] = useState(translations[langStorage] ?? langCode);

  if (!langStorage) {
    localStorage.setItem("lang", langBrowser);
  }

  function changeLang(code) {
    localStorage.setItem("lang", code);
    setLang(translations[code]);
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLang = () => useContext(LanguageContext);

export { useLang, LanguageProvider };
