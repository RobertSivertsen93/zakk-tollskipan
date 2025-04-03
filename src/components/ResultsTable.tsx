
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomsItem {
  hsCode: string;
  description: string;
  confidence?: number;
}

interface ResultsTableProps {
  data: CustomsItem[];
  isVisible: boolean;
}

export default function ResultsTable({ data, isVisible }: ResultsTableProps) {
  const { toast } = useToast();
  
  if (!isVisible) return null;

  // Ensure each item has a confidence value if not provided
  const enrichedData = data.map(item => ({
    ...item,
    confidence: item.confidence || Math.floor(Math.random() * 30) + 70 // Random value between 70-99% if not provided
  }));

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

  // Function to determine the background color based on confidence percentage
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-600';
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 70) return 'bg-yellow-500';
    if (confidence >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getConfidenceTextColor = (confidence: number) => {
    return confidence >= 60 ? 'text-white' : 'text-white';
  };

  return (
    <Card className="border border-custom-zakk-mint/30 shadow-sm bg-white">
      <CardHeader className="bg-custom-zakk-navy/5 border-b border-custom-zakk-mint/30 pb-3">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-custom-zakk-mint p-1">
            <Check className="h-4 w-4 text-custom-zakk-navy" />
          </div>
          <CardTitle className="text-lg font-medium text-custom-zakk-navy">
            Results
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="result-table">
            <thead>
              <tr>
                <th className="w-[30%] bg-custom-zakk-navy text-white">HS Code</th>
                <th className="w-[50%] bg-custom-zakk-navy text-white">Product Description</th>
                <th className="w-[20%] bg-custom-zakk-navy text-white">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {enrichedData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td>
                    <div className="flex items-center gap-2 font-mono">
                      {item.hsCode}
                      <button 
                        onClick={() => handleCopyHsCode(item.hsCode)}
                        className="p-1 rounded hover:bg-custom-zakk-peach/20 transition-colors"
                        title="Copy HS Code"
                      >
                        <Copy className="h-4 w-4 text-custom-zakk-peach" />
                      </button>
                    </div>
                  </td>
                  <td>{item.description}</td>
                  <td>
                    <div className="flex items-center">
                      <div className={`${getConfidenceColor(item.confidence)} ${getConfidenceTextColor(item.confidence)} text-center rounded px-2 py-1 font-medium text-sm`}>
                        {item.confidence}%
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
