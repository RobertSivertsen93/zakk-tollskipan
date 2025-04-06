
import React from 'react';
import { Copy, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { HsCodeInfo } from './HsCodeInfo';
import { CustomsItem } from '@/types/results';
import { getConfidenceColor, getConfidenceTextColor } from '@/utils/hsCodeUtils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface CustomsItemRowProps {
  item: CustomsItem;
  index: number;
  onCopyHsCode: (hsCode: string) => void;
  onSelectAlternative?: (alternativeHsCode: string, originalItem: CustomsItem) => void;
}

export const CustomsItemRow: React.FC<CustomsItemRowProps> = ({ 
  item, 
  index,
  onCopyHsCode,
  onSelectAlternative
}) => {
  const hasAlternatives = item.alternatives && item.alternatives.length > 0;

  const handleSelectAlternative = (alternativeHsCode: string) => {
    if (onSelectAlternative) {
      onSelectAlternative(alternativeHsCode, item);
    }
  };

  return (
    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-custom-gray-50'}>
      <td className="px-4 py-3 border-t border-custom-gray-200">
        <div className="flex items-center gap-2 font-mono">
          {hasAlternatives ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-custom-blue-600 transition-colors">
                {item.hsCode}
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80">
                <div className="py-1 px-2 text-xs text-custom-gray-500 border-b">
                  Alternative suggestions:
                </div>
                {item.alternatives?.map((alt) => (
                  <DropdownMenuItem
                    key={alt.hsCode}
                    className="flex justify-between items-center gap-2"
                    onClick={() => handleSelectAlternative(alt.hsCode)}
                  >
                    <div className="font-mono">{alt.hsCode}</div>
                    <div className="text-xs truncate flex-1">{alt.description}</div>
                    <div className={`${getConfidenceColor(alt.confidence)} ${getConfidenceTextColor(alt.confidence)} text-center rounded px-1.5 py-0.5 text-xs`}>
                      {alt.confidence}%
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            item.hsCode
          )}
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
