import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import {  } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
