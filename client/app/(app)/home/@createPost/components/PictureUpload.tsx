import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { PictureInput } from '@/types/recipes';

interface PictureUploadProps {
	pictures: PictureInput[];
	maxPictures?: number;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemove: (index: number) => void;
}

const PictureUpload: React.FC<PictureUploadProps> = ({
	pictures,
	maxPictures = 5,
	onFileChange,
	onRemove,
}) => {
	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<Label>Photos</Label>
				<div className='flex items-center space-x-2'>
					<p className='text-sm'>
						{pictures.length}/{maxPictures} photos
					</p>
					<Button
						variant='outline'
						size='sm'
						onClick={(e) => {
							e.preventDefault();
							document.getElementById('picture-upload')?.click();
						}}
						disabled={pictures.length >= maxPictures}>
						<Upload className='mr-2 size-4' />
						Ajouter des photos
					</Button>
				</div>
			</div>
			<input
				type='file'
				id='picture-upload'
				multiple
				accept='image/jpeg, image/jpg, image/png, image/gif, image/webp'
				onChange={onFileChange}
				className='hidden'
			/>
			<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
				{pictures.map((picture, index) => (
					<div
						key={index}
						className='relative aspect-square overflow-hidden rounded-lg border'>
						<Image
							src={picture.url}
							alt={picture.name}
							fill
							className='object-cover'
						/>
						<Button
							variant='outline'
							size='icon'
							className='absolute right-2 top-2 size-6'
							onClick={() => onRemove(index)}>
							<X className='size-4' />
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export default PictureUpload;
