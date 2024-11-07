import { Recipe } from '@/types/api/posts';
import { useMutation } from '@tanstack/react-query';
import { updateRecipe } from '@/api/posts.api';

export const useUpdateRecipes = (
	recipeId: string,
	recipeData: Partial<Recipe>
) => {
	const updateRecipeMutation = useMutation({
		mutationFn: () => updateRecipe(recipeId, recipeData),
	});

	return {
		updateRecipe: updateRecipeMutation.mutate,
		updateRecipeIsError: updateRecipeMutation.isError,
		updateRecipeIsLoading: updateRecipeMutation.isPending,
	};
};
