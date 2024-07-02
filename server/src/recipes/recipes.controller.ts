import { Controller, Get, Post, Body, Query, Param, Patch, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RecipesService } from './recipes.service';
import { Throttle } from '@nestjs/throttler';

@Throttle({ user: { ttl: 1000, limit: 3 } })
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create( @Body() createRecipeDto: Prisma.RecipeCreateInput) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  findAll(@Query('username') username?: string) {
    return this.recipesService.findAll(username);
  }

  @Get(':params')
  findOne(@Param('params') params: string) {
    return this.recipesService.findOne(params);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: Prisma.RecipeUpdateInput) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.recipesService.delete(id);
  }

}
