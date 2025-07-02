"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderCreateValidation = void 0;
const zod_1 = require("zod");
exports.folderCreateValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Folder name is required' }),
    }),
});
