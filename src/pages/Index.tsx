
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FileUpload from '@/components/FileUpload';
import { useToast } from '@/hooks/use-toast';

interface CustomsItem {
  hsCode: string;
  description: string;
  confidence?: number;
}

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check for error message in location state
  useEffect(() => {
    const locationState = location.state as { error?: string } || {};
    if (locationState.error) {
      toast({
        title: "Error",
        description: locationState.error,
        variant: "destructive"
      });
      
      // Clear the location state to prevent the error from showing again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state, toast]);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a valid file to upload",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing delay - in a real app, this would be an API call
    setTimeout(() => {
      // Mock results for demonstration purposes
      const results = [
        { 
          hsCode: '8471.30.0100', 
          description: 'Laptop computers, weight < 10kg',
          confidence: 95
        },
        { 
          hsCode: '8523.51.0000', 
          description: 'Solid-state non-volatile storage devices',
          confidence: 85 
        },
        { 
          hsCode: '3926.90.9996', 
          description: 'Other articles of plastics',
          confidence: 72 
        }
      ];
      
      // Navigate to results page with file and results
      navigate('/results', { 
        state: { 
          file: selectedFile,
          results: results
        } 
      });
      
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/zakk-logo.png" 
              alt="Zakk Logo" 
              className="h-20"
            />
          </div>
        </header>

        <div className="space-y-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-custom-zakk-mint/30">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
          
          {isProcessing && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-custom-zakk-navy mb-2"></div>
              <p className="text-custom-zakk-navy">Processing your document...</p>
            </div>
          )}
          
          {/* Instructions below the upload area */}
          <div className="max-w-lg mx-auto">
            <div className="flex items-start space-x-3 mb-4">
              <div className="flex-shrink-0 bg-custom-zakk-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <p className="text-custom-zakk-navy">Upload your customs document or invoice PDF to automatically extract HS codes and product descriptions.</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 bg-custom-zakk-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <p className="text-custom-zakk-navy">Review the extracted information and return to upload additional documents as needed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
