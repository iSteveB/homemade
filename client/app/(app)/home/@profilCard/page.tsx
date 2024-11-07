'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useAuth from '@/hook/auth/useAuth';
import React from 'react';
import { getInitials } from '@/lib/utils';

export default function ProfileCard() {
	const { userData } = useAuth();

	if (!userData) return null;
	return (
		<Card className='mx-auto w-full max-w-md overflow-hidden'>
			{/* Banner */}
			<div className='relative h-20'>
				<Image
					src={userData.bannerUrl ? userData.bannerUrl :'https://picsum.photos/400/120'}
					alt='Profile banner'
					width={400}
					height={120}
					className='object-cover'
				/>
			</div>

			<CardContent className='relative px-6 pb-8 pt-16'>
				{/* Profile Picture */}
				<Avatar className='absolute left-1/2 top-0 size-32 -translate-x-1/2 -translate-y-1/2 border-4'>
					<AvatarImage
						src={userData.avatarUrl ? userData.avatarUrl : 'https://i.pravatar.cc/300'}
						alt='Profile picture'
					/>
					<AvatarFallback>
						{getInitials(userData.username)}
					</AvatarFallback>
				</Avatar>

				{/* User Info */}
				<div className='mt-2 text-center'>
					<h2 className='text-2xl font-bold'>{userData.name}</h2>
					<p>@{userData.username}</p>
				</div>

				{/* Biography */}
				<p className='mt-4 text-center text-sm'>
					{userData?.biography}
				</p>

				{/* Stats */}

				<div className='mt-6 flex items-center justify-between text-sm'>
					<div className='text-center'>
						<p className='font-semibold'>1,2K</p>
						<p>Followers</p>
					</div>
					<div className='text-center'>
						<p className='font-semibold'>19</p>
						<p>Posts</p>
					</div>
					<div className='text-center'>
						<p className='font-semibold'>567</p>
						<p>Following</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
