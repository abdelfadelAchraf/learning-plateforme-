import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI  = process.env.MONGODB_URI;

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ MongoDB connecté avec succès');
  } catch (error) {
    console.error(' Erreur de connexion MongoDB:', error);
    process.exit(1);
  }
};

mongoose.connection.on('error', (error) => {
  console.error(' Erreur MongoDB:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log(' MongoDB déconnecté');
});

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
};