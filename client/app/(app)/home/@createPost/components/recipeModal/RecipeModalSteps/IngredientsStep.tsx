import React, { useEffect } from 'react';
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { CreateRecipe } from '@/types/recipes';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface IngredientsUtensilsStepProps {
	recipe: CreateRecipe;
	addField: (
		field: 'ingredients' | 'ustensils',
		e: React.MouseEvent<HTMLButtonElement>
	) => void;
	updateField: (
		field: 'ingredients' | 'ustensils',
		index: number,
		value: any
	) => void;
	removeField: (field: 'ingredients' | 'ustensils', index: number) => void;
}

const IngredientsUtensilsStep: React.FC<IngredientsUtensilsStepProps> = ({
	recipe,
	addField,
	updateField,
	removeField,
}) => {
	useEffect(() => {
		if (!recipe.ingredients || recipe.ingredients.length === 0) {
			addField('ingredients', {} as React.MouseEvent<HTMLButtonElement>);
		}
	}, []);

	return (
		<>
			<CardHeader>
				<CardTitle>Ingrédients et Ustensiles</CardTitle>
				<CardDescription>
					Listez les ingrédients et ustensiles nécessaires pour votre
					recette.
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-6'>
				<div className='space-y-4'>
					<Label>Ingrédients</Label>
					{recipe.ingredients?.map((ingredient, index) => (
						<div
							key={index}
							className='flex items-center space-x-2'>
							<div className='flex w-1/3 space-x-2'>
								<Input
									type='number'
									value={ingredient.quantity || ''}
									onChange={(e) =>
										updateField('ingredients', index, {
											quantity: Number(e.target.value),
										})
									}
									placeholder='Quantité'
									className='w-1/2'
								/>
								<Select
									value={ingredient.unit}
									onValueChange={(value) =>
										updateField('ingredients', index, {
											unit: value,
										})
									}>
									<SelectTrigger className='w-1/2'>
										<SelectValue placeholder='Unité' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='gramme'>
											gramme
										</SelectItem>
										<SelectItem value='kilo'>
											kilo
										</SelectItem>
										<SelectItem value='litre'>
											litre
										</SelectItem>
										<SelectItem value='millilitre'>
											millilitre
										</SelectItem>
										<SelectItem value='pièce'>
											pièce
										</SelectItem>
										<SelectItem value='pincée'>
											pincée
										</SelectItem>
										<SelectItem value='càc'>càc</SelectItem>
										<SelectItem value='càs'>càs</SelectItem>
										<SelectItem value='rien'>
											----
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Input
								value={ingredient.name}
								onChange={(e) =>
									updateField('ingredients', index, {
										name: e.target.value,
									})
								}
								placeholder="Nom de l'ingrédient"
								className='w-2/3'
							/>
							<Button
								variant='outline'
								size='icon'
								onClick={() =>
									removeField('ingredients', index)
								}>
								<Trash2 className='size-4' />
							</Button>
						</div>
					))}
					<div className='flex items-center justify-end'>
						<Button
							variant='outline'
							size='sm'
							onClick={(e) => addField('ingredients', e)}>
							<Plus className='mr-2 size-4' />
							Ajouter un ingrédient
						</Button>
					</div>
				</div>

				<div className='space-y-4'>
					<Label>Ustensiles</Label>

					{recipe.ustensils?.map((ustensil, index) => (
						<div
							key={index}
							className='flex items-center space-x-2'>
							<Input
								value={ustensil.name}
								onChange={(e) =>
									updateField('ustensils', index, {
										name: e.target.value,
									})
								}
								placeholder="Nom de l'ustensile"
								className='flex-1'
							/>
							<Button
								variant='outline'
								size='icon'
								onClick={() => removeField('ustensils', index)}>
								<Trash2 className='size-4' />
							</Button>
						</div>
					))}
					<div className='flex items-center justify-end'>
						<Button
							variant='outline'
							size='sm'
							onClick={(e) => addField('ustensils', e)}>
							<Plus className='mr-2 size-4' />
							Ajouter un ustensile
						</Button>
					</div>
				</div>
			</CardContent>
		</>
	);
};

export default IngredientsUtensilsStep;
