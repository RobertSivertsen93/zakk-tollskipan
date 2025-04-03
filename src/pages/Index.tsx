
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '@/components/FileUpload';
import { Toaster } from '@/components/ui/toaster';

interface CustomsItem {
  hsCode: string;
  description: string;
}

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFile: File) => {
    setIsProcessing(true);
    
    // Simulate processing delay - in a real app, this would be an API call
    setTimeout(() => {
      // Mock results for demonstration purposes
      const results = [
        { hsCode: '8471.30.0100', description: 'Laptop computers, weight < 10kg' },
        { hsCode: '8523.51.0000', description: 'Solid-state non-volatile storage devices' }
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
    <div className="min-h-screen bg-custom-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-custom-blue-600 mb-2">
            Customs HS Code Extractor
          </h1>
          <p className="text-custom-gray-400 max-w-2xl mx-auto">
            Upload your customs document and we'll automatically extract the HS codes 
            and product descriptions for your goods.
          </p>
        </header>

        <div className="space-y-8">
          <FileUpload onFileSelect={handleFileSelect} />
          
          {isProcessing && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-custom-blue-600 mb-2"></div>
              <p className="text-custom-gray-500">Processing your document...</p>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
