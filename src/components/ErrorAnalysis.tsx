import React, { useEffect } from 'react';
import { BarChart3, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import useStore from '../store';
import { analyzeErrorPoints, generateReviewQuestions, matchPastExamQuestions } from '../utils';

const ErrorAnalysis: React.FC = () => {
  const { currentPaper, errorPoints, setErrorPoints, setReviewQuestions, setPastExamQuestions } = useStore();

  useEffect(() => {
    if (currentPaper) {
      const points = analyzeErrorPoints(currentPaper);
      setErrorPoints(points);
      
      // 生成复习题和匹配历年真题
      const reviewQuestions = generateReviewQuestions(points);
      const pastExamQuestions = matchPastExamQuestions(points);
      setReviewQuestions(reviewQuestions);
      setPastExamQuestions(pastExamQuestions);
    }
  }, [currentPaper, setErrorPoints, setReviewQuestions, setPastExamQuestions]);

  if (!currentPaper) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>错误分析</CardTitle>
          <CardDescription>请先导入试卷进行分析</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <AlertTriangle className="h-12 w-12 mb-4" />
            <p>暂无试卷数据</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalQuestions = currentPaper.questions.length;
  const correctQuestions = currentPaper.questions.filter(q => q.isCorrect).length;
  const errorQuestions = totalQuestions - correctQuestions;
  const correctRate = (correctQuestions / totalQuestions) * 100;

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>试卷概览</CardTitle>
          <CardDescription>{currentPaper.name} - {currentPaper.subject}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">总题数</p>
              <p className="text-2xl font-bold">{totalQuestions}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">正确题数</p>
              <p className="text-2xl font-bold text-green-500">{correctQuestions}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">错误题数</p>
              <p className="text-2xl font-bold text-red-500">{errorQuestions}</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">正确率</span>
              <span className="text-sm font-medium">{correctRate.toFixed(1)}%</span>
            </div>
            <Progress value={correctRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>错误点分析</CardTitle>
          <CardDescription>按知识点分类的错误统计</CardDescription>
        </CardHeader>
        <CardContent>
          {errorPoints.length > 0 ? (
            <div className="space-y-4">
              {errorPoints.map((point) => (
                <div key={point.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{point.knowledgePoint}</Badge>
                      <span className="text-sm text-gray-500">{point.questionCount} 题</span>
                    </div>
                    <span className="text-sm font-medium">{((point.frequency) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={point.frequency * 100} className="h-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <BarChart3 className="h-12 w-12 mb-4" />
              <p>暂无错误数据</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorAnalysis;
