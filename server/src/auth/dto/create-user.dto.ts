import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: "L'addresse email est invalide",
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Le mot de passe est requis',
  })
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(3)
  username: string;

  biography?: string;
  avatarFileKey?: string;
}
