"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderService = void 0;
const folder_model_1 = require("./folder.model");
const file_model_1 = require("../file/file.model");
const user_model_1 = require("../user/user.model");
exports.FolderService = {
    createFolder: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const folder = yield folder_model_1.FolderModel.create(payload);
        return folder;
    }),
    getUserFolders: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield folder_model_1.FolderModel.find({ user: userId });
    }),
    deleteFolder: (folderId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const folder = yield folder_model_1.FolderModel.findOne({ _id: folderId, user: userId });
        if (!folder)
            throw new Error('Folder not found or unauthorized');
        const files = yield file_model_1.FileModel.find({ folder: folderId, user: userId });
        const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0);
        yield file_model_1.FileModel.deleteMany({ folder: folderId, user: userId });
        yield folder_model_1.FolderModel.findByIdAndDelete(folderId);
        yield user_model_1.UserModel.findByIdAndUpdate(userId, {
            $inc: { storageUsed: -totalSize },
        });
        return { message: 'Folder and its files deleted' };
    }),
    copyFolder: (folderId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.UserModel.findById(userId);
        if (!user)
            throw new Error('User not found');
        const folder = yield folder_model_1.FolderModel.findOne({ _id: folderId, user: userId });
        if (!folder)
            throw new Error('Folder not found or unauthorized');
        const files = yield file_model_1.FileModel.find({ folder: folderId, user: userId });
        const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0);
        const remaining = 15 * 1024 * 1024 * 1024 - user.storageUsed;
        if (totalSize > remaining)
            throw new Error('Insufficient storage for folder copy');
        const copiedFolder = yield folder_model_1.FolderModel.create({
            name: folder.name + ' (Copy)',
            user: folder.user,
            totalItems: folder.totalItems,
            storageUsed: folder.storageUsed,
        });
        for (const file of files) {
            yield file_model_1.FileModel.create({
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
        yield user.save();
        return copiedFolder;
    }),
};
