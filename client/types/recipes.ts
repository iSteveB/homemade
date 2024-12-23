import { url } from 'inspector';
import { z } from 'zod';

// Schémas pour les entrées utilisateur (création de recette) - sans 'id'
const CategoryInputSchema = z.object({
	name: z.string(),
});

const TagInputSchema = z.object({
	name: z.string(),
});

const IngredientInputSchema = z.object({
	name: z.string(),
	quantity: z.number().nonnegative(),
	unit: z.string(),
});

const UstensilInputSchema = z.object({
	name: z.string(),
});

const StepInputSchema = z.object({
	order: z.number().int().nonnegative(),
	description: z.string(),
});

export const PictureInputSchema = z.object({
	file: z.instanceof(File).optional(),
	url: z.string(),
	name: z.string(),
});

const DurationInputSchema = z.object({
	preparation: z.number().int().nonnegative(),
	cooking: z.number().int().nonnegative(),
	rest: z.number().int().nonnegative(),
});

// Schémas pour les données récupérées du backend (avec 'id' et autres champs)
const CategorySchema = CategoryInputSchema.extend({
	id: z.string().uuid(),
});

const TagSchema = TagInputSchema.extend({
	id: z.string().uuid(),
});

const IngredientSchema = IngredientInputSchema.extend({
	id: z.string().uuid(),
});

const UstensilSchema = UstensilInputSchema.extend({
	id: z.string().uuid(),
});

const StepSchema = StepInputSchema; // Supprimez cet endroit si des champs supplémentaires sont présents lors de la récupération

export const PictureSchema = z.object({
	recipeId: z.string().uuid(),
	pictureId: z.string().uuid(),
	picture: z.object({
		pictureId: z.string().uuid(),
		name: z.string(),
	}),
}); // Idem si des champs supplémentaires sont présents

const DurationSchema = DurationInputSchema; // Idem si des champs supplémentaires sont présents

const UserSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	username: z.string(),
});

export type Picture = z.infer<typeof PictureSchema>;
export type PictureInput = z.infer<typeof PictureInputSchema>;
export type Category = z.infer<typeof CategoryInputSchema>;
export type Tag = z.infer<typeof TagInputSchema>;
export type Ingredient = z.infer<typeof IngredientInputSchema>;
export type Utensil = z.infer<typeof UstensilInputSchema>;
export type Step = z.infer<typeof StepInputSchema>;

// Schéma pour la création de recette (utilisé lors de l'envoi des données au backend)
export const CreateRecipeSchema = z.object({
	title: z
		.string()
		.min(1, 'Le titre est requis')
		.max(100, 'Le titre ne doit pas dépasser 100 caractères'),

	description: z
		.string()
		.max(500, 'La description ne doit pas dépasser 500 caractères')
		.optional()
		.nullable(),

	difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional().nullable(),

	cost: z.enum(['CHEAP', 'NORMAL', 'EXPENSIVE']).optional().nullable(),

	servings: z.number().int().min(1).default(1),

	duration: DurationInputSchema.optional(),

	categories: z.array(CategoryInputSchema).optional(),

	tags: z.array(TagInputSchema).optional(),

	ingredients: z.array(IngredientInputSchema).optional(),

	ustensils: z.array(UstensilInputSchema).optional(),

	steps: z.array(StepInputSchema).optional(),

	pictures: z.array(PictureInputSchema).optional(),
});

export type CreateRecipe = z.infer<typeof CreateRecipeSchema>;

// Schéma pour les recettes récupérées du backend (inclut les 'id' et autres champs)
export const FetchRecipeSchema = z.object({
	id: z.string().uuid(),

	title: z.string().min(1).max(100),

	slug: z.string(),

	description: z.string().max(500).optional().nullable(),

	difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional().nullable(),

	cost: z.enum(['CHEAP', 'NORMAL', 'EXPENSIVE']).optional().nullable(),

	servings: z.number().int().min(1),

	duration: DurationSchema.optional(),

	categories: z.array(CategorySchema).optional(),

	tags: z.array(TagSchema).optional(),

	ingredients: z.array(IngredientSchema).optional(),

	ustensils: z.array(UstensilSchema).optional(),

	steps: z.array(StepSchema).optional(),

	pictures: z.array(PictureSchema).optional(),

	user: UserSchema,

	createdAt: z.string().datetime(),

	updatedAt: z.string().datetime(),

	isFavorite: z.boolean(),

	commentsCount: z.number().int().nonnegative(),

	favoritesCount: z.number().int().nonnegative(),
});

export type FetchRecipe = z.infer<typeof FetchRecipeSchema>;
