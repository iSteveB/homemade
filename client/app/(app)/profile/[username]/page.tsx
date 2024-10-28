'use client';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import PostsTab from './components/PostsTab';
import LikesTab from './components/LikesTab';
import CommentsTab from './components/CommentsTab';
import { getInitials } from '@/lib/utils';
import useUserData from '@/hook/auth/useUserData';

const ProfilPage = () => {
	const [activeTab, setActiveTab] = useState('posts');
	const { userData } = useUserData();

	if (!userData) return null;

	return (
		<main className='mt-6 flex flex-col gap-4'>
			<Card className='mx-auto w-full max-w-5xl overflow-hidden'>
				{/* Banner */}
				<div className='relative h-40'>
					<Image
						src='https://picsum.photos/1500/500'
						alt={`Profile banner for ${userData?.username}`}
						fill
						className='object-cover'
					/>
				</div>

				<CardContent className='relative pb-8 pl-64'>
					{/* Profile Picture */}
					<Avatar className='absolute left-32 top-0 size-52 -translate-x-1/2 -translate-y-1/2 border-4 dark:border-dark-neutral'>
						<AvatarImage
							src='https://i.pravatar.cc/600'
							alt='Profile picture'
						/>
						<AvatarFallback>
							{getInitials(userData?.username)}
						</AvatarFallback>
					</Avatar>
					<div className='mt-4 flex items-center justify-between'>
						{/* User Info */}
						<div>
							<h2 className='text-2xl font-bold'>
								{userData?.username}
							</h2>
							<p>@{userData?.username}</p>
						</div>

						{/* Stats */}
						<div className=' flex items-center justify-center space-x-8'>
							<div className='text-center'>
								<p className='font-semibold'>1,234</p>
								<p className='text-sm'>Followers</p>
							</div>
							<div className='text-center'>
								<p className='font-semibold'>567</p>
								<p className='text-sm'>Following</p>
							</div>
							<div className='text-center'>
								<p className='font-semibold'>19</p>
								<p className='text-sm'>Posts</p>
							</div>
						</div>
						<Button variant='ghost' className='flex gap-2'>
							<Pencil className='size-4' />
							<span>Edit</span>
						</Button>
					</div>
					{/* Biography */}
					{userData?.biography ? (
						<p className='mt-4 text-left text-sm'>
							{userData?.biography}
						</p>
					) : (
						<p className='mt-4 text-left text-sm text-secondary/20 dark:text-neutral/50'>
							Add a biography.
						</p>
					)}
				</CardContent>
			</Card>

			{/* Tabbed Content */}
			<Card className='mx-auto w-full max-w-5xl'>
				<CardContent className='p-6'>
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className='w-full'>
						<TabsList className='grid w-full grid-cols-3'>
							<TabsTrigger value='posts'>Posts</TabsTrigger>
							<TabsTrigger value='likes'>Likes</TabsTrigger>
							<TabsTrigger value='comments'>Comments</TabsTrigger>
						</TabsList>
						<PostsTab />
						<LikesTab />
						<CommentsTab />
					</Tabs>
				</CardContent>
			</Card>
		</main>
	);
};

export default ProfilPage;
