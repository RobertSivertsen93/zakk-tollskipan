
import React, { useEffect } from 'react';
import PdfPreview from '@/components/PdfPreview';
import ResultsTable from '@/components/ResultsTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface CustomsItem {
  hsCode: string;
  description: string;
  confidence?: number;
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Safely access location.state with default values
  const locationState = location.state || {};
  const file = locationState.file || null;
  const results = locationState.results || [];

  // Redirect to home if no data is present
  useEffect(() => {
    if (!file && !results.length) {
      navigate('/', { 
        replace: true,
        state: { 
          error: 'No document data found. Please upload a document first.' 
        }
      });
    }
  }, [file, results, navigate]);

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
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <Package className="h-10 w-10 text-black mr-2" />
            <h1 className="text-4xl font-light tracking-tight text-black">
              Zakk
            </h1>
          </div>
        </header>

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
              <ResultsTable data={results} isVisible={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
