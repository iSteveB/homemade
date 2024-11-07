import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PoliciesGuard } from 'src/common/guards/policies.guard';

@Module({
  imports: [DatabaseModule],
  providers: [RecipesService, PoliciesGuard],
  controllers: [RecipesController],
})
export class RecipesModule {}
