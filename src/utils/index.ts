import type { ExamPaper, ErrorPoint, ReviewQuestion, PastExamQuestion } from '../types';

// 生成唯一ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// 处理文件上传
export const handleFileUpload = async (file: File): Promise<string> => {
  // 模拟文件上传，实际项目中需要调用后端API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://example.com/uploads/${file.name}`);
    }, 1000);
  });
};

// 模拟试卷扫描和识别
export const scanExamPaper = async (imageUrl: string): Promise<ExamPaper> => {
  // 模拟OCR识别过程，实际项目中需要调用OCR API
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockPaper: ExamPaper = {
        id: generateId(),
        name: '模拟试卷',
        subject: '数学',
        grade: '高中',
        date: new Date().toISOString(),
        imageUrl,
        questions: [
          {
            id: generateId(),
            content: '1 + 1 = ?',
            options: ['A. 1', 'B. 2', 'C. 3', 'D. 4'],
            correctAnswer: 'B',
            userAnswer: 'A',
            isCorrect: false,
            difficulty: 'easy',
            knowledgePoints: ['基础运算']
          },
          {
            id: generateId(),
            content: '2 + 2 = ?',
            options: ['A. 3', 'B. 4', 'C. 5', 'D. 6'],
            correctAnswer: 'B',
            userAnswer: 'B',
            isCorrect: true,
            difficulty: 'easy',
            knowledgePoints: ['基础运算']
          },
          {
            id: generateId(),
            content: '3 × 3 = ?',
            options: ['A. 6', 'B. 7', 'C. 8', 'D. 9'],
            correctAnswer: 'D',
            userAnswer: 'C',
            isCorrect: false,
            difficulty: 'medium',
            knowledgePoints: ['乘法运算']
          }
        ]
      };
      resolve(mockPaper);
    }, 2000);
  });
};

// 分析错误点
export const analyzeErrorPoints = (paper: ExamPaper): ErrorPoint[] => {
  const errorMap = new Map<string, { count: number; questions: string[] }>();
  
  paper.questions.forEach(question => {
    if (!question.isCorrect) {
      question.knowledgePoints.forEach(point => {
        if (errorMap.has(point)) {
          const existing = errorMap.get(point)!;
          errorMap.set(point, {
            count: existing.count + 1,
            questions: [...existing.questions, question.id]
          });
        } else {
          errorMap.set(point, {
            count: 1,
            questions: [question.id]
          });
        }
      });
    }
  });
  
  const totalErrors = paper.questions.filter(q => !q.isCorrect).length;
  
  return Array.from(errorMap.entries()).map(([knowledgePoint, data]) => ({
    id: generateId(),
    knowledgePoint,
    questionCount: data.count,
    frequency: totalErrors > 0 ? data.count / totalErrors : 0,
    relatedQuestions: data.questions
  })).sort((a, b) => b.frequency - a.frequency);
};

// 生成复习题
export const generateReviewQuestions = (errorPoints: ErrorPoint[]): ReviewQuestion[] => {
  // 模拟复习题生成，实际项目中需要调用AI API
  const mockQuestions: ReviewQuestion[] = [];
  
  errorPoints.forEach(point => {
    for (let i = 0; i < 2; i++) {
      mockQuestions.push({
        id: generateId(),
        content: `关于${point.knowledgePoint}的复习题 ${i + 1}`,
        options: ['A. 选项1', 'B. 选项2', 'C. 选项3', 'D. 选项4'],
        correctAnswer: 'B',
        difficulty: 'medium',
        knowledgePoints: [point.knowledgePoint],
        source: 'generated',
        relatedErrorPoint: point.id
      });
    }
  });
  
  return mockQuestions;
};

// 匹配历年真题
export const matchPastExamQuestions = (errorPoints: ErrorPoint[]): PastExamQuestion[] => {
  // 模拟历年真题匹配，实际项目中需要从数据库查询
  const mockPastQuestions: PastExamQuestion[] = [];
  
  errorPoints.forEach(point => {
    for (let i = 0; i < 1; i++) {
      mockPastQuestions.push({
        id: generateId(),
        content: `2023年高考关于${point.knowledgePoint}的真题`,
        options: ['A. 选项1', 'B. 选项2', 'C. 选项3', 'D. 选项4'],
        correctAnswer: 'C',
        difficulty: 'hard',
        knowledgePoints: [point.knowledgePoint],
        examYear: 2023,
        examName: '高考'
      });
    }
  });
  
  return mockPastQuestions;
};
