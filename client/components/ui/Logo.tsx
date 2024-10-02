import React from 'react';
import Link from 'next/link';

const Logo = () => {
	return (
		<Link href='/' className='flex items-center space-x-2'>
			<div>
				<p className='rounded-lg bg-primary p-3 text-2xl text-neutral'>
					<strong>HM</strong>
				</p>
			</div>
		</Link>
	);
};

export default Logo;
