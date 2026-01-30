import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  preferredLanguage: 'fr' | 'en';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferredLanguage: { 
    type: String, 
    enum: ['fr', 'en'], 
    default: 'fr' 
  },
}, {
  timestamps: true
});

export const User = mongoose.model<IUser>('User', UserSchema);