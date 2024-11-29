import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRecipe } from '@/api/posts.api';
import type { CreateRecipe } from '@/types/recipes';

export const useCreateRecipe = () => {
	const queryClient = useQueryClient();
	const createRecipeMutation = useMutation<CreateRecipe, Error, FormData>({
		mutationFn: (formData: FormData) => createRecipe(formData),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['recipes', 'userRecipes'],
			});
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
