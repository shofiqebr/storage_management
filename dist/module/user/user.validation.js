"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateValidation = exports.userChangePassValidation = exports.userForgotPassValidation = exports.userLoginValidation = exports.userRegisterValidation = void 0;
const zod_1 = require("zod");
// Register Validation
exports.userRegisterValidation = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string({ required_error: 'Full name is required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }).email('Invalid email'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: zod_1.z.string().min(6, 'Confirm password is required'),
    }),
});
// Login Validation
exports.userLoginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }).email('Invalid email'),
        password: zod_1.z.string().min(6, 'Password is required'),
    }),
});
// Forgot Password Validation
exports.userForgotPassValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }).email('Invalid email'),
        newPassword: zod_1.z.string().min(6, 'New password must be at least 6 characters'),
    }),
});
// Change Password Validation (logged-in user)
exports.userChangePassValidation = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string().min(6, 'Old password is required'),
        newPassword: zod_1.z.string().min(6, 'New password must be at least 6 characters'),
    }),
});
// Optional User Update Validation (for PATCH requests)
exports.userUpdateValidation = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string().optional(),
        email: zod_1.z.string().email('Invalid email').optional(),
        password: zod_1.z.string().min(6).optional(),
    }),
});
