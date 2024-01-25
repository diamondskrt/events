import * as z from 'zod';

export const formSchema = z.object({
  category: z.string().trim().min(3, {
    message: 'Category must be at least 3 characters.',
  }),
});
