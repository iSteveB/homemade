import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (user && isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async createUser(
    data: Prisma.UserCreateInput,
  ): Promise<Prisma.UserCreateInput> {
    const hashedPassword = await this.hashPassword(data.password);
    return this.usersService.create({
      ...data,
      password: hashedPassword,
    });
  }

  async login({ email, password }: { email: string; password: string }) {
    const payload = { email, password };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.secret,
      });
      const newPayload = { email: payload.email, sub: payload.sub };
      return {
        access_token: this.jwtService.sign(newPayload, { expiresIn: '1h' }),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
