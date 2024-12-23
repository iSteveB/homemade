import React from 'react';
import { FetchRecipe } from '@/types/recipes';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RecipeInfo from './RecipeInfo';
import RecipeIngredients from './RecipeIngredients';
import RecipeSteps from './RecipeSteps';
import RecipeMetadata from './RecipeMetadata';
import RecipePictures from './RecipePictures';

interface RecipeDetailsProps {
	recipe: FetchRecipe;
	isOpen: boolean;
	onClose: () => void;
}

export default function RecipeDetails({
	recipe,
	isOpen,
	onClose,
}: RecipeDetailsProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[800px]'>
				<DialogHeader>
					<DialogTitle>{recipe.title}</DialogTitle>
				</DialogHeader>
				<ScrollArea className='h-[80vh] pr-4'>
					<Card>
						<CardHeader>
							<CardTitle>
								<div className='flex items-center justify-between'>
									<h2 className='text-2xl font-bold'>
										{recipe.title}
									</h2>
									<div className='flex space-x-2'>
										{recipe.categories?.map((category) => (
											<Badge
												key={category.id}
												variant='secondary'>
												{category.name}
											</Badge>
										))}
									</div>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-6'>
							<RecipePictures pictures={recipe.pictures} />
							<RecipeInfo recipe={recipe} />
							<RecipeIngredients
								ingredients={recipe.ingredients}
							/>
							<RecipeSteps steps={recipe.steps} />
							<RecipeMetadata recipe={recipe} />
						</CardContent>
					</Card>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
