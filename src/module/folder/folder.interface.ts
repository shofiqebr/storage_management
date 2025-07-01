import { Types } from 'mongoose';

export interface IFolder {
  name: string;
  user: Types.ObjectId;
  totalItems: number;
  storageUsed: number; 
}
