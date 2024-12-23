import React from 'react';
import { FetchRecipe } from '@/types/recipes';
import { Clock, Users, Utensils, CookingPot, Flame, Hourglass } from 'lucide-react';

interface RecipeInfoProps {
	recipe: FetchRecipe;
}

export default function RecipeInfo({ recipe }: RecipeInfoProps) {
	const totalTime =
		(recipe.duration?.preparation || 0) +
		(recipe.duration?.cooking || 0) +
		(recipe.duration?.rest || 0);

	const getDifficultyFlames = (difficulty: string | null | undefined) => {
		const flameCount =
			difficulty === 'EASY'
				? 1
				: difficulty === 'MEDIUM'
				? 2
				: difficulty === 'HARD'
				? 3
				: 0;
		return Array(3)
			.fill(0)
			.map((_, index) => (
				<Flame
					key={index}
					className={`h-5 w-5 ${
						index < flameCount ? 'text-primary fill-primary' : 'text-gray-300'
					}`}
				/>
			));
	};

	return (
		<div className='space-y-4'>
			<div className='grid grid-cols-3 gap-2 text-center'>
				<div className='flex flex-col items-center justify-center border border-neutral rounded-md p-2'>
					<Utensils className='h-5 w-5 mb-1' />
					<div className='flex space-x-2'>
						<span className='text-sm font-semibold'>Prep</span>
						<span className='text-sm'>
							{recipe.duration?.preparation || 0} min
						</span>
					</div>
				</div>
				<div className='flex flex-col items-center justify-center border border-neutral rounded-md p-2'>
					<CookingPot className='h-5 w-5 mb-1' />
					<div className='flex space-x-2'>
						<span className='text-sm font-semibold'>Cook</span>
						<span className='text-sm'>
							{recipe.duration?.cooking || 0} min
						</span>
					</div>
				</div>
				<div className='flex flex-col items-center justify-center border border-neutral rounded-md p-2'>
					<Hourglass className='h-5 w-5 mb-1' />
					<div className='flex space-x-2'>
						<span className='text-sm font-semibold'>Rest</span>
						<span className='text-sm'>
							{recipe.duration?.rest || 0} min
						</span>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-1 gap-2'>
				<div className='flex items-center justify-center space-x-2 border border-neutral rounded-md p-2'>
					<Clock className='h-5 w-5' />
					<span className='font-semibold'>Total Time:</span>
					<span>{totalTime} min</span>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-2'>
				<div className='flex items-center justify-center space-x-2 border border-neutral rounded-md p-2'>
					<Users className='h-5 w-5' />
					<span className='font-semibold'>Servings:</span>
					<span>{recipe.servings}</span>
				</div>
				<div className='flex items-center justify-center space-x-2 border border-neutral rounded-md p-2'>
					<span className='font-semibold mr-2'>Difficulty:</span>
					<div className='flex'>
						{getDifficultyFlames(recipe.difficulty)}
					</div>
				</div>
        
			</div>
		</div>
	);
}
