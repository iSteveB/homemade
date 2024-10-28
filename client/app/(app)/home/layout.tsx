export default function Layout({
	feed,
	trend,
	profilCard,
	createPost,
	suggestions,
}: {
	createPost: React.ReactNode;
	feed: React.ReactNode;
	trend: React.ReactNode;
	profilCard: React.ReactNode;
	suggestions: React.ReactNode;
}) {
	return (
		<div className='container mx-auto p-4'>
			<div className='grid grid-cols-4 gap-4'>
				<div className='col-span-1 size-full'>
					<aside className='flex flex-col gap-4'>
						{profilCard}
						{suggestions}
					</aside>
				</div>
				<div className='col-span-2 size-full'>
					<section className='flex flex-col gap-4'>
						{createPost}
						{feed}
					</section>
				</div>
				<aside className='col-span-1'>{trend}</aside>
			</div>
		</div>
	);
}
