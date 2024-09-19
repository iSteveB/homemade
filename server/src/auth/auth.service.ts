import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './jwt.strategy';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect!');
    }

    const isPasswordMatching = await this.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Email ou mot de passe incorrect!');
    }
    const { password: _, ...existingUser } = user;
    return existingUser;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  private async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private async authenticateUser({ email, id }: UserPayload) {
    const payload: UserPayload = { email, id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '30d' }),
    };
  }

  async createUser(data: Prisma.UserCreateInput) {
    const isEmailExisting = await this.usersService.getUserByEmail(data.email);
    if (isEmailExisting) {
      throw new ConflictException('Cette adresse email est déjà utilisée.');
    }
    const isUsernameExisting = await this.usersService.getUserByUsername(
      data.username,
    );

    if (isUsernameExisting) {
      throw new ConflictException("Ce nom d'utilisateur est déjà utilisé.");
    }

    const hashedPassword = await this.hashPassword(data.password);

    const newUser = await this.databaseService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return this.authenticateUser({
      id: newUser.id,
      email: newUser.email,
    });
  }

  async login({ email, id }: { email: string; id: string }) {
    return await this.authenticateUser({ email, id });
  }
}
