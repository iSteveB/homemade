"use client";
import React from 'react';
import RecipeSummary from '@/components/post/RecipeSummary';
import {useGetAllRecipes} from '@/hook/posts/useGetRecipes';

const Feed = () => {
	const { recipes, isError, isLoading } = useGetAllRecipes();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error</div>;
	}
	return (
		<div>
			{recipes?.map((recipe) => (
				<RecipeSummary key={recipe.id} recipe={recipe} />
			))}
		</div>
	);
};

export default Feed;
