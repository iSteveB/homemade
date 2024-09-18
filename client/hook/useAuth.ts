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
        throw new Error('Signup failed');
      }
      const data = await response.json();
      setToken(data.access_token);
      return data.access_token;
    }
  });

	const loginMutation = useMutation({
		mutationFn: async (credentials: LoginCredentials) => {
			const response = await fetch(`http://localhost:8080/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(credentials),
			});
			const token: Response = await response.json(); 
			if (token) {
				setToken(token.access_token);
			}

			return token;
		},
	});

	const logout = () => {
		clearToken();
	};

	return {
		login: loginMutation.mutate,
		logout,
		loginError: loginMutation.isError,
		loginIsLoading: loginMutation.isPending,
    signup: signupMutation.mutate,
    signupError: signupMutation.isError,
    signupIsLoading: signupMutation.isPending
	};
};

export default useAuth;
