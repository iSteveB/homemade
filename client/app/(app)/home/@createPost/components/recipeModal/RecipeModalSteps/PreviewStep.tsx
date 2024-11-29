import React from 'react';
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CreateRecipe } from '@/types/recipes';

interface PreviewStepProps {
	recipe: CreateRecipe;
}

const PreviewStep: React.FC<PreviewStepProps> = ({ recipe }) => {
	const categoryLabels: { [key: string]: string } = {
		STARTER: 'Entrée',
		MAIN_COURSE: 'Plat principal',
		DESSERT: 'Dessert',
		DRINK: 'Boisson',
		SAUCE: 'Sauce',
		ACCOMPANIMENT: 'Accompagnement',
	};

	return (
		<>
			<CardHeader>
				<CardTitle>Aperçu de la recette</CardTitle>
				<CardDescription>
					Vérifiez votre recette avant de la publier.
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-6'>
				<div className='space-y-4'>
					<div>
						<h3 className='text-2xl font-semibold'>
							{recipe.title}
						</h3>
						<p className='text-sm'>{recipe.description}</p>
					</div>

					{recipe.pictures && recipe.pictures.length > 0 && (
						<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
							{recipe.pictures.map((picture, index) => (
								<div
									key={index}
									className='relative aspect-square overflow-hidden rounded-lg border'>
									<Image
										src={picture.url}
										alt={picture.name}
										fill
										className='object-cover'
									/>
								</div>
							))}
						</div>
					)}

					<div className='flex flex-wrap gap-2'>
						{recipe.categories?.map((category, index) => (
							<Badge key={index} variant='secondary'>
								{categoryLabels[category.name]}
							</Badge>
						))}
						{recipe.tags?.map((tag, index) => (
							<Badge key={index} variant='outline'>
								{tag.name}
							</Badge>
						))}
					</div>

					<div className='grid gap-6 md:grid-cols-2'>
						<div className='space-y-4'>
							<h4 className='font-medium'>Ingrédients</h4>
							<ul className='list-inside list-disc space-y-2'>
								{recipe.ingredients?.map(
									(ingredient, index) => (
										<li key={index}>
											{ingredient.quantity}{' '}
											{ingredient.unit} {ingredient.name}
										</li>
									)
								)}
							</ul>
						</div>

						<div className='space-y-4'>
							<h4 className='font-medium'>Ustensiles</h4>
							<ul className='list-inside list-disc space-y-2'>
								{recipe.ustensils?.map((ustensil, index) => (
									<li key={index}>{ustensil.name}</li>
								))}
							</ul>
						</div>
					</div>

					<div className='space-y-4'>
						<h4 className='font-medium'>Instructions</h4>
						<div className='space-y-4'>
							{recipe.steps?.map((step, index) => (
								<div key={index} className='flex space-x-4'>
									<div className='flex size-6 items-center justify-center rounded-full bg-primary text-sm'>
										{step.order}
									</div>
									<p className='flex-1'>{step.description}</p>
								</div>
							))}
						</div>
					</div>

					<div className='space-y-4'>
						<h4 className='font-medium'>
							Informations complémentaires
						</h4>
						<div className='grid gap-2 text-sm'>
							<p>
								<span className='font-medium'>
									Temps de préparation :
								</span>{' '}
								{recipe.duration?.preparation} minutes
							</p>
							<p>
								<span className='font-medium'>
									Temps de cuisson :
								</span>{' '}
								{recipe.duration?.cooking} minutes
							</p>
							<p>
								<span className='font-medium'>
									Nombre de personnes :
								</span>{' '}
								{recipe.servings}
							</p>
							<p>
								<span className='font-medium'>
									Difficulté :
								</span>{' '}
								{recipe.difficulty}
							</p>
							<p>
								<span className='font-medium'>Prix :</span>{' '}
								{recipe.cost}
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</>
	);
};

export default PreviewStep;
