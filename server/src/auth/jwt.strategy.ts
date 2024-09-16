import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export type UserPayload = { id: string, email: string };
export type RequestWithUser = {
  user: UserPayload;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:  process.env.JWT_SECRET,
    });
  }

  async validate({email, id}: UserPayload) {
    const user = { email, id };
    return user;
  }
}
