import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@/lib/store/useAuthStore';

interface LoginCredentials {
	email: string;
	password: string;
}

interface SignupCredentials extends LoginCredentials {
  username: string;
  biography?: string;
}

interface Response {
  access_token: string;
}

const useAuth = () => {
	const setToken = useAuthStore((state) => state.setToken);
	const clearToken = useAuthStore((state) => state.clearToken);

  const signupMutation = useMutation({
    mutationFn: async (credentials: SignupCredentials) => {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Signup failed');
			}
      const token: Response = await response.json();
			return token;
		},
		onSuccess: (token) => {
			setToken(token.access_token);
		},

		onError: (error: Error) => {
			clearToken();
			return error.message;
		},
  });

	const loginMutation = useMutation({
		mutationFn: async (credentials: LoginCredentials) => {
			const response = await fetch(`http://localhost:8080/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(credentials),
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Login failed');
			}
			const token: Response = await response.json(); 
			return token;
		},

		onSuccess: (token) => {
			setToken(token.access_token);
		},

		onError: (error) => {
			clearToken();
			return error.message;
		},

	});

	const logout = () => {
		clearToken();
	};

	return {
		login: loginMutation.mutate,
		logout,
		loginError: loginMutation.isError,
		loginErrorMessage: loginMutation.error?.message,
		loginIsLoading: loginMutation.isPending,
    signup: signupMutation.mutate,
    signupError: signupMutation.isError,
		signupErrorMessage: signupMutation.error?.message,
    signupIsLoading: signupMutation.isPending
	};
};

export default useAuth;
