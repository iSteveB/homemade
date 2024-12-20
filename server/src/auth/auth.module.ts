import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';
import { MailerService } from 'src/mailer/mailer.service';
import { AwsS3Service } from 'src/aws/awsS3.service';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    DatabaseService,
    LocalStrategy,
    JwtStrategy,
    MailerService,
    AwsS3Service,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
