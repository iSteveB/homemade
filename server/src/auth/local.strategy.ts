import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const existingUser = await this.authService.validateUser(email, password);
    if (!existingUser) {
      throw new Error('Email ou mot de passe incorrect!');
    }
    return existingUser;
  }
}
