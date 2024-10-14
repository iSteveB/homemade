import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface LoginCredentials {
	email: string;
	password: string;
}

interface SignupCredentials extends LoginCredentials {
	username: string;
	biography?: string;
}

export interface User {
	id: string;
	username: string;
	name: string;
	avatarUrl: string;
	biography?: string; 
	createdAt: string;
	updatedAt: string;
}

const useAuth = () => {
	const router = useRouter();

	const userData = useQuery<User, Error >({
		queryKey: ['user'],
		queryFn: async () => {
			const response = await fetch('http://localhost:8080/auth/', {
				method: 'GET',
				credentials: 'include',
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || 'Login failed'
				);
			}
			return await response.json();
		},
	});

	const signupMutation = useMutation({
		mutationFn: async (credentials: SignupCredentials) => {
			const response = await fetch(
				'http://localhost:8080/auth/register',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(credentials),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Signup failed');
			}

			return response.json();
		},
	});

	const loginMutation = useMutation<User, Error, LoginCredentials>({
		mutationFn: async (credentials: LoginCredentials) => {
			const response = await fetch('http://localhost:8080/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(credentials),
				credentials: 'include',
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || 'Login failed'
				);
			}
			return await response.json();
		},
		onSuccess: () => {
			router.push('/home');
		},
	});

	const logout = async () => {
		const response = await fetch('http://localhost:8080/auth/logout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error('Logout failed');
		}

		router.push('/');

		return response.json();
	};

	return {
		userData: userData.data,
		login: loginMutation.mutate,
		logout,
		loginError: loginMutation.isError,
		loginErrorMessage: loginMutation.error?.message,
		loginIsLoading: loginMutation.isPending,
		signup: signupMutation.mutate,
		signupError: signupMutation.isError,
		signupErrorMessage: signupMutation.error?.message,
		signupIsLoading: signupMutation.isPending,
	};
};

export default useAuth;
