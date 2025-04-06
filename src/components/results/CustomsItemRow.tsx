
import React from 'react';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { HsCodeInfo } from './HsCodeInfo';
import { CustomsItem } from '@/types/results';
import { getConfidenceColor, getConfidenceTextColor } from '@/utils/hsCodeUtils';

interface CustomsItemRowProps {
  item: CustomsItem;
  index: number;
  onCopyHsCode: (hsCode: string) => void;
}

export const CustomsItemRow: React.FC<CustomsItemRowProps> = ({ 
  item, 
  index,
  onCopyHsCode
}) => {
  return (
    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-custom-gray-50'}>
      <td className="px-4 py-3 border-t border-custom-gray-200">
        <div className="flex items-center gap-2 font-mono">
          {item.hsCode}
          <div className="flex items-center">
            <button 
              onClick={() => onCopyHsCode(item.hsCode)}
              className="p-1 rounded hover:bg-custom-gray-100 transition-colors"
              title="Copy HS Code"
            >
              <Copy className="h-4 w-4 text-custom-blue-500" />
            </button>
            <HsCodeInfo hsCode={item.hsCode} />
          </div>
        </div>
      </td>
      <td className="px-4 py-3 border-t border-custom-gray-200">{item.description}</td>
      <td className="px-4 py-3 border-t border-custom-gray-200">
        <div className="flex items-center">
          <div className={`${getConfidenceColor(item.confidence || 0)} ${getConfidenceTextColor(item.confidence || 0)} text-center rounded px-2 py-1 font-medium text-sm`}>
            {item.confidence}%
          </div>
        </div>
      </td>
    </tr>
  );
};
