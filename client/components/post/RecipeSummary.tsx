'use client';

import { useState } from 'react';
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
import Image from 'next/image';
import UserAvatar from '../UserAvatar';
import { FetchRecipe } from '@/types/recipes';
import { getPictureEndpoint, getTimeElapsed } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

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
	const pictureId = recipe?.pictures?.[0]?.pictureId ?? '';

	console.log('recipe', recipe);
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
		<Card className='mx-auto my-8 w-full max-w-2xl cursor-pointer transition-shadow hover:shadow-md'>
			<CardHeader>
				<div className='flex items-start justify-between'>
					<div className='flex items-center space-x-4'>
						<UserAvatar
							src={getPictureEndpoint(
								recipe.user.username,
								'avatar'
							)}
							alt={`Photo de profil de ${recipe.user.name}`}
							username={recipe.user.username}
							className='size-16'
						/>
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
								<span className='sr-only'>More options</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem>Edit</DropdownMenuItem>
							<DropdownMenuItem>Delete</DropdownMenuItem>
							<DropdownMenuItem>Report</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent className='px-6'>
				<Link href={`/recipe/${recipe.id}`}>
					<CardTitle className='py-4 text-lg'>
						{recipe.title}
					</CardTitle>
					{recipe.pictures && recipe.pictures.length > 0 && (
						<Image
							src={'http://localhost:8080/pictures/' + pictureId}
							alt={recipe.title || 'Recipe image'}
							className='mb-4 rounded-lg object-cover'
							width={600}
							height={400}
							priority
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
				</Link>
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
						className={`size-5 ${isLiked ? 'fill-current' : ''}`}
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
	);
}
