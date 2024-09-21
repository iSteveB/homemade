import { Controller, Request, Post, Get, UseGuards, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userServices: UsersService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
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
  async login(@Request() request: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const tokenData = await this.authService.login(request.user);
    response.cookie('token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      path: '/',

    });
    return { message: 'Login successful' };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticateUser(@Request() request: RequestWithUser) {
    return await this.userServices.getUserById(request.user.id);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0)
    });
    return { message: 'Déconnexion réussie' };
  }
}
