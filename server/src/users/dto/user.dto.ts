import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SafeUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;

  @IsString()
  @MaxLength(500)
  biography: string;
}
