import mongoose, { Schema, Document } from 'mongoose';

export interface IExercise extends Document {
  title: string;
  question: string;
  explanation: string;
  subject: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExerciseSchema: Schema = new Schema({
  title: { type: String, required: true },
  question: { type: String, required: true },
  explanation: { type: String, required: true },
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

export const Exercise = mongoose.model<IExercise>('Exercise', ExerciseSchema);