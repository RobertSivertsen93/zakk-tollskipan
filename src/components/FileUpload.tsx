
import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      toast({
        title: "Unsupported file format",
        description: "Please upload a PDF file.",
        variant: "destructive"
      });
      return false;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
        toast({
          title: "File uploaded",
          description: `${file.name} has been uploaded successfully.`
        });
      }
    }
  }, [onFileSelect, toast]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
        toast({
          title: "File uploaded",
          description: `${file.name} has been uploaded successfully.`
        });
      }
    }
  }, [onFileSelect, toast]);

  const handleButtonClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  return (
    <div 
      className={`file-drop-area ${isDragging ? 'active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mb-4 rounded-full bg-custom-blue-100 p-4">
        <Upload 
          className="h-8 w-8 text-custom-blue-500 animate-pulse-upload" 
          strokeWidth={1.5} 
        />
      </div>
      <p className="text-custom-gray-400 text-center mb-6">
        Vel ella slepp PDF fílu her
      </p>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="application/pdf"
        className="hidden"
      />
      <Button 
        onClick={handleButtonClick}
        className="bg-custom-blue-500 hover:bg-custom-blue-600 text-white"
      >
        <FileText className="mr-2 h-4 w-4" />
        Vel fílu
      </Button>
    </div>
  );
}
