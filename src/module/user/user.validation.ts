import { z } from 'zod';

// Register Validation
export const userRegisterValidation = z.object({
  body: z.object({
    fullName: z.string({ required_error: 'Full name is required' }),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password is required'),
  }),
});

// Login Validation
export const userLoginValidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
    password: z.string().min(6, 'Password is required'),
  }),
});

// Forgot Password Validation
export const userForgotPassValidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  }),
});

// Change Password Validation (logged-in user)
export const userChangePassValidation = z.object({
  body: z.object({
    oldPassword: z.string().min(6, 'Old password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  }),
});

// Optional User Update Validation (for PATCH requests)
export const userUpdateValidation = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z.string().email('Invalid email').optional(),
    password: z.string().min(6).optional(),
  }),
});
