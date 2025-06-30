// src/modules/user/user.validation.ts
import { z } from 'zod';
import { USER_ROLE } from './user.constrants';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string(),
    // email: z.string().email(),
    password: z.string().min(3),
    role: z.nativeEnum(USER_ROLE),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    // email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.nativeEnum(USER_ROLE).optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
  }),
});
