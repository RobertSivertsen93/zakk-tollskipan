
import React from "react";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className="flex items-center justify-center p-1 h-8 w-8 rounded-full"
      title={language === "en" ? "Switch to Faroese" : "Switch to English"}
    >
      <Languages className="h-4 w-4" />
    </Button>
  );
};

export default LanguageToggle;
