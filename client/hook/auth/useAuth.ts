import useUserData from '../user/useUserData';
import useSignup from './useSignup';
import useLogin from './useLogin';
import useLogout from './useLogout';
import useResetPassword from './useResetPassword';
import useVerifyResetToken from './useVerifyResetToken';
import { LoginCredentials } from '@/types/api/auth';

const useAuth = (credentials?: LoginCredentials | undefined) => {
	const userData = useUserData();
	const signup = useSignup();
	const login = useLogin(credentials);
	const logout = useLogout();
	const resetPassword = useResetPassword();
	const verifyResetToken = useVerifyResetToken;

	return {
		...userData,
		...signup,
		...login,
		logout: logout.logout,
		...resetPassword,
		verifyResetToken,
	};
};

export default useAuth;
