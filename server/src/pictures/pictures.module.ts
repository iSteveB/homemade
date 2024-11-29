import { Module } from '@nestjs/common';
import { PicturesController } from './pictures.controller';
import { AwsS3Service } from 'src/aws/awsS3.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [PicturesController],
  providers: [AwsS3Service, DatabaseService],
})
export class PicturesModule {}
