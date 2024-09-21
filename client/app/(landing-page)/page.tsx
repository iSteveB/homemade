'use client';
import React from 'react';
import AuthForm from '../../components/Auth/AuthForm';

function App() {
	return (
		<main className='flex min-h-screen items-center justify-between p-24 text-black'>
			<div className='z-10 w-1/2 items-left justify-start font-mono text-sm lg:flex lg:flex-col gap-4'>
				<p className='text-2xl'>Share your Taste</p>
				<h1 className='text-8xl font-bold'>Homemade</h1>
				<p className='text-2xl'>
					Partagez vos recettes préférées avec le monde entier.{' '}
				</p>
			</div>
			<div className='w-1/2'>
				<AuthForm />
			</div>
		</main>
	);
}

export default App;
