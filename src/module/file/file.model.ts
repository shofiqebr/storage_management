import { Schema, model } from 'mongoose';
import { IFile } from './file.interface';

const fileSchema = new Schema<IFile>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['note', 'image', 'pdf', 'other'],
      required: true,
    },
    folder: { type: Schema.Types.ObjectId, ref: 'Folder' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    size: { type: Number, default: 0 },
    content: { type: String },
    url: { type: String },
    isFavourite: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false },
    lockPassword: { type: String, default: null },
   

  },
  { timestamps: true },
);

export const FileModel = model<IFile>('File', fileSchema);
