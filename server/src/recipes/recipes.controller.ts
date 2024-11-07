import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Recipe } from '@prisma/client';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto, UpdateRecipeDto } from './dto/recipe.dto';

import { PoliciesGuard } from 'src/common/guards/policies.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/jwt.strategy';

@Controller('recipes')
@UseGuards(JwtAuthGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(
    @Body() createRecipeDto: CreateRecipeDto,
    @Request() request: RequestWithUser,
  ): Promise<Recipe> {
    return this.recipesService.create(createRecipeDto, request.user.id);
  }

  @Get()
  findAllRecipes() {
    return this.recipesService.findAllRecipes();
  }

  @Get()
  findAllByUser(@Query('userId') userId?: string) {
    return this.recipesService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(PoliciesGuard)
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  delete(@Param('id') id: string) {
    return this.recipesService.delete(id);
  }
}
