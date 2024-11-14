import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const emailToLowerCase = email.toLowerCase();
    const existingUser = await this.authService.validateUser(
      emailToLowerCase,
      password,
    );
    if (!existingUser) {
      throw new UnauthorizedException('Email ou mot de passe incorrect!');
    }
    return existingUser;
  }
}
