import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/lib/providers/ReactQueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Homemade',
	description: 'Share your Taste',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// eslint-disable-next-line tailwindcss/no-custom-classname
		<html lang='fr' className='light'>
			<body className={`${inter.className} bg-neutral dark:bg-dark-neutral/90`}>
				<ReactQueryProvider>
					{children}
				</ReactQueryProvider>
			</body>
		</html>
	);
}
