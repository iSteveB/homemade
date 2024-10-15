import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
  Res,
} from '@nestjs/common';
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
  constructor(
    private readonly authService: AuthService,
    private readonly userServices: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { username, email, password, biography, avatarFileKey } = body;
    const newUser = await this.authService.createUser({
      name: body.name,
      username,
      email,
      password,
      biography,
      avatarFileKey,
    });

    const tokenData = await this.authService.login(newUser);

    response.cookie('token', tokenData.access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
      path: '/',
    });

    return { message: 'Signup successful' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() request: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokenData = await this.authService.login(request.user);
    response.cookie('token', tokenData.access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
      path: '/',
    });
    return { message: 'Login successful' };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticateUser(
    @Request() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userServices.getUserById(request.user.id);
    if (!user) {
      response.cookie('token', '', {
        httpOnly: true,
        secure: true,
        maxAge: 0,
        sameSite: 'none',
        path: '/',
      });
      throw new Error('User not Found');
    }
    return user;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('token', '', {
      httpOnly: true,
      secure: true,
      maxAge: 0,
      sameSite: 'none',
      path: '/',
    });
    return { message: 'Déconnexion réussie' };
  }
}
