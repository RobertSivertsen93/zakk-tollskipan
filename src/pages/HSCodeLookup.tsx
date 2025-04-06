
import React, { useState } from "react";
import { HSCodeItem } from "@/components/HSCodeItem";
import { HSCodeSearch } from "@/components/HSCodeSearch";
import { mockHSCodes } from "@/data/mock-hs-codes";
import { HSCodeItem as HSCodeItemType } from "@/types/hs-code";

const HSCodeLookup: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  const filteredHSCodes = searchTerm
    ? mockHSCodes.filter(
        item => 
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.code.includes(searchTerm)
      )
    : mockHSCodes;

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <div className="border-b px-4 py-3 flex items-center">
        <h2 className="text-lg font-semibold">Faroe Islands HS Code Lookup</h2>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col space-y-1">
          {filteredHSCodes.map((item: HSCodeItemType) => (
            <HSCodeItem 
              key={item.id}
              item={item}
              expandedItem={expandedItem}
              toggleExpand={toggleExpand}
            />
          ))}
          
          {filteredHSCodes.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No HS codes found matching your search.
            </div>
          )}
        </div>
      </div>
      
      <HSCodeSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
};

export default HSCodeLookup;
