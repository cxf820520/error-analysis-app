import React from 'react';
import { BookOpen, FileQuestion, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import useStore from '../store';

const ReviewQuestions: React.FC = () => {
  const { reviewQuestions, pastExamQuestions } = useStore();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>复习题生成</CardTitle>
        <CardDescription>基于错误点生成的针对性复习题和历年真题</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generated">
          <TabsList className="mb-4">
            <TabsTrigger value="generated">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                生成复习题
              </div>
            </TabsTrigger>
            <TabsTrigger value="past">
              <div className="flex items-center gap-2">
                <FileQuestion className="h-4 w-4" />
                历年真题
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generated">
            {reviewQuestions.length > 0 ? (
              <div className="space-y-4">
                {reviewQuestions.map((question, index) => (
                  <div key={question.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{index + 1}. {question.content}</h4>
                      <Badge variant="outline">{question.difficulty === 'easy' ? '简单' : question.difficulty === 'medium' ? '中等' : '困难'}</Badge>
                    </div>
                    {question.options && (
                      <div className="space-y-2 mb-3">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center gap-2">
                            <input
                              type="radio"
                              id={`generated-${question.id}-${optIndex}`}
                              name={`generated-${question.id}`}
                              className="h-4 w-4 text-primary"
                            />
                            <label htmlFor={`generated-${question.id}-${optIndex}`} className="text-sm">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2 flex-wrap">
                      {question.knowledgePoints.map((point) => (
                        <Badge key={point} variant="secondary" className="text-xs">
                          {point}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <BookOpen className="h-12 w-12 mb-4" />
                <p>暂无生成的复习题</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastExamQuestions.length > 0 ? (
              <div className="space-y-4">
                {pastExamQuestions.map((question, index) => (
                  <div key={question.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{index + 1}. {question.content}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{question.difficulty === 'easy' ? '简单' : question.difficulty === 'medium' ? '中等' : '困难'}</Badge>
                        <Badge variant="default" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {question.examYear}年
                        </Badge>
                      </div>
                    </div>
                    {question.options && (
                      <div className="space-y-2 mb-3">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center gap-2">
                            <input
                              type="radio"
                              id={`past-${question.id}-${optIndex}`}
                              name={`past-${question.id}`}
                              className="h-4 w-4 text-primary"
                            />
                            <label htmlFor={`past-${question.id}-${optIndex}`} className="text-sm">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2 flex-wrap">
                      {question.knowledgePoints.map((point) => (
                        <Badge key={point} variant="secondary" className="text-xs">
                          {point}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-xs">
                        {question.examName}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <FileQuestion className="h-12 w-12 mb-4" />
                <p>暂无匹配的历年真题</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReviewQuestions;
