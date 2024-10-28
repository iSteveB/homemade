import React from 'react';
import { Mockdata } from './MockData';
import PostCard from './components/PostCard';
import { getTimeElapsed } from '@/lib/utils';

const Feed = () => {
	return (
			<div className='flex flex-col gap-4'>
				{Mockdata.map((post) => (
					<PostCard
						key={post.id}
						avatarSrc={post.author.avatar}
						name={post.author.name}
						nickname={post.author.username}
						date={getTimeElapsed(new Date(post.timestamp))}
						content={post.content}
						imageSrc={post.image}
						initialLikes={post.likes}
						initialComments={post.comments}
						initialShares={post.shares}
					/>
				))}
			</div>
	);
};

export default Feed;
