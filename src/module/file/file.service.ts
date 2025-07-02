import { FileModel } from './file.model';
import { IFile } from './file.interface';
import { UserModel } from '../user/user.model';
import bcrypt from 'bcrypt';
import { FolderModel } from '../folder/folder.model';

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
 filterFilesByDate : async (userId: string, date: string) => {
  const targetDate = new Date(date);

  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date format. Use YYYY-MM-DD');
  }

  const startOfDay = new Date(targetDate);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(targetDate);
  endOfDay.setUTCHours(23, 59, 59, 999);

  const files = await FileModel.find({
    user: userId,
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  });

  return files;
},
 getRecentFiles : async (userId: string, limit = 10) => {
  const files = await FileModel.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit);

  return files;
},

 lockFile: async (fileId: string, userId: string, password: string) => {
    const file = await FileModel.findOne({ _id: fileId, user: userId });
    if (!file) throw new Error('File not found or unauthorized');

    const hashed = await bcrypt.hash(password, 10);
    file.isLocked = true;
    file.lockPassword = hashed;
    await file.save();

    return file;
  },

  unlockFile: async (fileId: string, userId: string, password: string) => {
    const file = await FileModel.findOne({ _id: fileId, user: userId });
    if (!file || !file.isLocked) throw new Error('File not locked or unauthorized');

    const isMatch = await bcrypt.compare(password, file.lockPassword || '');
    if (!isMatch) throw new Error('Incorrect lock password');

    file.isLocked = false;
    file.lockPassword = null;
    await file.save();

    return file;
  },

  getFileById: async (fileId: string, userId: string, password?: string) => {
    const file = await FileModel.findOne({ _id: fileId, user: userId });
    if (!file) throw new Error('File not found or unauthorized');

    if (file.isLocked) {
      if (!password) throw new Error('File is locked. Password required');
      const isMatch = await bcrypt.compare(password, file.lockPassword || '');
      if (!isMatch) throw new Error('Incorrect lock password');
    }

    return file;
  },
  
 getUserFileSummary : async (userId: string) => {
  const files = await FileModel.find({ user: userId });
  const folders = await FolderModel.find({ user: userId });

  const totalFiles = files.length;
  const totalStorage = files.reduce((acc, file) => acc + (file.size || 0), 0);
  const favourites = files.filter(f => f.isFavourite).length;
  const notes = files.filter(f => f.type === 'note').length;
  const images = files.filter(f => f.type === 'image').length;
  const pdfs = files.filter(f => f.type === 'pdf').length;

  const totalFolders = folders.length;
  const folderStorage = folders.reduce((acc, folder) => acc + (folder.storageUsed || 0), 0);

  const grandTotalStorage = totalStorage + folderStorage;

  return {
    totalFiles,
    totalFolders,
    totalStorage: grandTotalStorage,
    availableStorage: MAX_STORAGE - grandTotalStorage,
    favourites,
    notes,
    images,
    pdfs,
  };
}


  
};
