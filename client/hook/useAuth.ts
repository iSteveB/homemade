import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const LoginCredentialsSchema = z.object({
	email: z.string().email('Adresse email invalide'),
	password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caract res'),
});

const SignupCredentialsSchema = LoginCredentialsSchema.extend({
	username: z.string().min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caract res'),
	biography: z.string().optional(),
});


export const UserSchema = z.object({
	id: z.string().uuid(),
	username: z.string().min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caract res'),
	name: z.string().min(3, 'Le nom doit contenir au moins 3 caract res'),
	avatarUrl: z.string().url(),
	biography: z.string().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

const useAuth = () => {
	const router = useRouter();

	const userData = useQuery<User, Error>({
		queryKey: ['user'],
		queryFn: async () => {
			const response = await fetch('http://localhost:8080/auth/', {
				method: 'GET',
				credentials: 'include',
			});
			if (!response.ok) {
				const errorData = await response.json();
				router.push("/")
				throw new Error(errorData.message || 'Login failed');
			}
			return await response.json();
		},
	});

	const signupMutation = useMutation({
		mutationFn: async (credentials: z.infer<typeof SignupCredentialsSchema>) => {
			const response = await fetch(
				'http://localhost:8080/auth/register',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(credentials),
					credentials: 'include'
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Signup failed');
			}
			router.push('/home')
			return response.json();
		},
	});

	const loginMutation = useMutation<User, Error, z.infer<typeof LoginCredentialsSchema>>({
		mutationFn: async (credentials: z.infer<typeof LoginCredentialsSchema>) => {
			const response = await fetch('http://localhost:8080/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(credentials),
				credentials: 'include',
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Login failed');
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
