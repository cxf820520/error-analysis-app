// 试卷类型
export interface ExamPaper {
  id: string;
  name: string;
  subject: string;
  grade: string;
  date: string;
  questions: Question[];
  imageUrl?: string;
}

// 题目类型
export interface Question {
  id: string;
  content: string;
  options?: string[];
  correctAnswer: string;
  userAnswer?: string;
  isCorrect: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  knowledgePoints: string[];
  analysis?: string;
}

// 错误点类型
export interface ErrorPoint {
  id: string;
  knowledgePoint: string;
  questionCount: number;
  frequency: number;
  relatedQuestions: string[];
}

// 复习题类型
export interface ReviewQuestion {
  id: string;
  content: string;
  options?: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  knowledgePoints: string[];
  source: 'generated' | 'past_exam';
  relatedErrorPoint?: string;
}

// 历年真题类型
export interface PastExamQuestion {
  id: string;
  content: string;
  options?: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  knowledgePoints: string[];
  examYear: number;
  examName: string;
}

// 用户状态类型
export interface UserState {
  examPapers: ExamPaper[];
  errorPoints: ErrorPoint[];
  reviewQuestions: ReviewQuestion[];
  pastExamQuestions: PastExamQuestion[];
  currentPaper: ExamPaper | null;
  isLoading: boolean;
  error: string | null;
  addExamPaper: (paper: ExamPaper) => void;
  setCurrentPaper: (paper: ExamPaper | null) => void;
  setErrorPoints: (points: ErrorPoint[]) => void;
  setReviewQuestions: (questions: ReviewQuestion[]) => void;
  setPastExamQuestions: (questions: PastExamQuestion[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
