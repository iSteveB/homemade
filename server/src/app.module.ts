import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
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
      }
    ]),
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
