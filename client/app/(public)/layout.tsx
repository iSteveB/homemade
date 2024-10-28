import { ReactNode } from 'react';

export default function Layout({
	children,
	auth,
}: {
	children: ReactNode;
	auth: ReactNode;
}) {
	return (
		<main className='flex min-h-screen items-center justify-between bg-neutral p-24 text-primary dark:bg-dark-primary dark:text-neutral'>
			<div className='z-10 w-1/2 items-start justify-start gap-4 font-mono text-sm lg:flex lg:flex-col'>
				<p className='text-2xl'>Share your Taste!</p>
				<h1 className='text-8xl font-bold'>Homemade</h1>
				<p className='text-2xl'>
					Partagez vos recettes préférées avec le monde entier.
				</p>
			</div>
			<div className='w-1/2'>{auth}</div>
		</main>
	);
}
