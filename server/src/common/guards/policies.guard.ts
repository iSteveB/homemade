// src/common/guards/policies.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RecipesService } from 'src/recipes/recipes.service';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private recipesService: RecipesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const recipeId = request.params.id;

    if (!user) {
      // Utilisateur non authentifié
      return false;
    }

    // Vérifie si l'utilisateur est admin
    if (user.isAdmin) {
      return true;
    }

    // Récupére la recette
    const recipe = await this.recipesService.findOne(recipeId);
    if (!recipe) {
      return false;
    }

    // Vérifie si l'utilisateur est le créateur de la recette
    if (recipe.userId === user.id) {
      return true;
    }

    // Accès refusé
    return false;
  }
}
