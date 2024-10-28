import { useQuery } from '@tanstack/react-query';
import { VerifyResetToken } from '@/types/api/auth';

const useVerifyResetToken = (token: string) => {
	const verifyResetToken = useQuery<VerifyResetToken>({
		queryKey: ['verify-reset-token', token],
		queryFn: async ({ queryKey }) => {
			const token = queryKey[1];
			const response = await fetch(
				`http://localhost:8080/auth/verify-reset-password-token?token=${token}`,
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Invalid token');
			}

			return await response.json();
		},
		enabled: !!token,
	});

	return {
		data: verifyResetToken.data,
		isError: verifyResetToken.isError,
		isLoading: verifyResetToken.isLoading,
	};
};

export default useVerifyResetToken;
