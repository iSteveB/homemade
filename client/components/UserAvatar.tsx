import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface UserAvatarProps {
	src: string;
	alt: string;
	username: string;
	className?: string;
}
const UserAvatar = ({ src, alt, username, className, ...props }: UserAvatarProps) => {

	return (
		<Avatar className={`${className}`} {...props}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>
        {username}
      </AvatarFallback>
    </Avatar>
	);
};

export default UserAvatar;
