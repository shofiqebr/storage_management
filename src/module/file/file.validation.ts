import { z } from 'zod';

export const fileCreateValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'File name is required' }),
    type: z.enum(['note', 'image', 'pdf', 'other']),
    folder: z.string().optional(),
    content: z.string().optional(), 
    url: z.string().optional(),    
    size: z.number().min(0),
  }),
});


export const fileRenameValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'New file name is required' }),
  }),
});

export const lockFileValidation = z.object({
  body: z.object({
    password: z.string().min(4, 'Password required'),
  }),
});
