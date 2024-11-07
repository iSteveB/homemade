import { z } from 'zod';

export const LoginCredentialsSchema = z.object({
	email: z.string().email('Adresse email invalide'),
	password: z
		.string()
		.min(8, 'Le mot de passe doit contenir au moins 8 caract res'),
});

export const SignupCredentialsSchema = LoginCredentialsSchema.extend({
	username: z
		.string()
		.min(3, "Le nom d'utilisateur doit contenir au moins 3 caract res"),
	biography: z.string().optional(),
});

export const resetPasswordSchema = z.object({
	email: z.string().email('Adresse email invalide'),
});

export const UserSchema = z.object({
	id: z.string().uuid(),
	username: z
		.string()
		.min(3, "Le nom d'utilisateur doit contenir au moins 3 caract res"),
	name: z.string().min(3, 'Le nom doit contenir au moins 3 caract res'),
	avatarUrl: z.string().url(),
	bannerUrl: z.string().url(),
	biography: z.string().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const VerifyResetTokenSchema = z.object({
	message: z.string(),
	error: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;
export type VerifyResetToken = z.infer<typeof VerifyResetTokenSchema>;
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type SignupCredentials = z.infer<typeof SignupCredentialsSchema>;
export type ResetPassword = z.infer<typeof resetPasswordSchema>;