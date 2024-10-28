import useUserData from './useUserData';
import useSignup from './useSignup';
import useLogin from './useLogin';
import useLogout from './useLogout';
import useResetPassword from './useResetPassword';
import useVerifyResetToken from './useVerifyResetToken';

const useAuth = () => {
	const userData = useUserData();
	const signup = useSignup();
	const login = useLogin();
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
