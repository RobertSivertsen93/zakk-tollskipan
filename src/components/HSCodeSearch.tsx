
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HSCodeSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const HSCodeSearch: React.FC<HSCodeSearchProps> = ({ 
  searchTerm, 
  setSearchTerm 
}) => {
  return (
    <div className="border-t p-4">
      <div className="relative">
        <Input 
          placeholder="Enter product description" 
          className="w-full pr-28"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          className="absolute right-1 top-1 h-8"
        >
          Get HS Code
        </Button>
      </div>
    </div>
  );
};
