import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Recipe } from '@/types/api/posts';
import { createRecipe } from '@/api/posts.api';

export const useCreateRecipe = (recipeData: Recipe) => {
	const queryClient = useQueryClient();
	const createRecipeMutation = useMutation<Recipe, Error, Recipe>({
		mutationFn: () => createRecipe(recipeData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recipes'] });
		},
		onError: (error) => {
			console.error('Failed to create recipe:', error);
		},
	});

	return {
		createRecipe: createRecipeMutation.mutate,
		createRecipeIsLoading: createRecipeMutation.isPending,
		createRecipeIsError: createRecipeMutation.isError,
		createRecipeErrorMessage: createRecipeMutation.error?.message,
	};
};
