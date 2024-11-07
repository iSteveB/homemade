import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class UserDto {
  @IsString()
  id: string;

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

  @IsBoolean()
  isAdmin: boolean;

  @IsString()
  @MaxLength(500)
  biography: string;

  @IsString()
  avatarFileKey: string;
}
