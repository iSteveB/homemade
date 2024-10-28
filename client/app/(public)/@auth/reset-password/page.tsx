import ResetPasswordForm from '@/components/authentication/ResetPasswordForm';
import Link from 'next/link';
import UpdatePasswordForm from '@/components/authentication/UpdatePasswordForm';

const ResetPassword = async ({
	searchParams,
}: {
	searchParams: { token: string };
}) => {
	const token = searchParams.token || '';

	if (token) {
		try {
			const response = await fetch(
				`http://localhost:8080/auth/verify-reset-password-token?token=${token}`,
				{
					headers: { 'Content-Type': 'application/json' },
					cache: 'no-store',
				}
			);

			if (!response.ok) {
				throw new Error('Failed to verify reset password token');
			}
			const data = await response.json();

			if (data.error) {
				return (
					<div className='flex flex-col items-center justify-center gap-4'>
						<ResetPasswordForm />
						<Link
							href='/login'
							className='text-secondary underline dark:text-neutral'>
							Se connecter ?
						</Link>
					</div>
				);
			}
			return <UpdatePasswordForm token={token} />;
		} catch (error) {
			return (
				<div className='flex flex-col items-center justify-center gap-4'>
					<ResetPasswordForm />
					<Link
						href='/login'
						className='text-secondary underline dark:text-neutral'>
						Se connecter ?
					</Link>
				</div>
			);
		}
	}

	return (
		<div className='flex flex-col items-center justify-center gap-4'>
			<ResetPasswordForm />
			<Link
				href='/login'
				className='text-secondary underline dark:text-neutral'>
				Se connecter ?
			</Link>
		</div>
	);
};

export default ResetPassword;
