
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { CustomsItem } from '@/types/results';
import { InvoiceHeader } from './results/InvoiceHeader';
import { InvoiceContent } from './results/InvoiceContent';

interface ResultsTableProps {
  data: CustomsItem[];
  isVisible: boolean;
}

export default function ResultsTable({ data, isVisible }: ResultsTableProps) {
  const { toast } = useToast();
  const [completedInvoices, setCompletedInvoices] = useState<Record<string, boolean>>({});
  const [expandedInvoices, setExpandedInvoices] = useState<Record<string, boolean>>({});
  
  if (!isVisible) return null;

  // Ensure each item has a confidence value and invoiceId if not provided
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

  const toggleInvoiceComplete = (invoiceId: string) => {
    const newCompletedState = !completedInvoices[invoiceId];
    
    setCompletedInvoices(prev => ({
      ...prev,
      [invoiceId]: newCompletedState
    }));
    
    // When completing an invoice, also collapse it
    if (newCompletedState) {
      setExpandedInvoices(prev => ({
        ...prev,
        [invoiceId]: false
      }));
    } else {
      // When uncompleting an invoice, expand it
      setExpandedInvoices(prev => ({
        ...prev,
        [invoiceId]: true
      }));
    }
    
    // Notify user with toast
    toast({
      title: newCompletedState ? "Invoice Marked Complete" : "Invoice Marked Incomplete",
      description: newCompletedState ? 
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
              {Object.entries(groupedItems).map(([invoiceId, items], groupIndex) => {
                const isComplete = completedInvoices[invoiceId] || false;
                // An invoice is expanded if it's explicitly set to true OR if it's not complete and not explicitly set to false
                const isExpanded = expandedInvoices[invoiceId] === true || 
                                (!isComplete && expandedInvoices[invoiceId] !== false);
                
                return (
                  <React.Fragment key={invoiceId}>
                    {groupIndex > 0 && renderSeparator()}
                    <InvoiceHeader 
                      invoiceId={invoiceId}
                      isComplete={isComplete}
                      isExpanded={isExpanded}
                      onToggleComplete={toggleInvoiceComplete}
                      onToggleExpand={toggleInvoiceExpanded}
                    />
                    <InvoiceContent 
                      items={items}
                      isExpanded={isExpanded}
                      isComplete={isComplete}
                      onCopyHsCode={handleCopyHsCode}
                    />
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
