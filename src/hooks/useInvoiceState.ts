
import { useState } from 'react';
import { useToast } from './use-toast';
import { CustomsItem } from '@/types/results';

export interface InvoiceState {
  completedInvoices: Record<string, boolean>;
  expandedInvoices: Record<string, boolean>;
  toggleInvoiceComplete: (invoiceId: string) => void;
  toggleInvoiceExpanded: (invoiceId: string) => void;
  groupItemsByInvoice: (items: CustomsItem[]) => Record<string, CustomsItem[]>;
  isInvoiceExpanded: (invoiceId: string) => boolean;
  isInvoiceComplete: (invoiceId: string) => boolean;
}

export function useInvoiceState(initialItems: CustomsItem[] = []): InvoiceState {
  const { toast } = useToast();
  const [completedInvoices, setCompletedInvoices] = useState<Record<string, boolean>>({});
  const [expandedInvoices, setExpandedInvoices] = useState<Record<string, boolean>>({});

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

  const groupItemsByInvoice = (items: CustomsItem[]): Record<string, CustomsItem[]> => {
    const groupedItems: Record<string, CustomsItem[]> = {};
    
    items.forEach(item => {
      const id = item.invoiceId || '1';
      if (!groupedItems[id]) {
        groupedItems[id] = [];
      }
      groupedItems[id].push(item);
    });
    
    return groupedItems;
  };

  const isInvoiceExpanded = (invoiceId: string): boolean => {
    const isComplete = completedInvoices[invoiceId] || false;
    // An invoice is expanded if it's explicitly set to true OR if it's not complete and not explicitly set to false
    return expandedInvoices[invoiceId] === true || 
      (!isComplete && expandedInvoices[invoiceId] !== false);
  };

  const isInvoiceComplete = (invoiceId: string): boolean => {
    return completedInvoices[invoiceId] || false;
  };

  return {
    completedInvoices,
    expandedInvoices,
    toggleInvoiceComplete,
    toggleInvoiceExpanded,
    groupItemsByInvoice,
    isInvoiceExpanded,
    isInvoiceComplete
  };
}
