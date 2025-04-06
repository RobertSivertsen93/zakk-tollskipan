
import React from "react";
import { Button } from "@/components/ui/button";
import { Language } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className="flex gap-1 items-center"
    >
      <Language className="h-4 w-4" />
      <span>{language === "en" ? "FO" : "EN"}</span>
    </Button>
  );
};

export default LanguageToggle;
