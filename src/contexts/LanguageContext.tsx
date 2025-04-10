
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "../data/translations";

type Language = "en" | "fo";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  translations: typeof translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language preference from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage === "fo" ? "fo" : "en"; // Default to English if no preference
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === "en" ? "fo" : "en");
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
