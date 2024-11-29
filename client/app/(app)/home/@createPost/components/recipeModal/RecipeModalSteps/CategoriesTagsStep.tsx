import React from 'react';
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { CreateRecipe } from '@/types/recipes';

interface CategoriesTagsStepProps {
	recipe: CreateRecipe;
	updateRecipe: (field: keyof CreateRecipe, value: any) => void;
	addField: (field: 'tags', e: React.MouseEvent<HTMLButtonElement>) => void;
	updateField: (field: 'tags', index: number, value: any) => void;
	removeField: (field: 'tags', index: number) => void;
}

const CategoriesTagsStep: React.FC<CategoriesTagsStepProps> = ({
	recipe,
	updateRecipe,
	addField,
	updateField,
	removeField,
}) => {
	const availableCategories = [
		'STARTER',
		'MAIN_COURSE',
		'DESSERT',
		'DRINK',
		'SAUCE',
		'ACCOMPANIMENT',
	] as const;

	const categoryLabels: { [key: string]: string } = {
		STARTER: 'Entrée',
		MAIN_COURSE: 'Plat principal',
		DESSERT: 'Dessert',
		DRINK: 'Boisson',
		SAUCE: 'Sauce',
		ACCOMPANIMENT: 'Accompagnement',
	};

	const isCategorySelected = (category: string) => {
		return recipe.categories?.some((c) => c.name === category);
	};

	const toggleCategory = (category: string) => {
		const newCategories = isCategorySelected(category)
			? (recipe.categories || []).filter((c) => c.name !== category)
			: [...(recipe.categories || []), { name: category }];
		updateRecipe('categories', newCategories);
	};

	return (
		<>
			<CardHeader>
				<CardTitle>Catégories et Tags</CardTitle>
				<CardDescription>
					Classez votre recette et ajoutez des tags pour la rendre
					plus facilement trouvable.
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-6'>
				<div className='space-y-4'>
					<Label>Catégories</Label>
					<div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
						{availableCategories.map((category) => (
							<Button
								key={category}
								variant={
									isCategorySelected(category)
										? 'default'
										: 'outline'
								}
								onClick={(e) => {
									e.preventDefault();
									toggleCategory(category);
								}}
								className='justify-start'>
								{categoryLabels[category]}
							</Button>
						))}
					</div>
				</div>

				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<Label>Tags</Label>
						<Button
							variant='outline'
							size='sm'
							onClick={(e) => addField('tags', e)}>
							<Plus className='mr-2 size-4' />
							Ajouter un tag
						</Button>
					</div>
					<div className='space-y-2'>
						{recipe.tags?.map((tag, index) => (
							<div
								key={index}
								className='flex items-center space-x-2'>
								<Input
									value={tag.name}
									onChange={(e) =>
										updateField('tags', index, {
											name: e.target.value,
										})
									}
									placeholder='Nom du tag'
									className='flex-1'
								/>
								<Button
									variant='outline'
									size='icon'
									onClick={() => removeField('tags', index)}>
									<Trash2 className='size-4' />
								</Button>
							</div>
						))}
					</div>
					<p className='text-sm'>
						Ajoutez des tags pour décrire votre recette (ex:
						végétarien, italien, rapide, etc.)
					</p>
				</div>
			</CardContent>
		</>
	);
};

export default CategoriesTagsStep;
