import * as z from 'zod';

import {
  defaultMinLength,
  defaultMaxLength,
  minDescriptionLength,
  maxDescriptionLength,
} from './constants';

export const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(defaultMinLength, {
      message: `Title must be at least ${defaultMinLength} characters`,
    })
    .max(
      defaultMaxLength,
      `Title must be less than ${defaultMaxLength} characters`
    ),
  categoryId: z.string({
    required_error: 'Category is required',
  }),
  imageUrl: z.string(),
  description: z
    .string()
    .trim()
    .min(
      minDescriptionLength,
      `Description must be at least ${minDescriptionLength} characters`
    )
    .max(
      maxDescriptionLength,
      `Description must be less than ${maxDescriptionLength} characters`
    ),
  location: z
    .string()
    .trim()
    .min(
      defaultMinLength,
      `Location must be at least ${defaultMinLength} characters`
    )
    .max(
      defaultMaxLength,
      `Location must be less than ${defaultMaxLength} characters`
    ),
  startDateTime: z.date(),
  endDateTime: z.date(),
  price: z.string().trim(),
  isFree: z.boolean(),
  url: z.string().trim().url(),
});
