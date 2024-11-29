import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LoginCredentials, User } from '@/types/auth';
import { login } from '@/api/auth.api';

const useLogin = () => {
	const router = useRouter();

	const loginMutation = useMutation<User, Error, LoginCredentials>({
		mutationFn: (credentials: LoginCredentials) => login(credentials),
		onSuccess: () => {
			router.push('/home');
		},
	});

	return {
		login: loginMutation.mutate,
		loginIsLoading: loginMutation.isPending,
		loginIsError: loginMutation.isError,
		loginErrorMessage: loginMutation.error?.message,
	};
};

export default useLogin;
