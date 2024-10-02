'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Add search logic
		console.log('Search query:', searchQuery);
	};
	return (
		<form onSubmit={handleSearchSubmit} className='relative'>
			<Input
				type='search'
				placeholder='Rechercher...'
				className='w-full bg-white pl-10 pr-4 dark:bg-dark-primary dark:text-neutral md:min-w-[450px]'
				value={searchQuery}
				onChange={handleSearch}
			/>
			<Search className='absolute left-3 top-1/2 size-4 -translate-y-1/2 dark:text-neutral' />
		</form>
	);
};

export default SearchBar;
