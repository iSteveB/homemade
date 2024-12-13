import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/auth';

const useUserData = () => {
	const userData = useQuery<User, Error>({
		queryKey: ['user'],
		queryFn: async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/`,
				{
					method: 'GET',
					credentials: 'include',
				}
			);
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || 'Failed to fetch user data'
				);
			}
			return await response.json();
		},
	});

	return {
		userData: userData.data,
		userDataError: userData.isError,
		userDataIsLoading: userData.isLoading,
	};
};

export default useUserData;
