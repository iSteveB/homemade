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
import { CheckCircle2 } from 'lucide-react';
import useAuth from '@/hook/auth/useAuth';
import { useRouter } from 'next/navigation';

const signupSchema = z
	.object({
		name: z
			.string()
			.min(3, 'Le nom doit avoir au moins 2 caratères')
			.toLowerCase(),
		username: z
			.string()
			.min(3, "Le nom d'utilisateur doit avoir au moins 3 caratères")
			.toLowerCase(),
		email: z.string().email('Addresse email invalide').toLowerCase(),
		password: z
			.string()
			.min(8, 'Le mot de passe doit avoir au moins 8 caratères'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Les mots de passe ne correspondent pas',
		path: ['confirmPassword'],
	});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
	const { signup, signupIsError, signupErrorMessage, signupIsLoading } =
		useAuth();
	const router = useRouter();

	const [formData, setFormData] = useState<SignupFormData>({
		name: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [errors, setErrors] = useState<Partial<SignupFormData>>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const validateForm = (): boolean => {
		try {
			signupSchema.parse(formData);
			setErrors({});
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors: Partial<SignupFormData> = {};
				error.errors.forEach((err) => {
					if (err.path[0] in formData) {
						newErrors[err.path[0] as keyof SignupFormData] =
							err.message;
					}
				});
				setErrors(newErrors);
			}
			return false;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			signup(formData);
			router.push('/home');
		}
	};

	const passwordsMatch =
		formData.password === formData.confirmPassword &&
		formData.password !== '';

	return (
		<Card className='mx-auto w-full max-w-md'>
			<CardHeader>
				<CardTitle>S&apos;inscrire</CardTitle>
				<CardDescription>Créer un nouveau compte</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<Label htmlFor='name'>Nom</Label>
						<Input
							id='name'
							name='name'
							type='text'
							autoComplete='name'
							value={formData.name}
							onChange={handleChange}
							placeholder='John'
							aria-invalid={!!errors.name}
							aria-describedby='name-error'
						/>
						{errors.name && (
							<Alert variant='destructive'>
								<AlertDescription id='name-error'>
									{errors.name}
								</AlertDescription>
							</Alert>
						)}
					</div>
					<div className='space-y-2'>
						<Label htmlFor='username'>Nom d&apos;utilisateur</Label>
						<Input
							id='username'
							name='username'
							type='text'
							autoComplete='username'
							value={formData.username}
							onChange={handleChange}
							placeholder='@'
							aria-invalid={!!errors.username}
							aria-describedby='username-error'
						/>
						{errors.username && (
							<Alert variant='destructive'>
								<AlertDescription id='username-error'>
									{errors.username}
								</AlertDescription>
							</Alert>
						)}
					</div>
					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							name='email'
							type='email'
							autoComplete='email'
							value={formData.email}
							onChange={handleChange}
							aria-invalid={!!errors.email}
							aria-describedby='email-error'
						/>
						{errors.email && (
							<Alert variant='destructive'>
								<AlertDescription id='email-error'>
									{errors.email}
								</AlertDescription>
							</Alert>
						)}
					</div>
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
						className='w-full'
						disabled={signupIsLoading}>
						{signupIsLoading ? 'Inscription...' : "S'inscrire"}
					</Button>
				</form>
			</CardContent>
			{signupIsError && (
				<CardFooter>
					<Alert variant='destructive'>
						<AlertDescription>
							{signupErrorMessage || 'Une erreur est survenue'}
						</AlertDescription>
					</Alert>
				</CardFooter>
			)}
		</Card>
	);
};

export default SignupForm;
