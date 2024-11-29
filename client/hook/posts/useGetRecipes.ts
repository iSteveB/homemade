import { useQuery } from '@tanstack/react-query';
import { getOneRecipe, getAllRecipes, getUserRecipes } from '@/api/posts.api';
import { FetchRecipe } from '@/types/recipes';

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

export const useGetUserRecipes = (): {
	userRecipes: FetchRecipe[];
	userRecipesIsError: boolean;
	userRecipesIsLoading: boolean;
} => {
	const fetchUserRecipes = useQuery({
		queryKey: ['userRecipes'],
		queryFn: getUserRecipes,
	});

	return {
		userRecipes: fetchUserRecipes.data || [],
		userRecipesIsError: fetchUserRecipes.isError,
		userRecipesIsLoading: fetchUserRecipes.isLoading,
	};
};
