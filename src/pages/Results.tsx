
import React from 'react';
import PdfPreview from '@/components/PdfPreview';
import ResultsTable from '@/components/ResultsTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface CustomsItem {
  hsCode: string;
  description: string;
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get the file and results from location state
  const { file, results } = location.state as { 
    file: File | null, 
    results: CustomsItem[] 
  };

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
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-custom-blue-600 mb-2">
            Customs HS Code Results
          </h1>
          <p className="text-custom-gray-400 max-w-2xl mx-auto">
            Here are the extracted HS codes and product descriptions from your document.
          </p>
        </header>

        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center gap-2 text-custom-blue-600 border-custom-blue-200 hover:bg-custom-blue-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Upload New Document
            </Button>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-medium text-custom-blue-600 mb-4">
                Document Preview
              </h2>
              {file && <PdfPreview file={file} />}
            </div>
            <div>
              <h2 className="text-lg font-medium text-custom-blue-600 mb-4">
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
