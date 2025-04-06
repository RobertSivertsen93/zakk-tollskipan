
import React from "react";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  
  // Custom flags using SVG for Faroe Islands and UK
  const FaroeseFlag = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 16 12" 
      width="16" 
      height="12" 
      className="h-4 w-5"
      aria-hidden="true"
    >
      <rect width="16" height="12" fill="#FFFFFF"/>
      <rect x="0" y="4" width="16" height="4" fill="#0065BD"/>
      <rect x="4" y="0" width="4" height="12" fill="#ED2939"/>
    </svg>
  );
  
  const EnglishFlag = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 16 12" 
      width="16" 
      height="12" 
      className="h-4 w-5"
      aria-hidden="true"
    >
      <rect width="16" height="12" fill="#012169"/>
      <path d="M0,0 L16,12 M16,0 L0,12" stroke="#FFFFFF" strokeWidth="2"/>
      <path d="M8,0 L8,12 M0,6 L16,6" stroke="#FFFFFF" strokeWidth="4"/>
      <path d="M8,0 L8,12 M0,6 L16,6" stroke="#C8102E" strokeWidth="2"/>
      <path d="M0,0 L16,12 M16,0 L0,12" stroke="#C8102E" strokeWidth="1"/>
    </svg>
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
