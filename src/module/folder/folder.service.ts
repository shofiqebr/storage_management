import { FolderModel } from './folder.model';
import { IFolder } from './folder.interface';
import { FileModel } from '../file/file.model';
import { UserModel } from '../user/user.model';

export const FolderService = {
  createFolder: async (payload: Partial<IFolder>) => {
    const folder = await FolderModel.create(payload);
    return folder;
  },

  getUserFolders: async (userId: string) => {
    return await FolderModel.find({ user: userId });
  },

   deleteFolder: async (folderId: string, userId: string) => {
    const folder = await FolderModel.findOne({ _id: folderId, user: userId });
    if (!folder) throw new Error('Folder not found or unauthorized');

    const files = await FileModel.find({ folder: folderId, user: userId });

    const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0);

    await FileModel.deleteMany({ folder: folderId, user: userId });
    await FolderModel.findByIdAndDelete(folderId);
    
    await UserModel.findByIdAndUpdate(userId, {
      $inc: { storageUsed: -totalSize },
    });

    return { message: 'Folder and its files deleted' };
  },

  copyFolder: async (folderId: string, userId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error('User not found');

    const folder = await FolderModel.findOne({ _id: folderId, user: userId });
    if (!folder) throw new Error('Folder not found or unauthorized');

    const files = await FileModel.find({ folder: folderId, user: userId });

    const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0);
    const remaining = 15 * 1024 * 1024 * 1024 - user.storageUsed;
    if (totalSize > remaining) throw new Error('Insufficient storage for folder copy');

    const copiedFolder = await FolderModel.create({
      name: folder.name + ' (Copy)',
      user: folder.user,
      totalItems: folder.totalItems,
      storageUsed: folder.storageUsed,
    });

    for (const file of files) {
      await FileModel.create({
        name: file.name,
        type: file.type,
        folder: copiedFolder._id,
        user: file.user,
        size: file.size,
        content: file.content,
        url: file.url,
        isFavourite: false,
      });
    }

    user.storageUsed += totalSize;
    await user.save();

    return copiedFolder;
  },
};
