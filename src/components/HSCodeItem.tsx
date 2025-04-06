
import React from "react";
import { Copy, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { HSCodeItem as HSCodeItemType } from "@/types/hs-code";

interface HSCodeItemProps {
  item: HSCodeItemType;
  expandedItem: string | null;
  toggleExpand: (id: string) => void;
}

export const HSCodeItem: React.FC<HSCodeItemProps> = ({ 
  item, 
  expandedItem, 
  toggleExpand 
}) => {
  const { toast } = useToast();

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    toast({
      title: "HS Code copied",
      description: `HS code ${code} has been copied to clipboard`,
    });
  };

  const handleCopyDescription = (description: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(description);
    toast({
      title: "Description copied",
      description: "Product description has been copied to clipboard",
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-green-600";
    if (confidence >= 60) return "bg-green-500";
    if (confidence >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="border-b border-border last:border-b-0">
      <div 
        className="flex items-center p-4 hover:bg-muted/50 cursor-pointer" 
        onClick={() => toggleExpand(item.id)}
      >
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
              onClick={(e) => handleCopyDescription(item.description, e)}
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
                onClick={(e) => handleCopyCode(item.code, e)}
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
  );
};
