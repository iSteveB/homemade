import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RecipesModule } from './recipes/recipes.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AwsS3Service } from './aws/awsS3.service';
import { ConfigModule } from '@nestjs/config';
import { MailerService } from './mailer/mailer.service';
import { PicturesModule } from './pictures/pictures.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    ThrottlerModule.forRoot([
      {
        name: 'user',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'admin',
        ttl: 1000,
        limit: 10,
      },
    ]),
    RecipesModule,
    CommentsModule,
    TagsModule,
    AuthModule,
    UsersModule,
    PicturesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    AwsS3Service,
    MailerService,
  ],
})
export class AppModule {}
