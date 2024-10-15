import Header from '@/components/layout/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<Header />
			{children}
		</main>
	);
}
