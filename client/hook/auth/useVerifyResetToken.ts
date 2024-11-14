// useVerifyResetToken.ts

import { useMutation } from '@tanstack/react-query';
import { VerifyResetToken } from '@/types/api/auth';

const useVerifyResetToken = () => {
	const verifyResetTokenMutation = useMutation<VerifyResetToken, Error, string>({
		mutationFn: async (token: string) => {
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
		}
	});

	return {
		verifyResetToken: verifyResetTokenMutation.mutate,
		verifyResetTokenIsError: verifyResetTokenMutation.isError,
		verifyResetTokenIsLoading: verifyResetTokenMutation.isPending,
		verifyResetTokenErrorMessage: verifyResetTokenMutation.error?.message,
		verifyResetTokenData: verifyResetTokenMutation.data,
	};
};

export default useVerifyResetToken;
