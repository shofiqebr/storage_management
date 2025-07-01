import { FileModel } from './file.model';
import { IFile } from './file.interface';

export const FileService = {
  createFile: async (payload: Partial<IFile>) => {
    const file = await FileModel.create(payload);
    return file;
  },

  getUserFiles: async (userId: string) => {
    return await FileModel.find({ user: userId });
  },

  toggleFavourite: async (fileId: string, userId: string) => {
    const file = await FileModel.findOne({ _id: fileId, user: userId });
    if (!file) throw new Error('File not found');
    file.isFavourite = !file.isFavourite;
    await file.save();
    return file;
  },

  deleteFile: async (fileId: string, userId: string) => {
    const file = await FileModel.findOneAndDelete({ _id: fileId, user: userId });
    if (!file) throw new Error('File not found or unauthorized');
    return file;
  },
};
