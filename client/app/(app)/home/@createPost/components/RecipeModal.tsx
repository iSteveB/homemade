'use client';
import React from 'react';
import { DialogHeader } from '@/components/ui/dialog';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

type RecipeModalProps = {
	isRecipesModalOpen: boolean;
	setIsRecipesModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const RecipeModal: React.FC<RecipeModalProps> = ({
	isRecipesModalOpen,
	setIsRecipesModalOpen,
}) => {
	return (
		<Dialog open={isRecipesModalOpen} onOpenChange={setIsRecipesModalOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a Recipe</DialogTitle>
				</DialogHeader>
				<div className='py-4'>
					{/* Recipe modal content will be added here */}
					<p>Recipe creation form will be here</p>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default RecipeModal;
