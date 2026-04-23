import React from 'react';
import { Paperclip, BarChart3, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import ExamUpload from '../components/ExamUpload';
import ErrorAnalysis from '../components/ErrorAnalysis';
import ReviewQuestions from '../components/ReviewQuestions';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">错题分析应用</h1>
        <p className="text-gray-600">导入试卷，分析错误点，生成针对性复习题</p>
      </div>

      <Tabs defaultValue="upload">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
          <TabsTrigger value="upload">
            <div className="flex items-center gap-2">
              <Paperclip className="h-4 w-4" />
              导入试卷
            </div>
          </TabsTrigger>
          <TabsTrigger value="analysis">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              错误分析
            </div>
          </TabsTrigger>
          <TabsTrigger value="review">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              复习题
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-8">
          <div className="flex justify-center">
            <ExamUpload />
          </div>
        </TabsContent>
        
        <TabsContent value="analysis" className="mt-8">
          <ErrorAnalysis />
        </TabsContent>
        
        <TabsContent value="review" className="mt-8">
          <ReviewQuestions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
