
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PdfPreviewProps {
  file: File | null;
}

export default function PdfPreview({ file }: PdfPreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(100);
  
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

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  if (!file) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-custom-gray-50 rounded-md border border-dashed border-custom-gray-300">
        <p className="text-custom-gray-400">No document available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* PDF Controls */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-custom-gray-500">
          <span className="font-medium mr-2">File:</span> 
          {file?.name}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            className="h-8 w-8 p-0"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium w-16 text-center">
            {zoom}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            className="h-8 w-8 p-0"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetZoom}
            className="h-8 flex items-center gap-1"
          >
            <RotateCw className="h-3 w-3" />
            <span className="text-xs">Reset</span>
          </Button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden border border-custom-gray-200 rounded-md bg-white">
        {loading ? (
          <div className="w-full h-[600px] flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        ) : (
          <div 
            className="w-full h-[600px] overflow-auto bg-custom-gray-100" 
            style={{ padding: zoom > 100 ? '1rem' : '0' }}
          >
            <div style={{ 
              width: `${zoom}%`, 
              margin: '0 auto',
              transformOrigin: 'top center'
            }}>
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                className="w-full h-[600px] border-0 bg-white shadow-md"
                title="PDF Preview"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
