import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: Prisma.RecipeCreateInput) {
    console.log(createRecipeDto);
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.recipesService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: Prisma.RecipeUpdateInput,
  ) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.recipesService.delete(id);
  }
}
