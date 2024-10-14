import { TabsContent } from '@/components/ui/tabs';
import React from 'react';

const PostsTab = () => {
  return (
    <TabsContent value='posts' className='mt-10'>
			<h3 className='mb-4 text-lg font-semibold'>Your Posts</h3>
			{/* Add your posts content here */}
			<p>This is where your posts will be displayed.</p>
		</TabsContent>
  );
};

export default PostsTab;