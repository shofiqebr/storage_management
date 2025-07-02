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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const file_model_1 = require("./file.model");
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const folder_model_1 = require("../folder/folder.model");
const MAX_STORAGE = 15 * 1024 * 1024 * 1024; // 15GB
exports.FileService = {
    createFile: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.UserModel.findById(payload.user);
        if (!user)
            throw new Error('User not found');
        const remaining = MAX_STORAGE - user.storageUsed;
        if ((payload.size || 0) > remaining)
            throw new Error('Insufficient storage available');
        const file = yield file_model_1.FileModel.create(payload);
        user.storageUsed += payload.size || 0;
        yield user.save();
        return file;
    }),
    getUserFiles: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield file_model_1.FileModel.find({ user: userId });
    }),
    toggleFavourite: (fileId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield file_model_1.FileModel.findOne({ _id: fileId, user: userId });
        if (!file)
            throw new Error('File not found');
        file.isFavourite = !file.isFavourite;
        yield file.save();
        return file;
    }),
    deleteFile: (fileId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield file_model_1.FileModel.findOneAndDelete({ _id: fileId, user: userId });
        if (!file)
            throw new Error('File not found or unauthorized');
        yield user_model_1.UserModel.findByIdAndUpdate(userId, {
            $inc: { storageUsed: -(file.size || 0) },
        });
        return file;
    }),
    renameFile: (fileId, userId, newName) => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield file_model_1.FileModel.findOne({ _id: fileId, user: userId });
        if (!file)
            throw new Error('File not found or unauthorized');
        file.name = newName;
        yield file.save();
        return file;
    }),
    copyFile: (fileId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.UserModel.findById(userId);
        if (!user)
            throw new Error('User not found');
        const file = yield file_model_1.FileModel.findOne({ _id: fileId, user: userId });
        if (!file)
            throw new Error('File not found or unauthorized');
        const remaining = MAX_STORAGE - user.storageUsed;
        if (file.size > remaining)
            throw new Error('Insufficient storage for copy');
        const copiedFile = yield file_model_1.FileModel.create({
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
        yield user.save();
        return copiedFile;
    }),
    filterFilesByDate: (userId, date) => __awaiter(void 0, void 0, void 0, function* () {
        const targetDate = new Date(date);
        if (isNaN(targetDate.getTime())) {
            throw new Error('Invalid date format. Use YYYY-MM-DD');
        }
        const startOfDay = new Date(targetDate);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(targetDate);
        endOfDay.setUTCHours(23, 59, 59, 999);
        const files = yield file_model_1.FileModel.find({
            user: userId,
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        });
        return files;
    }),
    getRecentFiles: (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, limit = 10) {
        const files = yield file_model_1.FileModel.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(limit);
        return files;
    }),
    lockFile: (fileId, userId, password) => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield file_model_1.FileModel.findOne({ _id: fileId, user: userId });
        if (!file)
            throw new Error('File not found or unauthorized');
        const hashed = yield bcrypt_1.default.hash(password, 10);
        file.isLocked = true;
        file.lockPassword = hashed;
        yield file.save();
        return file;
    }),
    unlockFile: (fileId, userId, password) => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield file_model_1.FileModel.findOne({ _id: fileId, user: userId });
        if (!file || !file.isLocked)
            throw new Error('File not locked or unauthorized');
        const isMatch = yield bcrypt_1.default.compare(password, file.lockPassword || '');
        if (!isMatch)
            throw new Error('Incorrect lock password');
        file.isLocked = false;
        file.lockPassword = null;
        yield file.save();
        return file;
    }),
    getFileById: (fileId, userId, password) => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield file_model_1.FileModel.findOne({ _id: fileId, user: userId });
        if (!file)
            throw new Error('File not found or unauthorized');
        if (file.isLocked) {
            if (!password)
                throw new Error('File is locked. Password required');
            const isMatch = yield bcrypt_1.default.compare(password, file.lockPassword || '');
            if (!isMatch)
                throw new Error('Incorrect lock password');
        }
        return file;
    }),
    getUserFileSummary: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const files = yield file_model_1.FileModel.find({ user: userId });
        const folders = yield folder_model_1.FolderModel.find({ user: userId });
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
    })
};
