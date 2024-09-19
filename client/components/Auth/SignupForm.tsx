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

const signupSchema = z.object({
	username: z
		.string()
		.min(3, "Le nom d'utilisateur doit avoir au moins 3 caratères"),
	email: z.string().email('Addresse email invalide'),
	password: z
		.string()
		.min(8, 'Le mot de passe doit avoir au moins 8 caratères'),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
	const { signup, signupError, signupErrorMessage, signupIsLoading } = useAuth();

	const [formData, setFormData] = useState<SignupFormData>({
		username: '',
		email: '',
		password: '',
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
			setFormData({ username: '', email: '', password: '' });
		}
	};

	return (
		<Card className='w-full max-w-md mx-auto'>
			<CardHeader>
				<CardTitle>S'inscrire</CardTitle>
				<CardDescription>Créer un nouveau compte</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='username'>Nom d'utilisateur</Label>
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
						disabled={signupIsLoading}>
						{signupIsLoading ? 'Inscription...' : "S'inscrire"}
					</Button>
				</form>
			</CardContent>
			{signupError && (
				<CardFooter>
					<Alert variant='destructive'>
						<AlertDescription>{signupErrorMessage || 'Une erreur est survenue'}</AlertDescription>
					</Alert>
				</CardFooter>
			)}
		</Card>
	);
};

export default SignupForm;
