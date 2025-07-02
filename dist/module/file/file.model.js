"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModel = void 0;
const mongoose_1 = require("mongoose");
const fileSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['note', 'image', 'pdf', 'other'], required: true },
    folder: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Folder' },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    size: { type: Number, default: 0 },
    content: { type: String },
    url: { type: String },
    isFavourite: { type: Boolean, default: false },
}, { timestamps: true });
exports.FileModel = (0, mongoose_1.model)('File', fileSchema);
