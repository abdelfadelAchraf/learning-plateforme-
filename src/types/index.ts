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
  duration: number; // in minutes
}

export interface Exercise {
  id: string;
  title: string;
  question: string;
  type: 'multiple-choice' | 'code' | 'text';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
  difficulty: number; // 1-5
  subject: Subject;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: ExamQuestion[];
  passingGrade: number; // 0-100
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

export interface UserProgress {
  userId: string;
  courseProgress: CourseProgress[];
  completedExercises: string[];
  examResults: ExamResult[];
}

export interface CourseProgress {
  courseId: string;
  completedChapters: string[];
  lastAccessed: Date;
  progressPercentage: number;
}

export interface ExamResult {
  examId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: Date;
  passed: boolean;
}