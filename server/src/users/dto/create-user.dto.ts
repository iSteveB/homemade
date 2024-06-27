import { IsString, IsEnum, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEnum(['ADMIN', 'USER', 'GUEST'], { message: 'A valid role must be provided' })
  role: 'ADMIN' | 'USER' | 'GUEST';
}

