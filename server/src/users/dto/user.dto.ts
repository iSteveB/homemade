import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

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

  @IsInt()
  followersCount: number;

  @IsInt()
  followingCount: number;

  @IsInt()
  recipesCount: number;
}
