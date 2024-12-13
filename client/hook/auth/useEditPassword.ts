import { useMutation } from '@tanstack/react-query';

const useEditPassword = (token: string) => {
	const editPasswordMutation = useMutation<void, Error, string>({
		mutationFn: async (password) => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/update-password`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ password, token }),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message ||
						'Erreur dans la réinitialisation du mot de passe'
				);
			}

			return await response.json();
		},
	});

	return {
		editPassword: editPasswordMutation.mutate,
		editPasswordIsLoading: editPasswordMutation.isPending,
		editPasswordIsError: editPasswordMutation.isError,
		editPasswordErrorMessage: editPasswordMutation.error?.message,
		editPasswordIsSuccess: editPasswordMutation.isSuccess,
	};
};

export default useEditPassword;
