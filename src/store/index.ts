import { create } from 'zustand';
import type { UserState, ExamPaper, ErrorPoint, ReviewQuestion, PastExamQuestion } from '../types';

const useStore = create<UserState>((set) => ({
  examPapers: [],
  errorPoints: [],
  reviewQuestions: [],
  pastExamQuestions: [],
  currentPaper: null,
  isLoading: false,
  error: null,
  
  // 添加试卷
  addExamPaper: (paper: ExamPaper) => set((state) => ({
    examPapers: [...state.examPapers, paper]
  })),
  
  // 设置当前试卷
  setCurrentPaper: (paper: ExamPaper | null) => set({ currentPaper: paper }),
  
  // 更新错误点
  setErrorPoints: (points: ErrorPoint[]) => set({ errorPoints: points }),
  
  // 更新复习题
  setReviewQuestions: (questions: ReviewQuestion[]) => set({ reviewQuestions: questions }),
  
  // 更新历年真题
  setPastExamQuestions: (questions: PastExamQuestion[]) => set({ pastExamQuestions: questions }),
  
  // 设置加载状态
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  // 设置错误信息
  setError: (error: string | null) => set({ error }),
}));

export default useStore;
