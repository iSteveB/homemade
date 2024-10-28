import { Card } from '@/components/ui/card';
import { UserSuggestion } from './components/SuggestionCard';
import SuggestionCard from './components/SuggestionCard';

// Example usage
const SuggestionList = () => {
	const suggestions: UserSuggestion[] = [
		{
			id: '1',
			name: 'Alice Johnson',
			username: 'alicej',
			avatarUrl: 'https://i.pravatar.cc/300',
		},
		{
			id: '2',
			name: 'Bob Smith',
			username: 'bobsmith',
			avatarUrl: 'https://i.pravatar.cc/300',
		},
		{
			id: '3',
			name: 'Carol White',
			username: 'cwhite',
			avatarUrl: 'https://i.pravatar.cc/300',
		},
	];

	return (
		<Card className='w-full p-4'>
      <h2 className='mb-4 text-xl font-bold'>Suggestions</h2>
			<div className='space-y-4'>
				{suggestions.map((user) => (
					<SuggestionCard key={user.id} user={user} />
				))}
			</div>
		</Card>
	);
};

export default SuggestionList;
