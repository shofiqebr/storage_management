"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderRoutes = void 0;
const express_1 = require("express");
const folder_controller_1 = require("./folder.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const folder_validation_1 = require("./folder.validation");
const router = (0, express_1.Router)();
router.post('/', auth_1.default, (0, validateRequest_1.default)(folder_validation_1.folderCreateValidation), folder_controller_1.createFolderController);
router.post('/copy/:id', auth_1.default, folder_controller_1.copyFolderController);
router.get('/', auth_1.default, folder_controller_1.getMyFoldersController);
router.delete('/:id', auth_1.default, folder_controller_1.deleteFolderController);
exports.FolderRoutes = router;
