'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';
import Image from 'next/image';

interface PostCardProps {
	avatarSrc: string;
	name: string;
	nickname: string;
	date: string;
	content: string;
	imageSrc?: string;
	initialLikes: number;
	initialComments: number;
	initialShares: number;
}

export default function PostCard({
	avatarSrc,
	name,
	nickname,
	date,
	content,
	imageSrc,
	initialLikes,
	initialComments,
	initialShares,
}: PostCardProps) {
	const [likes, setLikes] = useState(initialLikes);
	const [comments, setComments] = useState(initialComments);
	const [shares, setShares] = useState(initialShares);
	const [isLiked, setIsLiked] = useState(false);
	const [isCommented, setIsCommented] = useState(false);
	const [isShared, setIsShared] = useState(false);

	const handleLike = () => {
		if (isLiked) {
			setLikes(likes - 1);
		} else {
			setLikes(likes + 1);
		}
		setIsLiked(!isLiked);
	};

	const handleComment = () => {
		if (!isCommented) {
			setComments(comments + 1);
		}
		setIsCommented(!isCommented);
	};

	const handleShare = () => {
		if (!isShared) {
			setShares(shares + 1);
		}
		setIsShared(!isShared);
	};

	return (
		<Card className='mx-auto w-full max-w-2xl'>
			<CardContent className='p-6'>
				<div className='mb-4 flex items-start justify-between'>
					<div className='flex items-center space-x-4'>
						<Avatar className='size-16'>
							<AvatarImage src={avatarSrc} alt={name} />
							<AvatarFallback>{name[0]}</AvatarFallback>
						</Avatar>
						<div className='flex items-center gap-3'>
							<div>
								<p className='font-semibold'>{name}</p>
								<p className='text-xs'>{nickname}</p>
							</div>
							<span>&#8226;</span>
							<p className='text-xs'>{date}</p>
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
				{imageSrc && (
					<Image
						src={imageSrc}
						alt='Post content'
						className='mb-4 rounded-lg object-contain'
						width={600}
						height={600}
						priority
					/>
				)}
				<p className='mb-4'>{content}</p>
			</CardContent>
			<CardFooter className='flex justify-between p-6 pt-0'>
				<Button
					variant='ghost'
					size='sm'
					className={`flex items-center space-x-2 ${
						isCommented ? 'text-blue-500' : ''
					}`}
					onClick={handleComment}>
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
					onClick={handleLike}>
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
					onClick={handleShare}>
					<Share2 className='size-5' />
					<span>{shares} Shares</span>
				</Button>
			</CardFooter>
		</Card>
	);
}
