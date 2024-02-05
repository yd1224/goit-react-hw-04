import { createContext, useContext, useState } from "react";
export const langContext = createContext();
export const useMyCtx = () => {
  const ctx = useContext(langContext);
  return ctx;
};

export const LangProvider = ({ children }) => {
  const [lang, SetLang] = useState("en");
  return (
    <langContext.Provider value={{ lang, SetLang }}>
      {children}
    </langContext.Provider>
  );
};
