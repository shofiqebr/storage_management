import { FolderModel } from './folder.model';
import { IFolder } from './folder.interface';

export const FolderService = {
  createFolder: async (payload: Partial<IFolder>) => {
    const folder = await FolderModel.create(payload);
    return folder;
  },

  getUserFolders: async (userId: string) => {
    return await FolderModel.find({ user: userId });
  },

  deleteFolder: async (folderId: string, userId: string) => {
    const folder = await FolderModel.findOneAndDelete({ _id: folderId, user: userId });
    if (!folder) throw new Error('Folder not found or unauthorized');
    return folder;
  },
};
