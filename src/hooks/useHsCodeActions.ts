import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CustomsItem } from '@/types/results';

export const useHsCodeActions = (
  setItemsData: React.Dispatch<React.SetStateAction<CustomsItem[]>>
) => {
  const { toast } = useToast();

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

  const handleSelectAlternative = (alternativeHsCode: string, originalItem: CustomsItem) => {
    // Update the items array with the selected alternative
    setItemsData(prevItems => 
      prevItems.map(item => {
        if (item === originalItem) {
          // Find the alternative in the original item
          const selectedAlt = originalItem.alternatives?.find(
            alt => alt.hsCode === alternativeHsCode
          );
          
          if (selectedAlt) {
            // Create new alternatives array without the selected one
            const updatedAlternatives = originalItem.alternatives?.filter(
              alt => alt.hsCode !== alternativeHsCode
            ) || [];
            
            // Add the original as an alternative if this is the first change
            if (!item.isAlternativeSelected) {
              updatedAlternatives.unshift({
                hsCode: originalItem.hsCode,
                description: originalItem.description,
                confidence: originalItem.confidence || 0
              });
            }
            
            // Return updated item with the selected alternative as the main HS code
            return {
              ...item,
              hsCode: selectedAlt.hsCode,
              description: selectedAlt.description, 
              confidence: selectedAlt.confidence,
              isAlternativeSelected: true,
              originalHsCode: item.originalHsCode || originalItem.hsCode,
              alternatives: updatedAlternatives
            };
          }
        }
        return item;
      })
    );

    toast({
      title: "HS Code changed",
      description: `Changed to ${alternativeHsCode}`,
    });
  };

  const handleResetToOriginal = (item: CustomsItem) => {
    if (!item.originalHsCode) return;
    
    setItemsData(prevItems => 
      prevItems.map(prevItem => {
        if (prevItem === item && prevItem.originalHsCode) {
          // Find the original in alternatives
          const originalAlt = prevItem.alternatives?.find(
            alt => alt.hsCode === prevItem.originalHsCode
          );
          
          if (originalAlt) {
            // Return item with original values restored
            return {
              ...prevItem,
              hsCode: prevItem.originalHsCode,
              description: originalAlt.description,
              confidence: originalAlt.confidence,
              isAlternativeSelected: false,
              originalHsCode: undefined,
              // Keep alternatives but remove the original from alternatives
              alternatives: prevItem.alternatives?.filter(
                alt => alt.hsCode !== prevItem.originalHsCode
              )
            };
          } else {
            // If original not found in alternatives, just reset
            return {
              ...prevItem,
              hsCode: prevItem.originalHsCode,
              isAlternativeSelected: false,
              originalHsCode: undefined
            };
          }
        }
        return prevItem;
      })
    );

    toast({
      title: "HS Code reset",
      description: `Restored original HS Code`,
    });
  };

  return {
    handleCopyHsCode,
    handleSelectAlternative,
    handleResetToOriginal
  };
};
