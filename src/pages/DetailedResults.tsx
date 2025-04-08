
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, Search, HelpCircle, Download, Printer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { InvoiceDetails } from '@/types/results';
import { InvoiceInfoSection } from '@/components/detailed-results/InvoiceInfoSection';
import { LineItemsTable } from '@/components/detailed-results/LineItemsTable';
import PdfPreview from '@/components/PdfPreview';

const DetailedResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];
  
  // Get the file from location state or set to null
  const locationState = location.state || {};
  const file = locationState.file || null;
  
  // Sample invoice data
  const [invoiceData, setInvoiceData] = useState<InvoiceDetails>({
    invoiceNumber: "INV-2025-0042",
    invoiceDate: "2025-03-12",
    dueDate: "2025-03-12",
    sender: "Tech Imports Inc.",
    reference: "Spring Electronics Import",
    documentNumber: "DOC-2025-153",
    currency: "USD",
    items: [
      {
        hsCode: "8471.60.10",
        description: "Computer keyboards",
        confidence: 98,
        invoiceId: "INV-2025-0042",
        itemNumber: "KB-2023-MECH",
        countryOfOrigin: "China",
        quantity: 50,
        netWeight: 125,
        totalPrice: 2500,
        alternatives: [
          {
            hsCode: "8471.60.20",
            description: "Computer input or output units",
            confidence: 92
          }
        ]
      },
      {
        hsCode: "8471.50.01",
        description: "Processing units for personal computers",
        confidence: 95,
        invoiceId: "INV-2025-0042",
        itemNumber: "CPU-i9-12900K",
        countryOfOrigin: "Taiwan",
        quantity: 25,
        netWeight: 250,
        totalPrice: 12000,
        alternatives: [
          {
            hsCode: "8471.41.00",
            description: "Processing units with storage and input/output units",
            confidence: 91
          }
        ]
      },
      {
        hsCode: "8523.51.00",
        description: "Solid-state storage devices (SSDs)",
        confidence: 92,
        invoiceId: "INV-2025-0042",
        itemNumber: "SSD-1TB-NVMe",
        countryOfOrigin: "South Korea",
        quantity: 100,
        netWeight: 50,
        totalPrice: 8000,
        alternatives: [
          {
            hsCode: "8523.52.00",
            description: "Smart cards",
            confidence: 75
          }
        ]
      }
    ]
  });

  const handleBack = () => {
    navigate('/results');
  };

  const handleSaveInvoice = () => {
    toast({
      title: "Invoice processed",
      description: "All changes have been saved successfully",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Printing document",
      description: "Sending document to printer...",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "Data exported to CSV format",
    });
  };

  return (
    <div className="min-h-screen bg-custom-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center gap-2 text-black border-custom-gray-200 hover:bg-custom-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Results
            </Button>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={handlePrint}
                className="flex items-center gap-2"
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button 
                variant="outline"
                onClick={handleExport}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button 
                variant="default"
                onClick={handleSaveInvoice}
                className="bg-custom-blue-500 hover:bg-custom-blue-600"
              >
                Save Invoice
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Left column - PDF Preview */}
            <div className="lg:col-span-2">
              <Card className="border border-custom-gray-200 h-full shadow-sm bg-white">
                <CardContent className="p-0 h-full">
                  <div className="p-4 bg-custom-gray-50 border-b border-custom-gray-200">
                    <h2 className="text-lg font-medium text-black">
                      Document Preview
                    </h2>
                  </div>
                  <div className="p-4 h-[calc(100%-64px)] min-h-[600px]">
                    {file ? (
                      <PdfPreview file={file} />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-custom-gray-50 rounded-md border border-dashed border-custom-gray-300">
                        <p className="text-custom-gray-400">
                          No document preview available
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - Invoice Info and Line Items */}
            <div className="lg:col-span-3 space-y-6">
              <InvoiceInfoSection invoice={invoiceData} onUpdate={setInvoiceData} />
              <LineItemsTable 
                items={invoiceData.items} 
                onItemsChange={(updatedItems) => {
                  setInvoiceData(prev => ({
                    ...prev,
                    items: updatedItems
                  }));
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedResults;
