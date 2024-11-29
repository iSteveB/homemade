import { useMutation } from '@tanstack/react-query';
import { ResetPassword } from '@/types/auth';

const useResetPassword = () => {
	const resetPasswordMutation = useMutation<void, Error, ResetPassword>({
		mutationFn: async (email) => {
			const response = await fetch(
				'http://localhost:8080/auth/reset-password',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(email),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Password reset failed');
			}

			return await response.json();
		},
	});

	return {
		resetPassword: resetPasswordMutation.mutate,
		resetPasswordIsLoading: resetPasswordMutation.isPending,
		resetPasswordIsError: resetPasswordMutation.isError,
		resetPasswordErrorMessage: resetPasswordMutation.error?.message,
		resetPasswordIsSuccess: resetPasswordMutation.isSuccess,
	};
};

export default useResetPassword;
