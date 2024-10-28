import { DialogHeader } from '@/components/ui/dialog';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import React from 'react';

type ThreadModalProps = {
	isThreadModalOpen: boolean;
	setIsThreadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ThreadModal: React.FC<ThreadModalProps> = ({
	isThreadModalOpen,
	setIsThreadModalOpen,
}) => {
	return (
		<Dialog open={isThreadModalOpen} onOpenChange={setIsThreadModalOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a Thread</DialogTitle>
				</DialogHeader>
				<div className='py-4'>
					{/* Thread modal content will be added here */}
					<p>Thread creation form will be here</p>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ThreadModal;
