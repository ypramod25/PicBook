import {z} from 'zod';

// Zod schema for validating post data (caption only)
export const zodPostSchema = z.object({
    caption: z.string().min(5),
})