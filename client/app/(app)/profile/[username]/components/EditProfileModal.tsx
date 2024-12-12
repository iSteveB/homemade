'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import useProfileUpdate from '@/hook/user/useProfileUpdate';
import UserAvatar from '@/components/UserAvatar';
import Banner from '@/components/Banner';
import { getPictureEndpoint } from '@/lib/utils';
import type { User } from '@/types/auth';

interface EditProfileModalProps {
	isOpen: boolean;
	onClose: () => void;
	userData: Partial<User>;
}

export default function EditProfileModal({
	isOpen,
	onClose,
	userData,
}: EditProfileModalProps) {
	const [name, setName] = useState(userData.name || '');
	const [biography, setBiography] = useState(userData.biography || '');
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [bannerFile, setBannerFile] = useState<File | null>(null);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const [bannerPreview, setBannerPreview] = useState<string | null>(null);
	const [timestamp, setTimestamp] = useState<number>(Date.now());
	const { updateProfile, isUpdating } = useProfileUpdate();

	const handleBannerUpload = (file: File) => {
		setBannerFile(file);
		setBannerPreview(URL.createObjectURL(file));
	};

	const handleAvatarUpload = (file: File) => {
		setAvatarFile(file);
		setAvatarPreview(URL.createObjectURL(file));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateProfile(
			{
				name,
				biography,
				...(avatarFile && { avatar: avatarFile }),
				...(bannerFile && { banner: bannerFile }),
			},
			{
				onSuccess: () => {
					setTimestamp(Date.now());
					onClose();
				},
			}
		);
	};

	useEffect(() => {
		return () => {
			if (avatarPreview) URL.revokeObjectURL(avatarPreview);
			if (bannerPreview) URL.revokeObjectURL(bannerPreview);
		};
	}, [avatarPreview, bannerPreview]);

	if (!userData) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-2xl overflow-y-auto max-h-[90vh]'>
				<DialogHeader>
					<DialogTitle>Modifier le profil</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Banner Section */}
					<div className='group relative h-32'>
						<Banner
							src={
								bannerPreview ||
								getPictureEndpoint(
									userData.username || '',
									'banner',
									timestamp
								)
							}
							alt='Banner'
							className='size-full rounded-lg object-cover'
						/>
						<label
							htmlFor='banner-upload'
							className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity'
						>
							<Camera className='size-8 text-white' />
							<input
								type='file'
								id='banner-upload'
								accept='image/*'
								className='hidden'
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) handleBannerUpload(file);
								}}
							/>
						</label>
					</div>

					{/* Avatar Section */}
					<div className='absolute ml-10 top-20 size-40'>
						<UserAvatar
							src={
								avatarPreview ||
								getPictureEndpoint(
									userData.username || '',
									'avatar',
									timestamp
								)
							}
							alt='Avatar'
							className='size-full rounded-full object-cover border-4 border-dark-primary'
							username={userData.username || ''}
						/>
						<label
							htmlFor='avatar-upload'
							className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 cursor-pointer transition-opacity rounded-full'
						>
							<Camera className='size-8 text-white' />
							<input
								type='file'
								id='avatar-upload'
								accept='image/*'
								className='hidden'
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) handleAvatarUpload(file);
								}}
							/>
						</label>
					</div>

					{/* Form Fields */}
					<div className='space-y-4 pt-16'>
						<div>
							<label
								htmlFor='name'
								className='text-sm font-medium'>
								Nom
							</label>
							<Input
								id='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder='Votre nom'
								disabled={isUpdating}
							/>
						</div>

						<div>
							<label
								htmlFor='biography'
								className='text-sm font-medium'>
								Biographie
							</label>
							<Textarea
								id='biography'
								value={biography}
								onChange={(e) => setBiography(e.target.value)}
								placeholder='Votre biographie'
								disabled={isUpdating}
								className='min-h-[100px]'
							/>
						</div>
					</div>

					{/* Submit Button */}
					<div className='flex justify-end gap-2'>
						<Button
							type='button'
							variant='ghost'
							onClick={onClose}
							disabled={isUpdating}>
							Annuler
						</Button>
						<Button type='submit' disabled={isUpdating}>
							{isUpdating ? (
								<Loader2 className='mr-2 size-4 animate-spin' />
							) : null}
							Sauvegarder
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
