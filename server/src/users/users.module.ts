import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { AwsS3Service } from 'src/aws/awsS3.service';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, AwsS3Service],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
