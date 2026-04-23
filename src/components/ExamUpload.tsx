import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera, Upload, FileText, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import useStore from '../store';
import { handleFileUpload, scanExamPaper } from '../utils';

const ExamUpload: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addExamPaper, setCurrentPaper, setLoading } = useStore();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [], 'application/pdf': [] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      try {
        setLoading(true);
        setError(null);
        const imageUrl = await handleFileUpload(file);
        setIsScanning(true);
        const paper = await scanExamPaper(imageUrl);
        addExamPaper(paper);
        setCurrentPaper(paper);
      } catch (err) {
        setError('上传失败，请重试');
        console.error('上传失败:', err);
      } finally {
        setIsScanning(false);
        setLoading(false);
      }
    }
  });

  const handleCameraUpload = async () => {
    // 实际项目中需要调用摄像头API
    try {
      setLoading(true);
      setError(null);
      // 模拟摄像头拍照
      const mockImageUrl = 'https://example.com/camera/image.jpg';
      setIsScanning(true);
      const paper = await scanExamPaper(mockImageUrl);
      addExamPaper(paper);
      setCurrentPaper(paper);
    } catch (err) {
      setError('拍照失败，请重试');
      console.error('拍照失败:', err);
    } finally {
      setIsScanning(false);
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>导入试卷</CardTitle>
        <CardDescription>通过拍照、扫描或上传文件的方式导入试卷</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>错误</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary hover:bg-primary/5'
          }`}
        >
          <input {...getInputProps()} />
          {isScanning ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg font-medium">正在扫描试卷...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Upload className="h-12 w-12 text-gray-400" />
              <p className="text-lg font-medium">拖拽文件到此处或点击上传</p>
              <p className="text-sm text-gray-500">支持图片和PDF文件</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <Button 
            onClick={handleCameraUpload} 
            disabled={isScanning}
            className="flex items-center gap-2"
          >
            <Camera className="h-4 w-4" />
            拍照扫描
          </Button>
          <Button 
            variant="secondary" 
            disabled={isScanning}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            选择文件
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamUpload;
