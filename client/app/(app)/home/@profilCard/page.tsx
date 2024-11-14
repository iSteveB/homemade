'use client';
import { Card, CardContent } from '@/components/ui/card';
import useUserData from '@/hook/user/useUserData';
import React from 'react';
import Banner from '@/components/Banner';
import UserAvatar from '@/components/UserAvatar';
import { getPictureEndpoint } from '@/lib/utils';

export default function ProfileCard() {
	const { userData } = useUserData();
	if (!userData) return null;
	return (
		<Card className='mx-auto w-full max-w-md overflow-hidden'>
			{/* Banner */}
			<div className='relative h-24'>
				<Banner
					src={getPictureEndpoint(userData.username, 'banner')}
					alt={`Profile banner of ${userData.username}`}
				/>
			</div>

			<CardContent className='relative px-6 pb-8 pt-16'>
				{/* Profile Picture */}
				<UserAvatar
					src={getPictureEndpoint(userData.username, 'avatar')}
					alt={`Profile picture of ${userData.username}`}
					username={userData.username}
					className='absolute left-1/2 top-0 size-32 -translate-x-1/2 -translate-y-1/2 border-4'
				/>

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
						<p className='font-semibold'>{userData?.followersCount}</p>
						<p>Followers</p>
					</div>
					<div className='text-center'>
						<p className='font-semibold'>{userData?.followingCount}</p>
						<p>Following</p>
					</div>
					<div className='text-center'>
						<p className='font-semibold'>{userData?.recipesCount}</p>
						<p>Posts</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
