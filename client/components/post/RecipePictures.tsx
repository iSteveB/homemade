import React, { useState } from 'react';
import Image from 'next/image';
import { Picture } from '@/types/recipes';

interface RecipePicturesProps {
	pictures?: Picture[];
}

export default function RecipePictures({ pictures }: RecipePicturesProps) {
	const [mainPicture, setMainPicture] = useState(pictures?.[0]);

	if (!pictures || pictures.length === 0) return null;

	return (
		<div className='relative w-full aspect-square'>
			<Image
				src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/pictures/${mainPicture?.pictureId}`}
				alt={`Main picture of the recipe`}
				fill
				className='object-cover rounded-md'
			/>
			{pictures.length > 1 && (
				<div className='absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-2 bg-black bg-opacity-50'>
					{pictures.map((picture) => (
						<button
							key={picture.pictureId}
							onClick={() => setMainPicture(picture)}
							className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden transition-transform hover:scale-110 ${
								mainPicture?.pictureId === picture.pictureId
									? 'ring-2 ring-primary scale-110'
									: ''
							}`}
							aria-label={`Set as main picture`}>
							<Image
								src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/pictures/${picture.pictureId}`}
								alt={`Thumbnail of recipe picture`}
								fill
								className='object-cover'
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
