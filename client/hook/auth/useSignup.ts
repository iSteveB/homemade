import { signup } from '@/api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useSignup = () => {
	const router = useRouter();

	const signupMutation = useMutation({
		mutationFn: signup,
		onSuccess: () => {
			router.push('/home');
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
