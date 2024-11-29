// components/RecipeModal/RecipeModalNavigation.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';

interface RecipeModalNavigationProps {
	currentStep: number;
	totalSteps: number;
	onPrevious: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onSubmit: (e: React.FormEvent) => void;
}

const RecipeModalNavigation: React.FC<RecipeModalNavigationProps> = ({
	currentStep,
	totalSteps,
	onPrevious,
	onNext,
	onSubmit,
}) => {
	return (
		<>
			<CardFooter className='flex justify-between'>
				<Button
					type='button'
					onClick={(e) => onPrevious(e)}
					disabled={currentStep === 1}
					variant='outline'>
					<ChevronLeft className='mr-2 size-4' /> Précédent
				</Button>
				<div className='flex justify-center'>
					{Array.from({ length: totalSteps }, (_, i) => (
						<div
							key={i + 1}
							className={`mx-1 size-3 rounded-full ${
								i + 1 === currentStep
									? 'bg-primary'
									: 'bg-neutral'
							}`}
						/>
					))}
				</div>
				{currentStep < totalSteps ? (
					<Button type='button' onClick={(e) => onNext(e)}>
						Suivant <ChevronRight className='ml-2 size-4' />
					</Button>
				) : (
					<Button type='submit' onClick={(e) => onSubmit(e)}>
						Poster ma recette
					</Button>
				)}
			</CardFooter>
		</>
	);
};

export default RecipeModalNavigation;
