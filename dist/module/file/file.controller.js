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
exports.fileSummaryController = exports.getFileController = exports.unlockFileController = exports.lockFileController = exports.recentFilesController = exports.calendarFilterController = exports.copyFileController = exports.renameFileController = exports.deleteFileController = exports.toggleFavouriteController = exports.getMyFilesController = exports.createFileController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const file_service_1 = require("./file.service");
exports.createFileController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const file = yield file_service_1.FileService.createFile(Object.assign(Object.assign({}, req.body), { user: userId }));
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: 'File created successfully',
        data: file,
    });
}));
exports.getMyFilesController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const files = yield file_service_1.FileService.getUserFiles(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Files retrieved successfully',
        data: files,
    });
}));
exports.toggleFavouriteController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const fileId = req.params.id;
    const file = yield file_service_1.FileService.toggleFavourite(fileId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Favourite status updated',
        data: file,
    });
}));
exports.deleteFileController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const fileId = req.params.id;
    yield file_service_1.FileService.deleteFile(fileId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'File deleted successfully',
        data: null,
    });
}));
exports.renameFileController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const fileId = req.params.id;
    const { name } = req.body;
    const file = yield file_service_1.FileService.renameFile(fileId, userId, name);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'File renamed successfully',
        data: file,
    });
}));
exports.copyFileController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const fileId = req.params.id;
    const copiedFile = yield file_service_1.FileService.copyFile(fileId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: 'File copied successfully',
        data: copiedFile,
    });
}));
exports.calendarFilterController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { date } = req.query;
    if (!date || typeof date !== 'string') {
        throw new Error('Date query parameter is required (YYYY-MM-DD)');
    }
    const files = yield file_service_1.FileService.filterFilesByDate(userId, date);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: `Files for ${date} retrieved successfully`,
        data: files,
    });
}));
exports.recentFilesController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;
    const files = yield file_service_1.FileService.getRecentFiles(userId, limit);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Recent files retrieved successfully',
        data: files,
    });
}));
exports.lockFileController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const fileId = req.params.id;
    const { password } = req.body;
    const file = yield file_service_1.FileService.lockFile(fileId, userId, password);
    (0, sendResponse_1.default)(res, { statusCode: 200, message: 'File locked', data: file });
}));
exports.unlockFileController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const fileId = req.params.id;
    const { password } = req.body;
    const file = yield file_service_1.FileService.unlockFile(fileId, userId, password);
    (0, sendResponse_1.default)(res, { statusCode: 200, message: 'File unlocked', data: file });
}));
exports.getFileController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const fileId = req.params.id;
    const { password } = req.body;
    const file = yield file_service_1.FileService.getFileById(fileId, userId, password);
    (0, sendResponse_1.default)(res, { statusCode: 200, message: 'File retrieved', data: file });
}));
exports.fileSummaryController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const summary = yield file_service_1.FileService.getUserFileSummary(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'File summary retrieved successfully',
        data: summary,
    });
}));
