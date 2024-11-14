import React from 'react';

interface BannerProps {
  src: string;
  alt: string;
  className?: string;
}

const Banner = ({ src, alt, className, ...props }: BannerProps) => {
	return (
		<picture>
			<img
				src={src}
				alt={alt}
				className={`object-cover ${className}`}
				{...props}
			/>
		</picture>
	);
};

export default Banner;
