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
import useAuth from '@/hook/useAuth';

const loginSchema = z.object({
	email: z.string().email('Adresse email invalide'),
	password: z
		.string()
		.min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const { login, loginError, loginErrorMessage, loginIsLoading } = useAuth();

	const [formData, setFormData] = useState<LoginFormData>({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState<Partial<LoginFormData>>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const validateForm = (): boolean => {
		try {
			loginSchema.parse(formData);
			setErrors({});
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors: Partial<LoginFormData> = {};
				error.errors.forEach((err) => {
					if (err.path[0] in formData) {
						newErrors[err.path[0] as keyof LoginFormData] =
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
			login(formData);
			setFormData({ email: '', password: '' });
		}
	};

	return (
		<Card className='w-full max-w-md mx-auto'>
			<CardHeader>
				<CardTitle>Connexion</CardTitle>
				<CardDescription>Connectez-vous à votre compte</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className='space-y-4'>
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
              autoComplete='current-password'
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
					<Button
						type='submit'
						className='w-full'
						disabled={loginIsLoading}>
						{loginIsLoading
							? 'Connexion en cours...'
							: 'Se connecter'}
					</Button>
				</form>
			</CardContent>
			{loginError && (
				<CardFooter>
					<Alert variant='destructive'>
						<AlertDescription>{loginErrorMessage}</AlertDescription>
					</Alert>
				</CardFooter>
			)}
		</Card>
	);
}
