'use client';

import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { CreateRecipeSchema, CreateRecipe } from '@/types/recipes';
import { useCreateRecipe } from '@/hook/posts/useCreateRecipe';

import BasicInfoStep from './RecipeModalSteps/BasicInfoStep';
import IngredientsStep from './RecipeModalSteps/IngredientsStep';
import InstructionsStep from './RecipeModalSteps/InstructionsStep';
import CategoriesTagsStep from './RecipeModalSteps/CategoriesTagsStep';
import PreviewStep from './RecipeModalSteps/PreviewStep';
import RecipeModalNavigation from './RecipeModalNavigation';

type RecipeModalProps = {
	isRecipesModalOpen: boolean;
	setIsRecipesModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RecipeModal: React.FC<RecipeModalProps> = ({
	isRecipesModalOpen,
	setIsRecipesModalOpen,
}) => {
	const [step, setStep] = useState<number>(1);
	const { createRecipe } = useCreateRecipe();

	// Initialisation de l'état 'recipe' avec le type 'CreateRecipe'
	const [recipe, setRecipe] = useState<CreateRecipe>({
		title: '',
		description: '',
		difficulty: undefined,
		cost: undefined,
		servings: 1,
		duration: { preparation: 0, cooking: 0, rest: 0 },
		categories: [],
		tags: [],
		ingredients: [],
		ustensils: [],
		steps: [],
		pictures: [],
	});

	const updateRecipe = (field: keyof CreateRecipe, value: any) => {
		setRecipe((prev) => ({ ...prev, [field]: value }));
	};

	const addField = (
		field: 'ingredients' | 'ustensils' | 'steps' | 'tags',
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		setRecipe((prev) => ({
			...prev,
			[field]: [
				...prev[field]!,
				field === 'ingredients'
					? { name: '', quantity: 0, unit: '' }
					: field === 'steps'
					? { order: (prev[field]?.length || 0) + 1, description: '' }
					: { name: '' },
			],
		}));
	};

	const updateField = (
		field: 'ingredients' | 'ustensils' | 'steps' | 'tags',
		index: number,
		value: any
	) => {
		setRecipe((prev) => ({
			...prev,
			[field]: prev[field]!.map((item, i) =>
				i === index ? { ...item, ...value } : item
			),
		}));
	};

	const removeField = (
		field: 'ingredients' | 'ustensils' | 'steps' | 'tags',
		index: number
	) => {
		setRecipe((prev) => ({
			...prev,
			[field]: prev[field]!.filter((_, i) => i !== index),
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files).map((file) => ({
				url: URL.createObjectURL(file),
				name: file.name,
				file: file, // Stocker le fichier original
			}));
			setRecipe((prev) => ({
				...prev,
				pictures: [...(prev.pictures || []), ...newFiles].slice(0, 5),
			}));
		}
	};

	const removePicture = (index: number) => {
		setRecipe((prev) => ({
			...prev,
			pictures: prev.pictures?.filter((_, i) => i !== index),
		}));
	};

	const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setStep((prev) => Math.min(prev + 1, 5));
	};

	const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setStep((prev) => Math.max(prev - 1, 1));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const result = CreateRecipeSchema.safeParse(recipe);
		if (!result.success) {
			console.error('Validation failde:',result.error);
			return;
		}

		const formData = new FormData();

		// Add pictures
		recipe.pictures?.forEach((picture) => {
			if (picture.file) formData.append('pictures', picture.file);
		});

		// Créer un objet avec toutes les données sauf les photos
		const recipeData = {
			title: recipe.title,
			description: recipe.description,
			difficulty: recipe.difficulty,
			cost: recipe.cost,
			servings: recipe.servings,
			duration: recipe.duration,
			categories: recipe.categories,
			tags: recipe.tags,
			ingredients: recipe.ingredients,
			ustensils: recipe.ustensils,
			steps: recipe.steps,
		};
	
		// Ajouter l'objet JSON des données
		formData.append('data', JSON.stringify(recipeData));

		createRecipe(formData);
		setIsRecipesModalOpen(false);
	};

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<BasicInfoStep
						recipe={recipe}
						updateRecipe={updateRecipe}
					/>
				);
			case 2:
				return (
					<IngredientsStep
						recipe={recipe}
						addField={addField}
						updateField={updateField}
						removeField={removeField}
					/>
				);
			case 3:
				return (
					<InstructionsStep
						recipe={recipe}
						addField={addField}
						updateField={updateField}
						removeField={removeField}
						handleFileChange={handleFileChange}
						removePicture={removePicture}
					/>
				);
			case 4:
				return (
					<CategoriesTagsStep
						recipe={recipe}
						updateRecipe={updateRecipe}
						addField={addField}
						updateField={updateField}
						removeField={removeField}
					/>
				);
			case 5:
				return <PreviewStep recipe={recipe} />;
			default:
				return null;
		}
	};

	return (
		<Dialog open={isRecipesModalOpen} onOpenChange={setIsRecipesModalOpen}>
			<DialogContent className='max-h-[80vh] overflow-y-auto sm:max-w-[700px]'>
				<DialogHeader>
					<DialogTitle className='text-xl'>
						Publier une recette
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<Card>{renderStep()}</Card>
					<RecipeModalNavigation
						currentStep={step}
						totalSteps={5}
						onPrevious={handlePrevious}
						onNext={handleNext}
						onSubmit={handleSubmit}
					/>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default RecipeModal;
