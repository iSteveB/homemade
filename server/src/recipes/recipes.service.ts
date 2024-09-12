import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RecipesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRecipeDto: Prisma.RecipeCreateInput) {
    return this.databaseService.recipe.create({ data: { ...createRecipeDto } });
  }

  async findAllByUser(userId?: string) {
    if (userId) {
      return this.databaseService.recipe.findMany({ where: { userId } });
    }

    return this.databaseService.recipe.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.recipe.findUnique({ where: { id } });
  }

  async update(id: string, updateRecipeDto: Prisma.RecipeUpdateInput) {
    return this.databaseService.recipe.update({
      where: { id },
      data: { ...updateRecipeDto },
    });
  }

  async delete(id: string) {
    return this.databaseService.$transaction(async (prisma) => {
      await prisma.durationRecipes.deleteMany({
        where: { recipeId: id },
      });
      await prisma.categoryRecipes.deleteMany({
        where: { recipeId: id },
      });
      await prisma.picturesRecipes.deleteMany({
        where: { recipeId: id },
      });
      await prisma.ingredientsRecipes.deleteMany({
        where: { recipeId: id },
      });
      await prisma.recipesUstensils.deleteMany({
        where: { recipeId: id },
      });
      await prisma.recipesSteps.deleteMany({
        where: { recipeId: id },
      });
      await prisma.recipesTags.deleteMany({
        where: { recipeId: id },
      });
      await prisma.recipeComments.deleteMany({
        where: { recipeId: id },
      });

      return prisma.recipe.delete({ where: { id } });
    });
  }
}
