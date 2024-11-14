'use client';
import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import useResetPassword from '@/hook/auth/useResetPassword';
import useVerifyResetToken from '@/hook/auth/useVerifyResetToken';

const resetPasswordSchema = z.object({
	email: z.string().email('Adresse email invalide').toLowerCase(),
});

const ResetPasswordForm = ({ token }: { token?: string }) => {
	const {
		resetPassword,
		resetPasswordIsError,
		resetPasswordErrorMessage,
		resetPasswordIsLoading,
		resetPasswordIsSuccess,
	} = useResetPassword();
	const { verifyResetToken } = useVerifyResetToken();

	const [email, setEmail] = useState('');
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			resetPasswordSchema.parse({ email });
			resetPassword({ email });
			setEmail('');
		} catch (err) {
			if (err instanceof z.ZodError) {
				setError(err.errors[0].message);
			} else {
				setError('Une erreur est survenue. Veuillez réessayer.');
			}
		}
	};
	if (token) {
		verifyResetToken(token);
	}

	return (
		<Card className='mx-auto w-full max-w-md'>
			<CardHeader>
				<CardTitle>Réinitialiser le mot de passe</CardTitle>
				<CardDescription>
					Entrez votre adresse e-mail pour recevoir un lien de
					réinitialisation
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							placeholder='votre@email.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							aria-invalid={!!error}
							aria-describedby='email-error'
						/>
						{error && (
							<Alert variant='destructive'>
								<AlertDescription id='email-error'>
									{error}
								</AlertDescription>
							</Alert>
						)}
						{resetPasswordIsError && (
							<Alert>
								<AlertDescription className='text-red-600'>
									{resetPasswordErrorMessage}
								</AlertDescription>
							</Alert>
						)}
					</div>
					<Button
						type='submit'
						className='w-full'
						disabled={resetPasswordIsLoading}>
						{resetPasswordIsLoading
							? 'Envoi en cours...'
							: 'Envoyer le lien de réinitialisation'}
					</Button>
				</form>
			</CardContent>
			{resetPasswordIsSuccess && (
				<CardFooter>
					<Alert>
						<AlertDescription className='text-primary'>
							Un email de réinitialisation de mot de passe vous a
							été envoyé.
						</AlertDescription>
					</Alert>
				</CardFooter>
			)}
		</Card>
	);
};

export default ResetPasswordForm;
