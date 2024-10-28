'use client';
import React from 'react';
import LoginForm from '@/components/authentication/LoginForm';
import Link from 'next/link';

function App() {
	return (
		<div className='flex flex-col items-center justify-center gap-4'>
			<LoginForm />
			<div>
				<Link
					href='/register'
					className=' text-secondary underline dark:text-neutral'>
					{' '}
					Je veux créer un compte ?
				</Link>
			</div>
		</div>
	);
}

export default App;
