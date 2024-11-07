import TrendingCard from './components/TrendingCard';
import type { TrendingCategory } from './components/TrendingCard';

const Trend = () => {
	const trendingCategories: TrendingCategory[] = [
		{ name: 'ItalianCuisine', postCount: 15243 },
		{ name: 'VeganRecipes', postCount: 12789 },
		{ name: 'HealthyEating', postCount: 10567 },
		{ name: 'QuickMeals', postCount: 9876 },
		{ name: 'DessertLove', postCount: 8765 },
		{ name: 'GlutenFree', postCount: 7654 },
		{ name: 'BBQMasters', postCount: 6543 },
	];

	return <TrendingCard categories={trendingCategories} />;
};

export default Trend;
