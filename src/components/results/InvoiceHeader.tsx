
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface InvoiceHeaderProps {
  invoiceId: string;
  isComplete: boolean;
  isExpanded: boolean;
  onToggleComplete: (invoiceId: string) => void;
  onToggleExpand: (invoiceId: string) => void;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  invoiceId,
  isComplete,
  isExpanded,
  onToggleComplete,
  onToggleExpand
}) => {
  return (
    <tr className={isComplete ? "opacity-60 bg-gray-50" : ""}>
      <td colSpan={3} className="py-2">
        <div className="flex items-center justify-between py-2 px-4">
          <div className="flex items-center gap-3">
            <Checkbox 
              id={`invoice-${invoiceId}`}
              checked={isComplete}
              onCheckedChange={() => onToggleComplete(invoiceId)}
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
            onClick={() => onToggleExpand(invoiceId)}
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
