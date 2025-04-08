
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CustomsItem } from '@/types/results';
import { Plus, Trash2, Copy, ChevronDown, RefreshCw, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getConfidenceColor, getConfidenceTextColor } from '@/utils/hsCodeUtils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HsCodeInfo } from '../results/HsCodeInfo';

interface LineItemsTableProps {
  items: CustomsItem[];
  onItemsChange: (items: CustomsItem[]) => void;
}

export const LineItemsTable: React.FC<LineItemsTableProps> = ({
  items,
  onItemsChange
}) => {
  const { toast } = useToast();
  const [searchText, setSearchText] = useState('');

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
    const updatedItems = items.map(item => {
      if (item === originalItem) {
        const selectedAlt = originalItem.alternatives?.find(
          alt => alt.hsCode === alternativeHsCode
        );
        
        if (selectedAlt) {
          const updatedAlternatives = originalItem.alternatives?.filter(
            alt => alt.hsCode !== alternativeHsCode
          ) || [];
          
          if (!item.isAlternativeSelected) {
            updatedAlternatives.unshift({
              hsCode: originalItem.hsCode,
              description: originalItem.description,
              confidence: originalItem.confidence || 0
            });
          }
          
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
    });

    onItemsChange(updatedItems);
    
    toast({
      title: "HS Code changed",
      description: `Changed to ${alternativeHsCode}`,
    });
  };

  const handleResetToOriginal = (item: CustomsItem) => {
    if (!item.originalHsCode) return;
    
    const updatedItems = items.map(currentItem => {
      if (currentItem === item && currentItem.originalHsCode) {
        const originalAlt = currentItem.alternatives?.find(
          alt => alt.hsCode === currentItem.originalHsCode
        );
        
        if (originalAlt) {
          return {
            ...currentItem,
            hsCode: currentItem.originalHsCode,
            description: originalAlt.description,
            confidence: originalAlt.confidence,
            isAlternativeSelected: false,
            originalHsCode: undefined,
            alternatives: currentItem.alternatives?.filter(
              alt => alt.hsCode !== currentItem.originalHsCode
            )
          };
        } else {
          return {
            ...currentItem,
            hsCode: currentItem.originalHsCode,
            isAlternativeSelected: false,
            originalHsCode: undefined
          };
        }
      }
      return currentItem;
    });

    onItemsChange(updatedItems);
    
    toast({
      title: "HS Code reset",
      description: `Restored original HS Code`,
    });
  };

  const handleAddNewItem = () => {
    const newItem: CustomsItem = {
      hsCode: "",
      description: "",
      invoiceId: items[0]?.invoiceId,
      itemNumber: "",
      countryOfOrigin: "",
      quantity: 0,
      netWeight: 0,
      totalPrice: 0
    };
    
    onItemsChange([...items, newItem]);
    
    toast({
      title: "New item added",
      description: "Please fill in the details for the new item",
    });
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    onItemsChange(updatedItems);
    
    toast({
      title: "Item removed",
      description: "The line item has been removed from the invoice",
    });
  };

  const handleUpdateItemField = (index: number, field: keyof CustomsItem, value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    onItemsChange(updatedItems);
  };

  const filteredItems = searchText
    ? items.filter(item => 
        item.itemNumber?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase()) ||
        item.hsCode.toLowerCase().includes(searchText.toLowerCase()) ||
        item.countryOfOrigin?.toLowerCase().includes(searchText.toLowerCase())
      )
    : items;

  return (
    <Card className="border border-custom-gray-200 shadow-sm bg-white">
      <CardContent className="p-0">
        <div className="p-4 bg-custom-gray-50 border-b border-custom-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-black">
            Line Items
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-custom-gray-400" />
              <Input 
                placeholder="Search items..." 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-9 max-w-[250px]"
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleAddNewItem}
            >
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-custom-blue-50 hover:bg-custom-blue-50">
                <TableHead className="font-medium">Item Number <span className="text-red-500">*</span></TableHead>
                <TableHead className="font-medium">HS Code</TableHead>
                <TableHead className="font-medium">Description</TableHead>
                <TableHead className="font-medium">Country <span className="text-red-500">*</span></TableHead>
                <TableHead className="font-medium">Quantity <span className="text-red-500">*</span></TableHead>
                <TableHead className="font-medium">Net Weight <span className="text-red-500">*</span></TableHead>
                <TableHead className="font-medium">Total Price <span className="text-red-500">*</span></TableHead>
                <TableHead className="font-medium w-[80px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-custom-gray-400">
                    No items found. {searchText ? "Try a different search term." : "Add a new item to get started."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item, index) => (
                  <TableRow 
                    key={index} 
                    className={item.isAlternativeSelected ? "border-l-4 border-l-amber-400" : ""}
                  >
                    <TableCell>
                      <Input 
                        value={item.itemNumber || ''} 
                        onChange={(e) => handleUpdateItemField(index, 'itemNumber', e.target.value)}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 font-mono">
                        {item.alternatives && item.alternatives.length > 0 ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-custom-blue-600 transition-colors">
                              <span className={item.isAlternativeSelected ? "text-amber-600 font-semibold" : ""}>
                                {item.hsCode || 'Select HS Code'}
                              </span>
                              <ChevronDown className="h-3 w-3" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-80 bg-white z-10">
                              <div className="py-1 px-2 text-xs text-custom-gray-500 border-b">
                                Alternative suggestions:
                              </div>
                              {item.alternatives?.map((alt) => (
                                <DropdownMenuItem
                                  key={alt.hsCode}
                                  className={`flex justify-between items-center gap-2 ${item.hsCode === alt.hsCode ? 'bg-amber-50' : ''}`}
                                  onClick={() => handleSelectAlternative(alt.hsCode, item)}
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
                          <Input 
                            value={item.hsCode} 
                            onChange={(e) => handleUpdateItemField(index, 'hsCode', e.target.value)}
                            className={`font-mono w-32 ${item.isAlternativeSelected ? "text-amber-600 font-semibold" : ""}`}
                          />
                        )}
                        <div className="flex items-center gap-1">
                          {item.isAlternativeSelected && item.originalHsCode && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button 
                                    onClick={() => handleResetToOriginal(item)}
                                    className="p-1 rounded hover:bg-custom-gray-100 transition-colors"
                                  >
                                    <RefreshCw className="h-4 w-4 text-amber-500" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Reset to original HS Code: {item.originalHsCode}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          <button 
                            onClick={() => handleCopyHsCode(item.hsCode)}
                            className="p-1 rounded hover:bg-custom-gray-100 transition-colors"
                          >
                            <Copy className="h-4 w-4 text-custom-blue-500" />
                          </button>
                          {item.hsCode && <HsCodeInfo hsCode={item.hsCode} />}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input 
                        value={item.description} 
                        onChange={(e) => handleUpdateItemField(index, 'description', e.target.value)}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        value={item.countryOfOrigin || ''} 
                        onChange={(e) => handleUpdateItemField(index, 'countryOfOrigin', e.target.value)}
                        className="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number"
                        value={item.quantity ?? ''} 
                        onChange={(e) => handleUpdateItemField(index, 'quantity', e.target.value ? Number(e.target.value) : undefined)}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number"
                        value={item.netWeight ?? ''} 
                        onChange={(e) => handleUpdateItemField(index, 'netWeight', e.target.value ? Number(e.target.value) : undefined)}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number"
                        value={item.totalPrice ?? ''} 
                        onChange={(e) => handleUpdateItemField(index, 'totalPrice', e.target.value ? Number(e.target.value) : undefined)}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(index)}
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="p-4 bg-custom-gray-50 border-t border-custom-gray-200 flex justify-between items-center">
          <div className="text-sm text-custom-gray-500">
            {filteredItems.length} items
          </div>
          <div className="text-sm font-medium">
            Total: {items.reduce((sum, item) => sum + (item.totalPrice || 0), 0).toLocaleString()} {items[0]?.invoiceId ? '' : 'USD'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
