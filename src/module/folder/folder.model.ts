import { Schema, model } from 'mongoose';
import { IFolder } from './folder.interface';

const folderSchema = new Schema<IFolder>(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalItems: { type: Number, default: 0 },
    storageUsed: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const FolderModel = model<IFolder>('Folder', folderSchema);
