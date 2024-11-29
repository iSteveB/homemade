import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PoliciesGuard } from 'src/common/guards/policies.guard';
import { AwsS3Service } from 'src/aws/awsS3.service';

@Module({
  imports: [DatabaseModule],
  providers: [RecipesService, PoliciesGuard, AwsS3Service],
  controllers: [RecipesController],
})
export class RecipesModule {}
