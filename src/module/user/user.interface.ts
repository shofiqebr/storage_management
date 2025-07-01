import { Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  storageUsed: number;    
  maxStorage: number;     
  googleId?: string;      
  createdAt?: Date;
  updatedAt?: Date;
}
