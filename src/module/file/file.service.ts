import { FileModel } from './file.model';
import { IFile } from './file.interface';
import { UserModel } from '../user/user.model';

const MAX_STORAGE = 15 * 1024 * 1024 * 1024; // 15GB

export const FileService = {
  createFile: async (payload: Partial<IFile>) => {
    const user = await UserModel.findById(payload.user);
    if (!user) throw new Error('User not found');

    const remaining = MAX_STORAGE - user.storageUsed;
    if ((payload.size || 0) > remaining) throw new Error('Insufficient storage available');

    const file = await FileModel.create(payload);

    user.storageUsed += payload.size || 0;
    await user.save();

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

    await UserModel.findByIdAndUpdate(userId, {
      $inc: { storageUsed: -(file.size || 0) },
    });

    return file;
  },


   renameFile: async (fileId: string, userId: string, newName: string) => {
    const file = await FileModel.findOne({ _id: fileId, user: userId });
    if (!file) throw new Error('File not found or unauthorized');
    
    file.name = newName;
    await file.save();
    return file;
  },

  copyFile: async (fileId: string, userId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error('User not found');

    const file = await FileModel.findOne({ _id: fileId, user: userId });
    if (!file) throw new Error('File not found or unauthorized');

    const remaining = MAX_STORAGE - user.storageUsed;
    if (file.size > remaining) throw new Error('Insufficient storage for copy');

    const copiedFile = await FileModel.create({
      name: file.name + ' (Copy)',
      type: file.type,
      folder: file.folder,
      user: file.user,
      size: file.size,
      content: file.content,
      url: file.url,
      isFavourite: false,
    });

    user.storageUsed += file.size;
    await user.save();

    return copiedFile;
  },
};
