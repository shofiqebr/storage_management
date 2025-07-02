"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRenameValidation = exports.fileCreateValidation = void 0;
const zod_1 = require("zod");
exports.fileCreateValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'File name is required' }),
        type: zod_1.z.enum(['note', 'image', 'pdf', 'other']),
        folder: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        url: zod_1.z.string().optional(),
        size: zod_1.z.number().min(0),
    }),
});
exports.fileRenameValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'New file name is required' }),
    }),
});
