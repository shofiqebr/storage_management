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
exports.copyFolderController = exports.deleteFolderController = exports.getMyFoldersController = exports.createFolderController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const folder_service_1 = require("./folder.service");
exports.createFolderController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const folder = yield folder_service_1.FolderService.createFolder(Object.assign(Object.assign({}, req.body), { user: userId }));
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: 'Folder created successfully',
        data: folder,
    });
}));
exports.getMyFoldersController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const folders = yield folder_service_1.FolderService.getUserFolders(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Folders retrieved successfully',
        data: folders,
    });
}));
exports.deleteFolderController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const folderId = req.params.id;
    yield folder_service_1.FolderService.deleteFolder(folderId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Folder deleted successfully',
        data: null,
    });
}));
exports.copyFolderController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const folderId = req.params.id;
    const copiedFolder = yield folder_service_1.FolderService.copyFolder(folderId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: 'Folder copied successfully',
        data: copiedFolder,
    });
}));
