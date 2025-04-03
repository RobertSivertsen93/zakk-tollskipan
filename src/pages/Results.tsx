
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/0c5a80cb-e7ce-4e19-8090-169465220591.png" 
              alt="Zakk Logo" 
              className="h-14"
            />
          </div>
        </header>

        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center gap-2 text-custom-zakk-navy border-custom-zakk-mint hover:bg-custom-zakk-mint/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Upload New Document
            </Button>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-medium text-custom-zakk-navy mb-4">
                Document Preview
              </h2>
              <div className="bg-white rounded-lg shadow-sm border border-custom-zakk-mint/30 overflow-hidden">
                {file && <PdfPreview file={file} />}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium text-custom-zakk-navy mb-4">
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
