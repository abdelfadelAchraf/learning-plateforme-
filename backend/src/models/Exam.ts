import mongoose, { Schema, Document } from 'mongoose';

export interface IExamQuestion extends Document {
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options: string[];
  correctAnswer: string;
  points: number;
}

const ExamQuestionSchema: Schema = new Schema({
  question: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['multiple-choice', 'true-false', 'short-answer'], 
    required: true 
  },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
  points: { type: Number, default: 1 },
});

export interface IExam extends Document {
  title: string;
  description: string;
  questions: IExamQuestion[];
  subject: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [ExamQuestionSchema],
  subject: { 
    type: String, 
    enum: [
      'mathematics',
      'physics',
      'chemistry',
      'biology',
      'computerScience',
      'history',
      'geography',
      'languages'
    ], 
    required: true 
  },
}, {
  timestamps: true
});

export const Exam = mongoose.model<IExam>('Exam', ExamSchema);