
import React from 'react';
import { Info } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { getHsCodeHierarchy } from '@/utils/hsCodeUtils';

interface HsCodeInfoProps {
  hsCode: string;
}

export const HsCodeInfo: React.FC<HsCodeInfoProps> = ({ hsCode }) => {
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
