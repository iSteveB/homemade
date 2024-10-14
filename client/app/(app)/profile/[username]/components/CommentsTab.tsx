import { TabsContent } from '@/components/ui/tabs';
import React from 'react';

const CommentsTab = () => {
	return (
		<TabsContent value='comments' className='mt-10'>
			<h3 className='mb-4 text-lg font-semibold'>Your Comments</h3>
			{/* Add your comments content here */}
			<p>This is where your comments will be displayed.</p>
		</TabsContent>
	);
};

export default CommentsTab;
