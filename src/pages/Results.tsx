
import React, { useEffect } from 'react';
import PdfPreview from '@/components/PdfPreview';
import ResultsTable from '@/components/ResultsTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface CustomsItem {
  hsCode: string;
  description: string;
  confidence?: number;
  invoiceId?: string;
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Safely access location.state with default values
  const locationState = location.state || {};
  const file = locationState.file || null;
  
  // Sample data with multiple invoices
  const sampleResults: CustomsItem[] = locationState.results || [
    // Invoice 1
    {
      hsCode: "8471.60.10",
      description: "Computer keyboards",
      confidence: 98,
      invoiceId: "1"
    },
    {
      hsCode: "8471.50.01",
      description: "Processing units for personal computers",
      confidence: 95,
      invoiceId: "1"
    },
    
    // Invoice 2
    {
      hsCode: "8517.12.00",
      description: "Mobile phones",
      confidence: 97,
      invoiceId: "2"
    },
    {
      hsCode: "8523.51.00",
      description: "Solid-state non-volatile storage devices",
      confidence: 92,
      invoiceId: "2"
    },
    
    // Invoice 3
    {
      hsCode: "9503.00.00",
      description: "Toys and models with moving parts",
      confidence: 85,
      invoiceId: "3"
    },
    {
      hsCode: "9504.50.00",
      description: "Video game consoles and machines",
      confidence: 91,
      invoiceId: "3"
    }
  ];

  // Redirect to home if no data is present
  useEffect(() => {
    if (!file && !sampleResults.length) {
      navigate('/', { 
        replace: true,
        state: { 
          error: 'No document data found. Please upload a document first.' 
        }
      });
    }
  }, [file, sampleResults, navigate]);

  const handleBack = () => {
    navigate('/');
    toast({
      title: "Ready for new document",
      description: "You can now upload a new customs document",
    });
  };

  return (
    <div className="min-h-screen bg-custom-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center gap-2 text-black border-custom-gray-200 hover:bg-custom-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Upload New Document
            </Button>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-medium text-black mb-4">
                Document Preview
              </h2>
              {file && <PdfPreview file={file} />}
            </div>
            <div>
              <h2 className="text-lg font-medium text-black mb-4">
                Extracted Information
              </h2>
              <ResultsTable data={sampleResults} isVisible={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
