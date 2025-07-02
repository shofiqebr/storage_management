"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderModel = void 0;
const mongoose_1 = require("mongoose");
const folderSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    totalItems: { type: Number, default: 0 },
    storageUsed: { type: Number, default: 0 },
}, { timestamps: true });
exports.FolderModel = (0, mongoose_1.model)('Folder', folderSchema);
