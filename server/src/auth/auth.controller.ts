import { Controller, Request, Post, Get, UseGuards, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Prisma } from '@prisma/client';
import { RequestWithUser } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';

type LoginRequest = {
 user : { email: string, id: string }
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userServices: UsersService) {}

  @Post('register')
  async register(@Body() body: Prisma.UserCreateInput) {
    const { username, email, password, biography, avatarFileKey } = body;
    return this.authService.createUser({
      username,
      email,
      password,
      biography,
      avatarFileKey,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: LoginRequest) {
    return await this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticateUser(@Request() request: RequestWithUser) {
    return await this.userServices.getUserById(request.user.id);
  }

  @Post('logout')
  async logout(@Request() request: any) {
    request.session.destroy();
  }
}
