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
exports.FileService = void 0;
const file_model_1 = require("./file.model");
const user_model_1 = require("../user/user.model");
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
    })
};
