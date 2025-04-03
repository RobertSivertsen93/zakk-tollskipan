
import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import PdfPreview from '@/components/PdfPreview';
import ResultsTable from '@/components/ResultsTable';
import { Toaster } from '@/components/ui/toaster';

interface CustomsItem {
  hsCode: string;
  description: string;
}

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<CustomsItem[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    
    // Simulate processing delay - in a real app, this would be an API call
    setTimeout(() => {
      // Mock results for demonstration purposes
      setResults([
        { hsCode: '8471.30.0100', description: 'Laptop computers, weight < 10kg' },
        { hsCode: '8523.51.0000', description: 'Solid-state non-volatile storage devices' }
      ]);
      setShowResults(true);
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
          {!file && (
            <FileUpload onFileSelect={handleFileSelect} />
          )}

          {file && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-lg font-medium text-custom-blue-600 mb-4">
                  Document Preview
                </h2>
                <PdfPreview file={file} />
              </div>
              <div>
                <h2 className="text-lg font-medium text-custom-blue-600 mb-4">
                  Extracted Information
                </h2>
                <ResultsTable data={results} isVisible={showResults} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
