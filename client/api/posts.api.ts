import { FetchRecipe, CreateRecipe } from '@/types/recipes';

export const getAllRecipes = async () => {
	const response = await fetch('http://localhost:8080/recipes', {
		method: 'GET',
		credentials: 'include',
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			errorData.message || 'La récupération des recettes a échoué.'
		);
	}
	const data: FetchRecipe[] = await response.json();
	return data;
};

export const getOneRecipe = async (id: string) => {
	const response = await fetch(`http://localhost:8080/recipes/${id}`, {
		method: 'GET',
		credentials: 'include',
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			errorData.message || 'La récupération de la recette a échoué.'
		);
	}
	const data: FetchRecipe = await response.json();
	return data;
};

export const getUserRecipes = async (): Promise<FetchRecipe[]> => {
	const response = await fetch(`http://localhost:8080/recipes/user`, {
		method: 'GET',
		credentials: 'include',
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			errorData.message ||
				"La récupération des recettes de l'utilisateur a échoué"
		);
	}
	const data: FetchRecipe[] = await response.json();
	return data;
};

export const createRecipe = async (
	formData: FormData
): Promise<CreateRecipe> => {
	const response = await fetch('http://localhost:8080/recipes', {
		method: 'POST',
		body: formData,
		credentials: 'include',
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => null);
		throw new Error(
			errorData?.message ||
				'Une erreur est survenue lors de la création de la recette. Veuillez réessayer.'
		);
	}
	const data = await response.json();
	return data;
};

export const updateRecipe = async (
	recipeId: string,
	formData: FormData
): Promise<CreateRecipe> => {
	const response = await fetch(`http://localhost:8080/recipes/${recipeId}`, {
		method: 'PATCH',
		body: formData,
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error(
			'Une erreur est survenue lors de la mise à jour de la recette. Veuillez réessayer.'
		);
	}
	const data: CreateRecipe = await response.json();
	return data;
};

export const deleteRecipe = async (recipeId: string): Promise<FetchRecipe> => {
	const response = await fetch(`http://localhost:8080/recipes/${recipeId}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error(
			'Une erreur est survenue lors de la suppression de la recette. Veuillez réessayer.'
		);
	}
	const data: FetchRecipe = await response.json();
	return data;
};
