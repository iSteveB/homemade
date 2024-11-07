import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRecipe } from '@/api/posts.api';

export const useDeleteRecipe = () => {
	const queryClient = useQueryClient();
	const deleteRecipeMutation = useMutation({
		mutationFn: deleteRecipe,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recipes'] });
		},
	});
	return {
		deleteRecipe: deleteRecipeMutation.mutate,
		deleteRecipeIsLoading: deleteRecipeMutation.isPending,
		deleteRecipeIsError: deleteRecipeMutation.isError,
		deleteRecipeErrorMessage: deleteRecipeMutation.error?.message,
	};
};
 