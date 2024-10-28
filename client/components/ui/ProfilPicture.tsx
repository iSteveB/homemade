import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { getInitials } from '@/lib/utils';

type ProfilPictureProps = {
	avatarSrc: string;
	username: string;
	size: string;
};

const ProfilPicture: React.FC<ProfilPictureProps> = ({
	avatarSrc,
	username,
	size,
}) => {
	return (
		<Avatar className={size}>
			<AvatarImage src={avatarSrc} alt={username} />
			<AvatarFallback>{getInitials(username)}</AvatarFallback>
		</Avatar>
	);
};

export default ProfilPicture;
