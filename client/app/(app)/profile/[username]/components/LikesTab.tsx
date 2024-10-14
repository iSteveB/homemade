import { TabsContent } from '@/components/ui/tabs';
import React from 'react';

const LikesTab = () => {
	return (
		<TabsContent value='likes' className='mt-10'>
			<h3 className='mb-4 text-lg font-semibold'>Your Likes</h3>
			{/* Add your likes content here */}
			<p>This is where the posts you&apos;ve liked will be displayed.</p>
		</TabsContent>
	);
};

export default LikesTab;
