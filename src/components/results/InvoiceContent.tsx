
import React from 'react';
import { CustomsItemRow } from './CustomsItemRow';
import { CustomsItem } from '@/types/results';

interface InvoiceContentProps {
  items: CustomsItem[];
  isExpanded: boolean;
  isComplete: boolean;
  onCopyHsCode: (hsCode: string) => void;
}

export const InvoiceContent: React.FC<InvoiceContentProps> = ({
  items,
  isExpanded,
  isComplete,
  onCopyHsCode
}) => {
  if (!isExpanded) return null;
  
  return (
    <tr className={isComplete ? "opacity-60" : ""}>
      <td colSpan={3} className="p-0">
        <table className="w-full">
          <tbody>
            {items.map((item, index) => (
              <CustomsItemRow 
                key={`${item.invoiceId}-${index}`} 
                item={item} 
                index={index}
                onCopyHsCode={onCopyHsCode} 
              />
            ))}
          </tbody>
        </table>
      </td>
    </tr>
  );
};
