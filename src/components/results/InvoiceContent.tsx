
import React from 'react';
import { CustomsItemRow } from './CustomsItemRow';
import { CustomsItem } from '@/types/results';

interface InvoiceContentProps {
  items: CustomsItem[];
  isExpanded: boolean;
  isComplete: boolean;
  onCopyHsCode: (hsCode: string) => void;
  onSelectAlternative?: (alternativeHsCode: string, originalItem: CustomsItem) => void;
}

export const InvoiceContent: React.FC<InvoiceContentProps> = ({ 
  items, 
  isExpanded, 
  isComplete,
  onCopyHsCode,
  onSelectAlternative
}) => {
  if (!isExpanded) return null;
  
  return (
    <>
      {items.map((item, index) => (
        <CustomsItemRow 
          key={`${item.hsCode}-${index}`} 
          item={item} 
          index={index}
          onCopyHsCode={onCopyHsCode}
          onSelectAlternative={onSelectAlternative}
        />
      ))}
    </>
  );
};
