import { Types } from 'mongoose';

export interface IFile {
  name: string;
  type: 'note' | 'image' | 'pdf' | 'other';
  folder?: Types.ObjectId;
  user: Types.ObjectId;
  size: number; // bytes
  content?: string; // for notes
  url?: string;    // for images, PDFs
  isFavourite: boolean;
}
