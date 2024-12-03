'use client';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Utensils, ImagePlay, MessageSquare, Send, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import RecipeModal from './components/recipeModal/RecipeModal';
import ThreadModal from './components/ThreadModal';

export default function CreatePost() {
	const [inputValue, setInputValue] = useState('');
	const [isRecipesModalOpen, setIsRecipesModalOpen] = useState(false);
	const [isThreadModalOpen, setIsThreadModalOpen] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSend = () => {
		console.log('Sending post:', inputValue);
		setInputValue('');
	};

	const handleCancel = () => {
		setInputValue('');
	};

	const handleMediaClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<Card className='container mx-auto p-4 dark:bg-dark-primary'>
			<div className='mx-auto w-full max-w-2xl space-y-4'>
				<Input
					placeholder='Something Yummy?'
					value={inputValue}
					onChange={handleInputChange}
					className='w-full'
				/>

				<div className='flex justify-between gap-2'>
					<Button
						variant='outline'
						className='flex-1'
						onClick={() => setIsRecipesModalOpen(true)}>
						<Utensils className='mr-2 size-4' />
						Recipes
					</Button>
					<Button
						variant='outline'
						className='flex-1'
						onClick={handleMediaClick}>
						<ImagePlay className='mr-2 size-4' />
						Media
					</Button>
					<Button
						variant='outline'
						className='flex-1'
						onClick={() => setIsThreadModalOpen(true)}>
						<MessageSquare className='mr-2 size-4' />
						Thread
					</Button>
				</div>

				{inputValue && (
					<div className='flex justify-end space-x-2'>
						<Button variant='ghost' onClick={handleCancel}>
							<X className='mr-2 size-4' />
							Cancel
						</Button>
						<Button onClick={handleSend}>
							<Send className='mr-2 size-4' />
							Send
						</Button>
					</div>
				)}

				<Input
					type='file'
					ref={fileInputRef}
					className='hidden'
					accept='image/png,image/jpeg,image/gif,image/webp,video/*'
				/>

				<RecipeModal
					isRecipesModalOpen={isRecipesModalOpen}
					setIsRecipesModalOpen={setIsRecipesModalOpen}
				/>

				<ThreadModal
					isThreadModalOpen={isThreadModalOpen}
					setIsThreadModalOpen={setIsThreadModalOpen}
				/>
			</div>
		</Card>
	);
}
