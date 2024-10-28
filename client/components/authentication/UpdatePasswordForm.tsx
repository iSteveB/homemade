'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '../ui/card';
import { useState } from 'react';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import useEditPassword from '@/hook/auth/useEditPassword';

const NewPasswordForm = ({ token }: { token: string }) => {
	const [formData, setFormData] = useState({
		password: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState({
		password: '',
		confirmPassword: '',
	});
	const {
		editPassword,
		editPasswordIsLoading,
		editPasswordIsError,
		editPasswordIsSuccess,
		editPasswordErrorMessage,
	} = useEditPassword(token);

	const passwordsMatch =
		formData.password === formData.confirmPassword &&
		formData.password !== '';
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (passwordsMatch) {
			editPassword(formData.password);
		}
	};
	return (
		<Card className='mx-auto w-full max-w-md'>
			<CardHeader>
				<CardTitle>Nouveau mot de passe</CardTitle>
				<CardDescription>
					Entrez votre nouveau mot de passe.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='password'>Mot de passe</Label>
						<Input
							id='password'
							name='password'
							type='password'
							placeholder='8 caractères minimum'
							autoComplete='new-password'
							value={formData.password}
							onChange={handleChange}
							aria-invalid={!!errors.password}
							aria-describedby='password-error'
						/>
						{errors.password && (
							<Alert variant='destructive'>
								<AlertDescription id='password-error'>
									{errors.password}
								</AlertDescription>
							</Alert>
						)}
					</div>
					<div className='space-y-2'>
						<Label htmlFor='confirmPassword'>
							Confirmer le mot de passe
						</Label>
						<div className='relative'>
							<Input
								id='confirmPassword'
								name='confirmPassword'
								type='password'
								placeholder='Confirmer le mot de passe'
								autoComplete='new-password'
								value={formData.confirmPassword}
								onChange={handleChange}
								aria-invalid={!!errors.confirmPassword}
								aria-describedby='confirmPassword-error'
							/>
							{passwordsMatch && (
								<CheckCircle2 className='absolute right-3 top-1/2 size-5 -translate-y-1/2 text-primary' />
							)}
						</div>
						{errors.confirmPassword && (
							<Alert variant='destructive'>
								<AlertDescription id='confirmPassword-error'>
									{errors.confirmPassword}
								</AlertDescription>
							</Alert>
						)}
					</div>
					<Button
						type='submit'
						disabled={!passwordsMatch || editPasswordIsLoading}
						className='w-full'>
						{editPasswordIsLoading
							? 'Chargement...'
							: 'Modifier le mot de passe'}
					</Button>
				</form>
			</CardContent>
			{editPasswordIsError && (
				<CardFooter>
					<Alert>
						<AlertDescription className='text-red-500'>
							{editPasswordErrorMessage}
							<Link href='/login' className='underline'>
								Se connecter{' '}
								<ArrowUpRight className='inline-block size-4' />{' '}
							</Link>
						</AlertDescription>
					</Alert>
				</CardFooter>
			)}
			{editPasswordIsSuccess && (
				<CardFooter>
					<Alert>
						<AlertDescription className='text-primary'>
							Votre mot de passe a été modifié.{' '}
							<Link href='/login' className='underline'>
								Se connecter{' '}
								<ArrowUpRight className='inline-block size-4' />{' '}
							</Link>
						</AlertDescription>
					</Alert>
				</CardFooter>
			)}
		</Card>
	);
};

export default NewPasswordForm;
