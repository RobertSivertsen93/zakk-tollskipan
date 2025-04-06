
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface PdfPreviewProps {
  file: File | null;
}

export default function PdfPreview({ file }: PdfPreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (file) {
      setLoading(true);
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setLoading(false);
      
      // Clean up URL when component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPdfUrl(null);
    }
  }, [file]);

  if (!file) {
    return null;
  }

  return (
    <Card className="border border-custom-gray-200 shadow-sm bg-white overflow-hidden">
      <CardContent className="p-0">
        {loading ? (
          <div className="w-full h-[500px] flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        ) : (
          <div className="w-full h-[500px] overflow-hidden">
            <iframe
              src={`${pdfUrl}#toolbar=0`}
              className="w-full h-full border-0"
              title="PDF Preview"
            />
          </div>
        )}
        <div className="p-4 bg-custom-gray-50 border-t border-custom-gray-200">
          <p className="text-sm text-custom-gray-400 truncate">
            <span className="font-medium text-custom-gray-500 mr-2">File:</span> 
            {file?.name}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
