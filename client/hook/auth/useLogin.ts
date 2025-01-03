import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LoginCredentials, User } from '@/types/auth';
import { login } from '@/api/auth.api';

const useLogin = () => {
	const router = useRouter();

	const loginMutation = useMutation<User, Error, LoginCredentials>({
		mutationKey: ['login'],
		mutationFn: (credentials: LoginCredentials) => login(credentials),
		onSuccess: (data) => {
			router.push('/home');
			console.log('User logged in:', data);
			localStorage.setItem('user', JSON.stringify(data));

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
