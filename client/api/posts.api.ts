import { Recipe } from '@/types/api/posts';

export const getAllRecipes = async () => {
	const response = await fetch('http://localhost:8080/recipes', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			errorData.message || 'La création de la recette a échoué'
		);
	}
	const data: Recipe[] = await response.json();
	return data;
};

export const getOneRecipe = async (id: string) => {
	const response = await fetch(`http://localhost:8080/recipes/${id}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			errorData.message || 'La création de la recette a échoué'
		);
	}
	const data: Recipe = await response.json();
	return data;
}; 

export const createRecipe = async (recipeData: Recipe): Promise<Recipe> => {
	const response = await fetch('http://localhost:8080/recipes', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(recipeData),
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Failed to create recipe');
	}
	const data = await response.json();
	return data;
};

export const updateRecipe = async (
	recipeId: string,
	recipeData: Partial<Recipe>
): Promise<Recipe> => {
	const response = await fetch(`http://localhost:8080/recipes/${recipeId}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(recipeData),
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Failed to update recipe');
	}
	const data: Recipe = await response.json();
	return data;
};

export const deleteRecipe = async (recipeId: string): Promise<Recipe> => {
	const response = await fetch(`http://localhost:8080/recipes/${recipeId}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Failed to delete recipe');
	}
	const data: Recipe = await response.json();
	return data;
};
