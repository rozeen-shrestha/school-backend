import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { XIcon, UploadIcon, ImageIcon } from "lucide-react";

export default function FileUploadArea({ api, onUploadComplete, category }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));

    if (files.length + newFiles.length > 10) { // Limit to 10 files
      alert('You can only upload up to 10 files at a time.');
      return;
    }

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    }
  });

  const removeFile = (file) => {
    setFiles(prevFiles => prevFiles.filter(f => f !== file));
    URL.revokeObjectURL(file.preview);
  };

  const uploadFiles = async () => {
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('category', category);

    try {
      const response = await fetch(api, {
        method: 'POST',
        body: formData,
        headers: {
          // Add your authentication token here
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload successful:', result);
        setFiles([]);

        await fetch('/api/media/photo/category/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ category })
        });

        if (onUploadComplete) {
          onUploadComplete(result.files);
        }
      } else {
        console.error('Upload failed:', await response.text());
      }
    } catch (error) {
      console.error('Error during upload:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-8">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 text-center cursor-pointer transition-colors duration-200 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        >
          <input {...getInputProps()} />
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag 'n' drop some images here, or click to select files
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Supports: JPG, PNG, GIF, WebP
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-6 max-h-48 overflow-y-auto">
            <h4 className="text-sm font-medium mb-3">Selected Files:</h4>
            <ul className="space-y-2">
              {files.map((file) => (
                <li key={file.name} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-black truncate max-w-[200px]">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file)}
                    className="h-8 w-8"
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {files.length > 0 && (
          <Button
            className="mt-4 w-full"
            onClick={uploadFiles}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : `Upload ${files.length} File${files.length > 1 ? 's' : ''}`}
          </Button>
        )}

        {uploading && (
          <Progress value={uploadProgress} className="mt-2" />
        )}
      </CardContent>
    </Card>
  );
}
