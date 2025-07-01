import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    storageUsed: { type: Number, default: 0 },
    maxStorage: { type: Number, default: 15 * 1024 * 1024 * 1024 }, // 15GB in bytes
    googleId: { type: String },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>('User', userSchema);
