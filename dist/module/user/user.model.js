"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    storageUsed: { type: Number, default: 0 },
    maxStorage: { type: Number, default: 15 * 1024 * 1024 * 1024 }, // 15GB in bytes
    googleId: { type: String },
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
