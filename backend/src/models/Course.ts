import mongoose, { Schema, Document } from 'mongoose';

export interface IChapter extends Document {
  title: string;
  content: string;
  order: number;
}

const ChapterSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, required: true },
});

export interface ICourse extends Document {
  title: string;
  description: string;
  subject: string;
  chapters: IChapter[];
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
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
  chapters: [ChapterSchema],
}, {
  timestamps: true
});

export const Course = mongoose.model<ICourse>('Course', CourseSchema);