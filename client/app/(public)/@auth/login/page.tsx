'use client';
import LoginForm from '@/components/authentication/LoginForm';
import Link from 'next/link';
import React from 'react';

const Login = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-4'>
			<LoginForm />
			<Link
				href='/register'
				className=' text-secondary underline dark:text-neutral'>
				{' '}
				Je veux créer un compte ?
			</Link>
		</div>
	);
};

export default Login;
