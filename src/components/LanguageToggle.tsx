
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  
  // Using flag emojis for Faroe Islands and UK
  const FaroeseFlag = () => (
    <span className="text-lg" aria-hidden="true">🇫🇴</span>
  );
  
  const EnglishFlag = () => (
    <span className="text-lg" aria-hidden="true">🇬🇧</span>
  );

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className="flex items-center justify-center p-1 h-8 w-8 rounded-full"
      title={language === "en" ? "Switch to Faroese" : "Switch to English"}
    >
      {language === "en" ? <FaroeseFlag /> : <EnglishFlag />}
    </Button>
  );
};

export default LanguageToggle;
