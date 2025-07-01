import { z } from 'zod';

export const folderCreateValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Folder name is required' }),
  }),
});
