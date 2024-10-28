import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LoginCredentials, User } from '@/types/api/auth';

const useLogin = () => {
  const router = useRouter();

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
        throw new Error(errorData.message || 'Login failed');
      }

      return await response.json();
    },
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