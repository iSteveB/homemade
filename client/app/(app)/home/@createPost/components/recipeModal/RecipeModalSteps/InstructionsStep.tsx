import React from 'react';
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { CreateRecipe } from '@/types/recipes';
import PictureUpload from '../../PictureUpload';

interface InstructionsStepProps {
	recipe: CreateRecipe;
	addField: (field: 'steps', e: React.MouseEvent<HTMLButtonElement>) => void;
	updateField: (field: 'steps', index: number, value: any) => void;
	removeField: (field: 'steps', index: number) => void;
	handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	removePicture: (index: number) => void;
}

const InstructionsStep: React.FC<InstructionsStepProps> = ({
	recipe,
	addField,
	updateField,
	removeField,
	handleFileChange,
	removePicture,
}) => {
	return (
		<>
			<CardHeader>
				<CardTitle>Instructions</CardTitle>
				<CardDescription>
					Décrivez les étapes de préparation de votre recette.
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-6'>
				<div className='space-y-4'>
					<Label>Étapes</Label>

					{recipe.steps?.map((step, index) => (
						<div key={index} className='flex items-start space-x-2'>
							<div className='flex h-24 w-8 items-center justify-center rounded-md border text-sm'>
								{step.order}
							</div>
							<Textarea
								value={step.description}
								onChange={(e) =>
									updateField('steps', index, {
										description: e.target.value,
									})
								}
								placeholder="Description de l'étape"
								className='h-24 flex-1'
							/>
							<Button
								variant='outline'
								size='icon'
								onClick={() => removeField('steps', index)}>
								<Trash2 className='size-4' />
							</Button>
						</div>
					))}
					<div className='flex items-center justify-end'>
						<Button
							variant='outline'
							size='sm'
							onClick={(e) => addField('steps', e)}>
							<Plus className='mr-2 size-4' />
							Ajouter une étape
						</Button>
					</div>
				</div>

				<PictureUpload
					pictures={recipe.pictures || []}
					maxPictures={5}
					onFileChange={handleFileChange}
					onRemove={removePicture}
				/>
			</CardContent>
		</>
	);
};

export default InstructionsStep;
