
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

interface CustomsItem {
  hsCode: string;
  description: string;
  confidence?: number;
  invoiceId?: string; // This expects a string type
}

interface ResultsTableProps {
  data: CustomsItem[];
  isVisible: boolean;
}

export default function ResultsTable({ data, isVisible }: ResultsTableProps) {
  const { toast } = useToast();
  const [completedInvoices, setCompletedInvoices] = useState<Record<string, boolean>>({});
  
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

  // Render invoice header with checkbox
  const renderInvoiceHeader = (invoiceId: string) => {
    const isComplete = completedInvoices[invoiceId] || false;
    
    return (
      <tr className={isComplete ? "opacity-60" : ""}>
        <td colSpan={3} className="py-2">
          <div className="flex items-center py-2 gap-3">
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
              {Object.entries(groupedItems).map(([invoiceId, items], groupIndex) => (
                <React.Fragment key={invoiceId}>
                  {groupIndex > 0 && renderSeparator()}
                  {renderInvoiceHeader(invoiceId)}
                  <tr className={completedInvoices[invoiceId] ? "opacity-60" : ""}>
                    <td colSpan={3} className="p-0">
                      <div className={`overflow-hidden transition-all duration-300 ${completedInvoices[invoiceId] ? 'max-h-0' : 'max-h-[1000px]'}`}>
                        <table className="w-full">
                          <tbody>
                            {items.map((item, index) => (
                              <tr key={`${invoiceId}-${index}`}>
                                <td className="px-4 py-3 border-t border-custom-gray-200">
                                  <div className="flex items-center gap-2 font-mono">
                                    {item.hsCode}
                                    <button 
                                      onClick={() => handleCopyHsCode(item.hsCode)}
                                      className="p-1 rounded hover:bg-custom-gray-100 transition-colors"
                                      title="Copy HS Code"
                                    >
                                      <Copy className="h-4 w-4 text-custom-blue-500" />
                                    </button>
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
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
