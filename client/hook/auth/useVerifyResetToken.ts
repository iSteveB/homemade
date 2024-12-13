// useVerifyResetToken.ts

import { useMutation } from '@tanstack/react-query';
import { VerifyResetToken } from '@/types/auth';

const useVerifyResetToken = () => {
	const verifyResetTokenMutation = useMutation<
		VerifyResetToken,
		Error,
		string
	>({
		mutationFn: async (token: string) => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-reset-password-token?token=${token}`,
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
