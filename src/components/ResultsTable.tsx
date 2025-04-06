
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

interface CustomsItem {
  hsCode: string;
  description: string;
  confidence?: number;
  invoiceId?: string;
}

interface ResultsTableProps {
  data: CustomsItem[];
  isVisible: boolean;
}

interface HsCodeDetail {
  code: string;
  description: string;
}

// Mock HS code database for demonstrating hierarchical information
const getHsCodeHierarchy = (hsCode: string): HsCodeDetail[] => {
  // Split the code by levels (2, 4, 6, 8, 10 digits)
  const parts = [
    hsCode.substring(0, 2),
    hsCode.substring(0, 4),
    hsCode.substring(0, 6),
    hsCode.substring(0, 8),
    hsCode.length > 8 ? hsCode : null
  ].filter(Boolean) as string[];
  
  // Create mock descriptions based on the code parts
  const mockDescriptions: Record<string, string> = {
    // Sample for computer keyboards (8471.60.10)
    "84": "Nuclear reactors, boilers, machinery and mechanical appliances; parts thereof",
    "8471": "Automatic data processing machines and units thereof",
    "847160": "Input or output units, whether or not containing storage units in the same housing",
    "84716010": "Computer keyboards",
    
    // Sample for mobile phones (8517.12.00)
    "85": "Electrical machinery and equipment and parts thereof",
    "8517": "Telephone sets, including smartphones and other telephones for cellular networks",
    "851712": "Telephones for cellular networks or for other wireless networks",
    "85171200": "Mobile phones and smartphones",
    
    // Sample for toys (9503.00.00)
    "95": "Toys, games and sports requisites; parts and accessories thereof",
    "9503": "Tricycles, scooters, pedal cars and similar wheeled toys",
    "950300": "Toys and models, with moving parts", 
    "95030000": "Toys and models, with moving parts or other recreational use",
    
    // Sample for furniture (9403.60.90.00)
    "94": "Furniture; bedding, mattresses, cushions and similar stuffed furnishings",
    "9403": "Other furniture and parts thereof",
    "940360": "Other wooden furniture",
    "94036090": "Other wooden furniture not elsewhere specified",
    "9403609000": "Other wooden furniture not elsewhere specified or included"
  };
  
  // If we don't have a specific description, create a generic one
  return parts.map(part => ({
    code: part,
    description: mockDescriptions[part] || `Category ${part}`
  }));
};

export default function ResultsTable({ data, isVisible }: ResultsTableProps) {
  const { toast } = useToast();
  const [completedInvoices, setCompletedInvoices] = useState<Record<string, boolean>>({});
  const [expandedInvoices, setExpandedInvoices] = useState<Record<string, boolean>>({});
  
  if (!isVisible) return null;

  // Ensure each item has a confidence value and invoiceId if not provided
  // Convert invoiceId to string to match the CustomsItem interface
  const enrichedData = data.map((item, index) => ({
    ...item,
    confidence: item.confidence || Math.floor(Math.random() * 30) + 70, // Random value between 70-99% if not provided
    invoiceId: item.invoiceId || String(Math.floor(index / 2) + 1) // Convert to string to fix type error
  }));

  const handleCopyHsCode = (hsCode: string) => {
    navigator.clipboard.writeText(hsCode)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: `HS Code ${hsCode} has been copied`,
        });
      })
      .catch(err => {
        toast({
          title: "Failed to copy",
          description: "Please try again or copy manually",
          variant: "destructive"
        });
        console.error('Failed to copy: ', err);
      });
  };

  // Function to determine the background color based on confidence percentage
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-600';
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 70) return 'bg-yellow-500';
    if (confidence >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getConfidenceTextColor = (confidence: number) => {
    return confidence >= 60 ? 'text-white' : 'text-white';
  };

  const toggleInvoiceComplete = (invoiceId: string) => {
    setCompletedInvoices(prev => ({
      ...prev,
      [invoiceId]: !prev[invoiceId]
    }));
    
    // Notify user with toast
    const isNowComplete = !completedInvoices[invoiceId];
    toast({
      title: isNowComplete ? "Invoice Marked Complete" : "Invoice Marked Incomplete",
      description: isNowComplete ? 
        `Invoice #${invoiceId} has been marked as processed` : 
        `Invoice #${invoiceId} has been marked for further review`,
    });
  };

  const toggleInvoiceExpanded = (invoiceId: string) => {
    setExpandedInvoices(prev => ({
      ...prev,
      [invoiceId]: !prev[invoiceId]
    }));
  };

  // Render invoice header with checkbox
  const renderInvoiceHeader = (invoiceId: string) => {
    const isComplete = completedInvoices[invoiceId] || false;
    const isExpanded = expandedInvoices[invoiceId] !== false; // Default to expanded
    
    return (
      <tr className={isComplete ? "opacity-60 bg-gray-50" : ""}>
        <td colSpan={3} className="py-2">
          <div className="flex items-center justify-between py-2 px-4">
            <div className="flex items-center gap-3">
              <Checkbox 
                id={`invoice-${invoiceId}`}
                checked={isComplete}
                onCheckedChange={() => toggleInvoiceComplete(invoiceId)}
                className="border-custom-blue-500 text-custom-blue-500 h-5 w-5"
              />
              <label 
                htmlFor={`invoice-${invoiceId}`}
                className={`font-medium ${isComplete ? 'text-custom-gray-400 line-through' : 'text-custom-gray-500'} text-sm cursor-pointer`}
              >
                Invoice #{invoiceId} {isComplete && '(Processed)'}
              </label>
            </div>
            <button 
              onClick={() => toggleInvoiceExpanded(invoiceId)}
              className="flex items-center gap-1 text-xs text-custom-blue-500 hover:text-custom-blue-600"
            >
              {isExpanded ? (
                <>Hide Details <ChevronUp className="h-3 w-3" /></>
              ) : (
                <>Show Details <ChevronDown className="h-3 w-3" /></>
              )}
            </button>
          </div>
        </td>
      </tr>
    );
  };

  // Render separator between invoices
  const renderSeparator = () => (
    <tr>
      <td colSpan={3} className="py-0">
        <Separator className="my-2 bg-custom-gray-200" />
      </td>
    </tr>
  );

  // Group items by invoice ID
  const groupedItems: Record<string, CustomsItem[]> = {};
  enrichedData.forEach(item => {
    const id = item.invoiceId || '1';
    if (!groupedItems[id]) {
      groupedItems[id] = [];
    }
    groupedItems[id].push(item);
  });

  // Render HS code hierarchy in a hover card
  const renderHsCodeInfo = (hsCode: string) => {
    const hierarchy = getHsCodeHierarchy(hsCode);
    
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="p-1 rounded hover:bg-custom-gray-100 transition-colors" title="HS Code Information">
            <Info className="h-4 w-4 text-custom-blue-500" />
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-0 shadow-lg">
          <div className="p-3 bg-custom-blue-500 text-white">
            <h3 className="font-medium text-sm">HS Code Hierarchy</h3>
            <p className="text-xs text-blue-100">Showing classification breakdown</p>
          </div>
          <div className="p-0">
            {hierarchy.map((level, index) => (
              <div 
                key={level.code} 
                className={`p-3 border-b border-custom-gray-200 ${index === hierarchy.length - 1 ? 'bg-custom-blue-50' : ''}`}
                style={{ paddingLeft: `${index * 12 + 12}px` }}
              >
                <div className="flex justify-between items-start">
                  <span className="text-sm font-mono text-custom-blue-600">{level.code}</span>
                  <span className={`text-xs px-2 py-1 rounded ${index === hierarchy.length - 1 ? 'bg-custom-blue-500 text-white' : 'text-custom-gray-500'}`}>
                    {index === 0 ? 'Chapter' : index === 1 ? 'Heading' : index === 2 ? 'Subheading' : 'Code'}
                  </span>
                </div>
                <p className="text-sm text-custom-gray-600 mt-1">{level.description}</p>
              </div>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  return (
    <Card className="border border-custom-gray-200 shadow-sm bg-white">
      <CardHeader className="bg-custom-gray-50 border-b border-custom-gray-200 pb-3">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-custom-blue-100 p-1">
            <Check className="h-4 w-4 text-custom-blue-500" />
          </div>
          <CardTitle className="text-lg font-medium text-custom-blue-600">
            Results
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="result-table">
            <thead>
              <tr>
                <th className="w-[30%]">HS Code</th>
                <th className="w-[50%]">Product Description</th>
                <th className="w-[20%]">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedItems).map(([invoiceId, items], groupIndex) => {
                const isExpanded = expandedInvoices[invoiceId] !== false; // Default to expanded
                
                return (
                  <React.Fragment key={invoiceId}>
                    {groupIndex > 0 && renderSeparator()}
                    {renderInvoiceHeader(invoiceId)}
                    {isExpanded && (
                      <tr className={completedInvoices[invoiceId] ? "opacity-60" : ""}>
                        <td colSpan={3} className="p-0">
                          <table className="w-full">
                            <tbody>
                              {items.map((item, index) => (
                                <tr key={`${invoiceId}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-custom-gray-50'}>
                                  <td className="px-4 py-3 border-t border-custom-gray-200">
                                    <div className="flex items-center gap-2 font-mono">
                                      {item.hsCode}
                                      <div className="flex items-center">
                                        <button 
                                          onClick={() => handleCopyHsCode(item.hsCode)}
                                          className="p-1 rounded hover:bg-custom-gray-100 transition-colors"
                                          title="Copy HS Code"
                                        >
                                          <Copy className="h-4 w-4 text-custom-blue-500" />
                                        </button>
                                        {renderHsCodeInfo(item.hsCode)}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 border-t border-custom-gray-200">{item.description}</td>
                                  <td className="px-4 py-3 border-t border-custom-gray-200">
                                    <div className="flex items-center">
                                      <div className={`${getConfidenceColor(item.confidence)} ${getConfidenceTextColor(item.confidence)} text-center rounded px-2 py-1 font-medium text-sm`}>
                                        {item.confidence}%
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
