import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { useGetUserRecipes } from '@/hook/posts/useGetRecipes';
import { FetchRecipe } from '@/types/recipes';
import RecipeSummary from '@/components/post/RecipeSummary';
const PostsTab = () => {
	const { userRecipes } = useGetUserRecipes();
	console.log('userRecipes', userRecipes);
	return (
		<TabsContent value='posts' className='mt-10'>
			{userRecipes?.map((recipe: FetchRecipe) => (
				<RecipeSummary recipe={recipe} key={recipe.id} />
			))}
		</TabsContent>
	);
};

export default PostsTab;
