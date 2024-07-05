import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: Request & { user: Prisma.UserCreateInput }): Promise<Prisma.UserCreateInput> {
    return req.user;
  }

  @Post('register')
  async register(@Body() body: Prisma.UserCreateInput) {
    const { username, email, password, biography, avatar } = body;
    return this.authService.createUser({ username, email, password, biography, avatar });
  }
}