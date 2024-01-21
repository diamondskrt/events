import * as z from 'zod';

export const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters.',
    })
    .max(20, 'Title must be less than 20 characters'),
  categoryId: z.string({
    required_error: 'Category is required',
  }),
  imageUrl: z.string(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(600, 'Description must be less than 600 characters'),
  location: z
    .string()
    .min(3, 'Location must be at least 3 characters')
    .max(20, 'Location must be less than 20 characters'),
  startDateTime: z.date(),
  endDateTime: z.date(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
