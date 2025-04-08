
import React, { useEffect } from 'react';
import PdfPreview from '@/components/PdfPreview';
import ResultsTable from '@/components/ResultsTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

interface CustomsItem {
  hsCode: string;
  description: string;
  confidence?: number;
  invoiceId?: string;
  alternatives?: Array<{
    hsCode: string;
    description: string;
    confidence: number;
  }>;
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];
  
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
      invoiceId: "1",
      alternatives: [
        {
          hsCode: "8471.60.20",
          description: "Computer input or output units",
          confidence: 92
        },
        {
          hsCode: "8471.60.90",
          description: "Other input or output units",
          confidence: 85
        }
      ]
    },
    {
      hsCode: "8471.50.01",
      description: "Processing units for personal computers",
      confidence: 95,
      invoiceId: "1",
      alternatives: [
        {
          hsCode: "8471.41.00",
          description: "Processing units with storage and input/output units",
          confidence: 91
        }
      ]
    },
    
    // Invoice 2
    {
      hsCode: "8517.12.00",
      description: "Mobile phones",
      confidence: 97,
      invoiceId: "2",
      alternatives: [
        {
          hsCode: "8517.18.00",
          description: "Other telephone sets",
          confidence: 85
        }
      ]
    },
    {
      hsCode: "8523.51.00",
      description: "Solid-state non-volatile storage devices",
      confidence: 92,
      invoiceId: "2",
      alternatives: [
        {
          hsCode: "8523.52.00",
          description: "Smart cards",
          confidence: 84
        },
        {
          hsCode: "8523.59.00",
          description: "Other semiconductor media",
          confidence: 78
        }
      ]
    },
    
    // Invoice 3
    {
      hsCode: "9503.00.00",
      description: "Toys and models with moving parts",
      confidence: 85,
      invoiceId: "3",
      alternatives: [
        {
          hsCode: "9504.90.00",
          description: "Other articles for funfair or table games",
          confidence: 79
        }
      ]
    },
    {
      hsCode: "9504.50.00",
      description: "Video game consoles and machines",
      confidence: 91,
      invoiceId: "3",
      alternatives: [
        {
          hsCode: "8523.49.00",
          description: "Optical media for reproducing sound or image",
          confidence: 76
        },
        {
          hsCode: "9504.30.00",
          description: "Other games, operated by coins or tokens",
          confidence: 74
        }
      ]
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
      title: t.results.readyForNew,
      description: t.results.uploadDescription,
    });
  };

  const handleViewDetailed = () => {
    navigate('/detailed-results', { 
      state: { 
        file: file,
        results: sampleResults 
      }
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
              {t.results.uploadNew}
            </Button>
            
            <Button 
              variant="default"
              onClick={handleViewDetailed}
              className="flex items-center gap-2 bg-custom-blue-500 hover:bg-custom-blue-600"
            >
              View Detailed Results
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-medium text-black mb-4">
                {t.results.documentPreview}
              </h2>
              {file && <PdfPreview file={file} />}
            </div>
            <div>
              <h2 className="text-lg font-medium text-black mb-4">
                {t.results.extractedInfo}
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
