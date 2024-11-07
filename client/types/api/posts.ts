import { z } from 'zod';

export const RecipeSchema = z.object({
  title: z
    .string()
    .min(1, 'Le titre est requis')
    .max(100, 'Le titre ne doit pas dépasser 100 caractères'),
  
  description: z
    .string()
    .max(500, 'La description ne doit pas dépasser 500 caractères'),
  
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
  
  cost: z.enum(['CHEAP', 'NORMAL', 'EXPENSIVE']).optional(),
  
  servings: z.number().int().min(1).default(1),
  
  duration: z.object({
    preparation: z.number(),
    cooking: z.number(),
    rest: z.number()
  }),
  
  categories: z.array(z.object({
    name: z.string()
  })),
  
  pictures: z.array(z.object({
    url: z.string().url(),
    name: z.string(),
    description: z.string().optional()
  })),
  
  ingredients: z.array(z.object({
    name: z.string(),
    quantity: z.number(),
    unit: z.string()
  })),
  
  ustensils: z.array(z.object({
    name: z.string()
  })),
  
  steps: z.array(z.object({
    order: z.number(),
    description: z.string()
  })),
  
  tags: z.array(z.object({
    name: z.string()
  }))
});

export type Recipe = z.infer<typeof RecipeSchema>;
