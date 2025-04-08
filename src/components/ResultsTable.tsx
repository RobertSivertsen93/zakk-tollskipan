
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { CustomsItem } from '@/types/results';
import { InvoiceHeader } from './results/InvoiceHeader';
import { InvoiceContent } from './results/InvoiceContent';
import { useInvoiceState } from '@/hooks/useInvoiceState';
import { useHsCodeActions } from '@/hooks/useHsCodeActions';

interface ResultsTableProps {
  data: CustomsItem[];
  isVisible: boolean;
}

export default function ResultsTable({ data, isVisible }: ResultsTableProps) {
  const [itemsData, setItemsData] = useState<CustomsItem[]>(data);
  
  if (!isVisible) return null;

  // Ensure each item has a confidence value and invoiceId if not provided
  const enrichedData = itemsData.map((item, index) => ({
    ...item,
    confidence: item.confidence || Math.floor(Math.random() * 30) + 70, // Random value between 70-99% if not provided
    invoiceId: item.invoiceId || String(Math.floor(index / 2) + 1) // Convert to string to fix type error
  }));

  const { 
    toggleInvoiceComplete, 
    toggleInvoiceExpanded, 
    groupItemsByInvoice,
    isInvoiceExpanded,
    isInvoiceComplete
  } = useInvoiceState(enrichedData);

  const {
    handleCopyHsCode,
    handleSelectAlternative,
    handleResetToOriginal
  } = useHsCodeActions(setItemsData);

  // Group items by invoice ID
  const groupedItems = groupItemsByInvoice(enrichedData);

  // Render separator between invoices
  const renderSeparator = () => (
    <tr>
      <td colSpan={3} className="py-0">
        <Separator className="my-2 bg-custom-gray-200" />
      </td>
    </tr>
  );

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
          <table className="w-full">
            <thead>
              <tr className="bg-custom-gray-50 border-b border-custom-gray-200">
                <th className="text-left py-3 px-4 font-medium text-custom-gray-600 text-sm w-[30%]">HS Code</th>
                <th className="text-left py-3 px-4 font-medium text-custom-gray-600 text-sm w-[50%]">Product Description</th>
                <th className="text-left py-3 px-4 font-medium text-custom-gray-600 text-sm w-[20%]">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedItems).map(([invoiceId, items], groupIndex) => {
                const isComplete = isInvoiceComplete(invoiceId);
                const isExpanded = isInvoiceExpanded(invoiceId);
                
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
                      onSelectAlternative={handleSelectAlternative}
                      onResetToOriginal={handleResetToOriginal}
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
