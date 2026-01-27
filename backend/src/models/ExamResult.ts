import mongoose, { Schema, Document } from 'mongoose';

export interface IExamResult extends Document {
  userId: mongoose.Types.ObjectId;
  examId: mongoose.Types.ObjectId;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: Date;
  passed: boolean;
}

const ExamResultSchema: Schema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  examId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Exam', 
    required: true 
  },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now },
  passed: { type: Boolean, required: true },
}, {
  timestamps: true
});

export const ExamResult = mongoose.model<IExamResult>('ExamResult', ExamResultSchema);