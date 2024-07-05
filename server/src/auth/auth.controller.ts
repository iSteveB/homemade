import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Prisma } from '@prisma/client';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() body: Prisma.UserCreateInput) {
    const { username, email, password, biography, avatar } = body;
    return this.authService.createUser({
      username,
      email,
      password,
      biography,
      avatar,
    });
  }

  @Post('logout')
  async logout(@Request() req: any) {
    req.session.destroy();
  }
}
