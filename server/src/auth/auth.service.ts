import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './jwt.strategy';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MailerService } from '../mailer/mailer.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect!');
    }

    const isPasswordMatching = await this.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Email ou mot de passe incorrect!');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...existingUser } = user;
    return existingUser;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  private async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private async authenticateUser({ email, id }: UserPayload) {
    const payload: UserPayload = { email, id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '30d' }),
    };
  }

  async createUser(data: CreateUserDto) {
    const email = data.email.toLowerCase();
    const isEmailExisting = await this.usersService.getUserByEmail(email);
    if (isEmailExisting) {
      throw new ConflictException('Cette adresse email est déjà utilisée.');
    }
    const isUsernameExisting = await this.usersService.getUserByUsername(
      data.username,
    );

    if (isUsernameExisting) {
      throw new ConflictException("Ce nom d'utilisateur est déjà utilisé.");
    }

    const hashedPassword = await this.hashPassword(data.password);

    const newUser = await this.databaseService.user.create({
      data: {
        ...data,
        email,
        password: hashedPassword,
      },
    });

    await this.mailerService.sendCreateAccountEmail({
      firstName: data.name,
      recipient: email,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = newUser;
    return user;
  }

  async login({ email, id }: { email: string; id: string }) {
    return await this.authenticateUser({ email: email.toLowerCase(), id });
  }

  async resetUserPassword({ email }: { email: string }) {
    const existingUser = await this.usersService.getUserByEmail(
      email.toLowerCase(),
    );
    const resetPasswordToken = uuidv4();

    if (!existingUser) {
      throw new UnauthorizedException("L'utilisateur n'existe pas.");
    }

    if (existingUser.isResettingPassword === true) {
      throw new UnauthorizedException(
        'Le mot de passe est déjà en cours de réinitalisation.',
      );
    }

    try {
      await this.mailerService.sendResetPasswordEmail({
        recipient: existingUser.email,
        firstName: existingUser.name,
        token: resetPasswordToken,
      });

      await this.databaseService.user.update({
        where: { email },
        data: {
          isResettingPassword: true,
          resetPasswordToken,
        },
      });

      return {
        error: false,
        message:
          'Un email de réinitialisation de mot de passe vous a été envoyé.',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Une erreur est survenue lors de la réinitialisation du mot de passe.',
      );
    }
  }

  async verifyResetPasswordToken({ token }: { token: string }) {
    const existingUser =
      await this.usersService.getUserByResetPasswordToken(token);

    if (!existingUser) {
      return {
        error: true,
        message: 'Token invalide.',
      };
    }

    if (existingUser.isResettingPassword === false) {
      return {
        error: true,
        message:
          'Aucun changement de mot de passe n’a été demandé pour cet utilisateur.',
      };
    }
    return {
      error: false,
      message: 'Token valide.',
    };
  }

  async updatePassword({
    token,
    password,
  }: {
    token: string;
    password: string;
  }) {
    const existingUser =
      await this.usersService.getUserByResetPasswordToken(token);

    if (!existingUser) {
      throw new UnauthorizedException('Token invalide.');
    }

    if (existingUser.isResettingPassword === false) {
      return {
        error: true,
        message:
          'Aucun changement de mot de passe n’a été demandé pour cet utilisateur.',
      };
    }

    const hashedPassword = await this.hashPassword(password);

    await this.databaseService.user.update({
      where: { email: existingUser.email },
      data: {
        password: hashedPassword,
        isResettingPassword: false,
        resetPasswordToken: null,
      },
    });
  }
}
