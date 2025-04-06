import React, { useState } from "react";
import { Copy, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface HSCodeItem {
  id: string;
  code: string;
  description: string;
  confidence: number;
  details?: {
    category: string;
    subcategory?: string;
    specification?: string;
  };
}

// Mock data for demonstration purposes
const mockHSCodes: HSCodeItem[] = [
  {
    id: "1601",
    code: "1601",
    description: "Volkswagen Currywurst (sausage), branded as a Volkswagen Original Part",
    confidence: 95,
    details: {
      category: "16 - Preparations of meat",
      subcategory: "1601 - Sausages and similar products",
      specification: "1601.00 - Of meat, meat offal, blood or insects"
    }
  },
  {
    id: "7318",
    code: "7318",
    description: "Black metal screw",
    confidence: 85,
    details: {
      category: "73 - Articles of iron or steel",
      subcategory: "7318 - Screws, bolts, nuts, coach screws",
      specification: "7318.15 - Threaded screws and bolts"
    }
  },
  {
    id: "9403.60",
    code: "9403.60",
    description: "Table from IKEA",
    confidence: 50,
    details: {
      category: "94 - Furniture; bedding, mattresses",
      subcategory: "9403 - Other furniture and parts thereof",
      specification: "9403.60 - Other wooden furniture"
    }
  },
  {
    id: "3208.90",
    code: "3208.90",
    description: "KLARLACK HOCHGLÄNZEND - High gloss clear lacquer",
    confidence: 75,
    details: {
      category: "32 - Tanning or dyeing extracts",
      subcategory: "3208 - Paints and varnishes based on synthetic polymers",
      specification: "3208.90 - Other"
    }
  },
  {
    id: "3208.90-2",
    code: "3208.90",
    description: "LACKSPRAY RAL 5010 ENZIANBLAU 400ML V6 - Spray paint, RAL 5010 Gentian Blue, 400ml",
    confidence: 75,
    details: {
      category: "32 - Tanning or dyeing extracts",
      subcategory: "3208 - Paints and varnishes based on synthetic polymers",
      specification: "3208.90 - Other"
    }
  },
  {
    id: "8204.11",
    code: "8204.11",
    description: "1/2″Flerlandstop XZN lang 100 mm VZ 14 - likely a tool or fastener",
    confidence: 40,
    details: {
      category: "82 - Tools, implements, cutlery",
      subcategory: "8204 - Hand-operated spanners and wrenches",
      specification: "8204.11 - Nonadjustable, and parts thereof"
    }
  }
];

const HSCodeLookup: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { toast } = useToast();
  
  const filteredHSCodes = searchTerm
    ? mockHSCodes.filter(
        item => 
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.code.includes(searchTerm)
      )
    : mockHSCodes;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "HS Code copied",
      description: `HS code ${code} has been copied to clipboard`,
    });
  };

  const handleCopyDescription = (description: string) => {
    navigator.clipboard.writeText(description);
    toast({
      title: "Description copied",
      description: "Product description has been copied to clipboard",
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-green-600";
    if (confidence >= 60) return "bg-green-500";
    if (confidence >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <div className="border-b px-4 py-3 flex items-center">
        <h2 className="text-lg font-semibold">Faroe Islands HS Code Lookup</h2>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col space-y-1">
          {filteredHSCodes.map((item) => (
            <div 
              key={item.id} 
              className="border-b border-border last:border-b-0"
            >
              <div className="flex items-center p-4 hover:bg-muted/50 cursor-pointer" onClick={() => toggleExpand(item.id)}>
                {expandedItem === item.id ? 
                  <ChevronDown className="w-5 h-5 text-muted-foreground mr-2" /> : 
                  <ChevronRight className="w-5 h-5 text-muted-foreground mr-2" />
                }
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{item.description}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2 ml-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyDescription(item.description);
                      }}
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span className="sr-only">Copy description</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center mt-1">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-500 font-mono">{item.code}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-7 px-2" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyCode(item.code);
                        }}
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span className="sr-only">Copy HS code</span>
                      </Button>
                    </div>
                    
                    <div className="ml-auto flex items-center gap-2">
                      <span className={`text-xs text-white px-2 py-0.5 rounded-md ${getConfidenceColor(item.confidence)}`}>
                        {item.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {expandedItem === item.id && item.details && (
                <div className="bg-muted/30 px-4 py-3 border-t border-border">
                  <div className="text-sm space-y-2">
                    <div>
                      <div className="font-medium">Category</div>
                      <div className="text-muted-foreground">{item.details.category}</div>
                    </div>
                    
                    {item.details.subcategory && (
                      <div>
                        <div className="font-medium">Subcategory</div>
                        <div className="text-muted-foreground">{item.details.subcategory}</div>
                      </div>
                    )}
                    
                    {item.details.specification && (
                      <div>
                        <div className="font-medium">Specification</div>
                        <div className="text-muted-foreground">{item.details.specification}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {filteredHSCodes.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No HS codes found matching your search.
            </div>
          )}
        </div>
      </div>
      
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
    </div>
  );
};

export default HSCodeLookup;
