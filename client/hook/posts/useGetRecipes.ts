import { useQuery } from '@tanstack/react-query';
import { Recipe } from '@/types/api/posts';
import { getOneRecipe, getAllRecipes } from '@/api/posts.api';

export const useGetAllRecipes = () => {
	const fetchRecipes = useQuery({
		queryKey: ['recipes'],
		queryFn: getAllRecipes,
	});

	return {
		recipes: fetchRecipes.data,
		isError: fetchRecipes.isError,
		isLoading: fetchRecipes.isLoading,
	};
};

export const useGetOneRecipe = (id: string) => {
	const fetchOneRecipe = useQuery({
		queryKey: ['recipe', id],
		queryFn: () => getOneRecipe(id),
	});

	return {
		recipe: fetchOneRecipe.data,
		recipeIsError: fetchOneRecipe.isError,
		recipeIsLoading: fetchOneRecipe.isLoading,
	};
};
