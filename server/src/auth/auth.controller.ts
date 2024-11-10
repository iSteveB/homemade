import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
  Res,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RequestWithUser } from './jwt.strategy';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly databaseService: DatabaseService,
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

  @Post('reset-password')
  async resetUserPassword(@Body('email') email: string) {
    const response = await this.authService.resetUserPassword({ email });
    return response;
  }

  @Get('verify-reset-password-token')
  async verifyResetPasswordToken(@Query('token') token: string) {
    const response = await this.authService.verifyResetPasswordToken({ token });
    return response;
  }

  @Post('update-password')
  async updatePassword(
    @Body('token') token: string,
    @Body('password') password: string,
  ) {
    await this.authService.updatePassword({
      token,
      password,
    });
    return { message: 'Votre mot de passe a été mis à jour avec succès.' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() request: RequestWithUser,
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
    const user = await this.databaseService.user.findUnique({
      where: { id: request.user.id },
    });
    if (!user) {
      response.cookie('token', '', {
        httpOnly: true,
        secure: true,
        maxAge: 0,
        sameSite: 'none',
        path: '/',
      });
      throw new NotFoundException('User not Found');
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
