import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SignupCredentials } from '@/types/api/auth';

const useSignup = () => {
  const router = useRouter();

  const signupMutation = useMutation({
		mutationFn: async (
			credentials: SignupCredentials
		) => {
			const response = await fetch(
				'http://localhost:8080/auth/register',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(credentials),
					credentials: 'include',
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Signup failed');
			}
			router.push('/home');
			return response.json();
		},
	});

  return {
    signup: signupMutation.mutate,
    signupIsLoading: signupMutation.isPending,
    signupIsError: signupMutation.isError,
    signupErrorMessage: signupMutation.error?.message,
  };
};

export default useSignup;