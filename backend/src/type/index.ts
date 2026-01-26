export interface User {
  id: string;
  name: string;
  email: string;
  preferredLanguage: 'fr' | 'en';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Exercise {
  id: string;
  title: string;
  question: string;
  explanation: string;
  subject: Subject;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  questions: ExamQuestion[];
  subject: Subject;
}

export interface ExamQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string;
  points: number;
}

export type Subject = 
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'computerScience'
  | 'history'
  | 'geography'
  | 'languages';





export interface ExamResult {
  examId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: Date;
  passed: boolean;
}