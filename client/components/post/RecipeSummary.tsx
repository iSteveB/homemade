'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';
import UserAvatar from '../UserAvatar';
import { FetchRecipe } from '@/types/recipes';
import { getPictureEndpoint, getTimeElapsed } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import RecipeDetails from './RecipeDetails';
import { useDeleteRecipe } from '@/hook/posts/useDeleteRecipe';
import ConfirmationModal from '../ConfirmationModal';

interface RecipeSummaryProps {
	recipe: FetchRecipe;
}

export default function RecipeSummary({ recipe }: RecipeSummaryProps) {
	const [likes, setLikes] = useState(recipe.favoritesCount);
	const [comments, setComments] = useState(recipe.commentsCount);
	const [shares, setShares] = useState(0);
	const [isLiked, setIsLiked] = useState(recipe.isFavorite);
	const [isCommented, setIsCommented] = useState(false);
	const [isShared, setIsShared] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const pictureId = recipe?.pictures?.[0]?.pictureId ?? '';
	const avatarUrl = getPictureEndpoint(recipe.user.username, 'avatar');
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const { deleteRecipe, deleteRecipeIsLoading } = useDeleteRecipe();

	const currentUsername = localStorage.getItem('user');
	const parsedUser = currentUsername ? JSON.parse(currentUsername) : null;
	const isOwner = parsedUser.user.username === recipe.user.username;


	const handleDelete = () => {
		deleteRecipe(recipe.id, {
			onSuccess: () => {
				setIsDeleteModalOpen(false);
			},
			onError: (error) => {
				setIsDeleteModalOpen(false);
				alert(error);

			}
		});
	};

	const handleLike = () => {
		if (isLiked) {
			setLikes(likes - 1);
		} else {
			setLikes(likes + 1);
		}
		setIsLiked(!isLiked);
	};

	const handleComment = () => {
		setShowComments(!showComments);
		if (!isCommented) {
			setComments(comments + 1);
			setIsCommented(true);
		}
	};

	const handleShare = () => {
		if (!isShared) {
			setShares(shares + 1);
		}
		setIsShared(!isShared);
	};

	return (
		<div>
			<Card className='mx-auto my-8 w-full max-w-2xl transition-shadow hover:shadow-md'>
				<CardHeader>
					<div className='flex items-start justify-between'>
						<div className='flex items-center space-x-4'>
							<Link href={`/profile/${recipe.user.username}`}>
								<UserAvatar
									src={avatarUrl}
									alt={`Photo de profil de ${recipe.user.name}`}
									username={recipe.user.username}
									className='size-16'
								/>
							</Link>
							<div className='flex items-center gap-3'>
								<div>
									<p className='font-semibold'>
										{recipe.user.name}
									</p>
									<p className='text-xs'>
										@{recipe.user.username}
									</p>
								</div>
								<span>&#8226;</span>
								<p className='text-xs'>
									{getTimeElapsed(new Date(recipe.createdAt))}
								</p>
							</div>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' size='icon'>
									<MoreVertical className='size-4' />
									<span className='sr-only'>
										More options
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' >
								{isOwner && (
									<>
										<DropdownMenuItem className='cursor-pointer'>
											Modifier
										</DropdownMenuItem>
										<DropdownMenuItem
											className='text-red-600'
											onClick={() =>
												setIsDeleteModalOpen(true)
											}>
											Supprimer
										</DropdownMenuItem>
									</>
								)}
								<DropdownMenuItem>Report</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardHeader>
				<CardContent className='px-6 cursor-pointer'>
					<div onClick={() => setIsModalOpen(true)}>
						<CardTitle className='py-4 text-lg'>
							{recipe.title}
						</CardTitle>
						{recipe.pictures && recipe.pictures.length > 0 && (
							<img
								src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/pictures/${pictureId}`}
								alt={recipe.title || 'Recipe image'}
								className='mb-4 rounded-lg object-cover'
								width={800}
								height={800}
							/>
						)}
						<p className='mb-4'>{recipe.description}</p>
						<div className='flex flex-wrap gap-2'>
							{recipe.tags?.map((tag) => (
								<Badge key={tag.id} variant='secondary'>
									{tag.name}
								</Badge>
							))}
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex justify-between p-6 pt-0'>
					<Button
						variant='ghost'
						size='sm'
						className={`flex items-center space-x-2 ${
							isCommented ? 'text-blue-500' : ''
						}`}
						onClick={(e) => {
							e.preventDefault();
							handleComment();
						}}>
						<MessageCircle
							className={`size-5 ${
								isCommented ? 'fill-current' : ''
							}`}
						/>
						<span>{comments} Comments</span>
					</Button>
					<Button
						variant='ghost'
						size='sm'
						className={`flex items-center space-x-2 ${
							isLiked ? 'text-red-500' : ''
						}`}
						onClick={(e) => {
							e.preventDefault();
							handleLike();
						}}>
						<Heart
							className={`size-5 ${
								isLiked ? 'fill-current' : ''
							}`}
						/>
						<span>{likes} Likes</span>
					</Button>
					<Button
						variant='ghost'
						size='sm'
						className={`flex items-center space-x-2 ${
							isShared ? 'text-green-500' : ''
						}`}
						onClick={(e) => {
							e.preventDefault();
							handleShare();
						}}>
						<Share2 className='size-5' />
						<span>{shares} Shares</span>
					</Button>
				</CardFooter>
				{showComments && (
					<div className='px-6 pb-4'>
						{/* Add your comment component here */}
						<p>Comments will be displayed here</p>
					</div>
				)}
			</Card>

			<ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer mon post"
        description="Êtes-vous sûr de vouloir supprimer ce post ? Cette action est irréversible."
        isLoading={deleteRecipeIsLoading}
      />

			<RecipeDetails
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				recipe={recipe}
			/>
		</div>
	);
}
