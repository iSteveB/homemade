import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class UserCredentials {
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
  id: string;
}
export class LoginUserDto {
  @ValidateNested()
  @Type(() => UserCredentials)
  user: UserCredentials;
}
