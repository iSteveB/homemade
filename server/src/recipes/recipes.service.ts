import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Recipe } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { AwsS3Service } from 'src/aws/awsS3.service';
import { slugify } from 'utils/slugify';
import {
  CreateRecipeDto,
  UpdateRecipeDto,
  SafeRecipeDto,
} from './dto/recipe.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RecipesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  async create(
    createRecipeDto: CreateRecipeDto,
    userId: string,
    pictures?: Express.Multer.File[],
  ): Promise<Recipe> {
    const recipeId = uuidv4();
    const { title } = createRecipeDto;
    const slug = slugify(title);

    const uploadedPictures = await Promise.all(
      pictures
        ? pictures.map((file) =>
            this.awsS3Service.uploadFile(file, {
              userId,
              recipeId,
              fileType: 'recipePhoto',
            }),
          )
        : [],
    );

    return await this.databaseService.recipe.create({
      data: {
        id: recipeId,
        title: createRecipeDto.title,
        description: createRecipeDto.description,
        slug,
        difficulty: createRecipeDto.difficulty,
        cost: createRecipeDto.cost,
        servings: createRecipeDto.servings,
        user: {
          connect: { id: userId },
        },
        // Gestion des catégories
        category: {
          create: createRecipeDto.categories?.map((category) => ({
            category: {
              connectOrCreate: {
                where: { name: category.name },
                create: { name: category.name },
              },
            },
          })),
        },
        // Gestion des tags
        tags: {
          create: createRecipeDto.tags?.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag.name },
                create: { name: tag.name },
              },
            },
          })),
        },
        // Gestion des ingrédients
        ingredients: {
          create: createRecipeDto.ingredients?.map((ingredientDto) => ({
            quantity: ingredientDto.quantity,
            unit: ingredientDto.unit,
            ingredient: {
              connectOrCreate: {
                where: { name: ingredientDto.name },
                create: { name: ingredientDto.name },
              },
            },
          })),
        },
        // Gestion des ustensiles
        ustensils: {
          create: createRecipeDto.ustensils?.map((ustensil) => ({
            ustensil: {
              connectOrCreate: {
                where: { name: ustensil.name },
                create: { name: ustensil.name },
              },
            },
          })),
        },
        // Gestion des étapes
        steps: {
          create: createRecipeDto.steps?.map((step) => ({
            step: {
              create: {
                description: step.description,
                order: step.order,
              },
            },
          })),
        },
        // Gestion des images
        pictures: {
          create: uploadedPictures.map((pictureData) => ({
            picture: {
              create: {
                pictureId: pictureData.pictureId,
                name: pictureData.originalFileName,
                fileKey: pictureData.fileKey,
              },
            },
          })),
        },
        // Gestion de la durée
        duration: {
          create: {
            duration: {
              create: {
                preparation: createRecipeDto.duration?.preparation || 0,
                cooking: createRecipeDto.duration?.cooking || 0,
                rest: createRecipeDto.duration?.rest || 0,
              },
            },
          },
        },
      },
      include: {
        category: true,
        tags: true,
        ingredients: true,
        ustensils: true,
        steps: true,
        pictures: true,
        duration: true,
      },
    });
  }

  async findBySlug(slug: string): Promise<Recipe | undefined> {
    return this.databaseService.recipe.findUnique({ where: { slug } });
  }

  async findAllRecipes() {
    return this.databaseService.recipe.findMany({
      include: {
        duration: {
          include: {
            duration: true,
          },
        },
        category: {
          include: {
            category: true,
          },
        },
        pictures: {
          include: {
            picture: {
              select: {
                pictureId: true,
                name: true,
              },
            },
          },
        },
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        ustensils: {
          include: {
            ustensil: true,
          },
        },
        steps: {
          include: {
            step: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          include: {
            comment: true,
          },
        },
        user: {
          select: {
            name: true,
            username: true,
          },
        },
        _count: {
          select: {
            comments: true,
            FavoriteRecipe: true,
          },
        },
      },
    });
  }

  async findAllByUser(userId: string): Promise<SafeRecipeDto[]> {
    const userRecipes = await this.databaseService.recipe.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            name: true,
            username: true,
          },
        },
        duration: {
          include: {
            duration: true,
          },
        },
        category: {
          include: {
            category: true,
          },
        },
        pictures: {
          include: {
            picture: true,
          },
        },
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        ustensils: {
          include: {
            ustensil: true,
          },
        },
        steps: {
          include: {
            step: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          include: {
            comment: true,
          },
        },
        FavoriteRecipe: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
            FavoriteRecipe: true,
          },
        },
      },
    });

    if (!userRecipes) {
      return [];
    }

    const safeRecipe = userRecipes.map(
      ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        userId,
        tags,
        ingredients,
        ustensils,
        steps,
        pictures,
        duration,
        ...recipe
      }) => ({
        ...recipe,
        tags: tags.map(({ tag }) => tag),
        ingredients: ingredients.map(({ ingredient, quantity, unit }) => ({
          name: ingredient.name,
          id: ingredient.id,
          quantity,
          unit,
        })),
        ustensils: ustensils.map(({ ustensil }) => ({
          name: ustensil.name,
          id: ustensil.id,
        })),
        steps: steps.map(({ step }) => ({
          description: step.description,
          order: step.order,
        })),
        pictures: pictures.map(({ picture }) => ({
          pictureId: picture.id,
          name: picture.name,
        })),
        duration: duration.map(({ duration }) => ({
          preparation: duration.preparation,
          cooking: duration.cooking,
          rest: duration.rest,
        }))[0],
        isFavorite: !!recipe.FavoriteRecipe.length,
        commentsCount: recipe._count.comments,
        favoritesCount: recipe._count.FavoriteRecipe,
      }),
    );

    return safeRecipe;
  }

  async findOne(id: string): Promise<Recipe | undefined> {
    return this.databaseService.recipe.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        description: true,
        slug: true,
        servings: true,
        difficulty: true,
        cost: true,
        category: true,
        tags: true,
        ingredients: true,
        ustensils: true,
        steps: true,
        pictures: true,
        duration: true,
        comments: {
          include: {
            comment: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    updateRecipeDto: UpdateRecipeDto,
    pictures: Express.Multer.File[],
  ): Promise<Recipe> {
    const existingRecipe = await this.databaseService.recipe.findUnique({
      where: { id },
    });

    if (!existingRecipe) {
      throw new NotFoundException(`La recette avec l'ID ${id} n'existe pas.`);
    }

    const slug = updateRecipeDto.title
      ? slugify(updateRecipeDto.title)
      : undefined;

    const existingSlug = await this.databaseService.recipe.findUnique({
      where: { slug },
    });

    if (existingSlug && existingSlug.id !== id) {
      throw new NotFoundException(
        `La recette avec le slug ${slug} existe deja.`,
      );
    }
    console.log(pictures);

    const data: Prisma.RecipeUpdateInput = {
      // Mise à jour des champs simples
      ...(updateRecipeDto.title && { title: updateRecipeDto.title }),
      ...(slug && { slug }),
      ...(updateRecipeDto.description && {
        description: updateRecipeDto.description,
      }),
      ...(updateRecipeDto.difficulty && {
        difficulty: updateRecipeDto.difficulty,
      }),
      ...(updateRecipeDto.cost && { cost: updateRecipeDto.cost }),
      ...(updateRecipeDto.servings && { servings: updateRecipeDto.servings }),

      // Mise à jour des relations
      ...(updateRecipeDto.categories && {
        category: {
          deleteMany: {}, // Supprime les relations existantes
          create: updateRecipeDto.categories.map((categoryDto) => ({
            category: {
              connect: { id: categoryDto.id },
            },
          })),
        },
      }),
      ...(updateRecipeDto.tags && {
        tags: {
          deleteMany: {}, // Supprime les relations existantes
          create: updateRecipeDto.tags.map((tagDto) => ({
            tag: {
              connect: { id: tagDto.id },
            },
          })),
        },
      }),
      ...(updateRecipeDto.ustensils && {
        ustensils: {
          deleteMany: {}, // Supprime les relations existantes
          create: updateRecipeDto.ustensils.map((ustensilDto) => ({
            ustensil: {
              connect: { id: ustensilDto.id },
            },
          })),
        },
      }),

      // Gestion des ingrédients avec suppression et création
      ...(updateRecipeDto.ingredients && {
        ingredients: {
          deleteMany: {}, // Supprime les relations existantes
          create: updateRecipeDto.ingredients.map((ingredientDto) => ({
            quantity: ingredientDto.quantity,
            unit: ingredientDto.unit,
            ingredient: {
              connectOrCreate: {
                where: { name: ingredientDto.name },
                create: { name: ingredientDto.name },
              },
            },
          })),
        },
      }),

      // Gestion des steps
      ...(updateRecipeDto.steps && {
        steps: {
          deleteMany: {}, // Supprime les steps existants
          create: updateRecipeDto.steps.map((stepDto) => ({
            step: {
              create: {
                order: stepDto.order,
                description: stepDto.description,
              },
            },
          })),
        },
      }),

      // Gestion des pictures
      // ...(updateRecipeDto.pictures && {
      //   pictures: {
      //     deleteMany: {}, // Supprime les pictures existantes
      //     create: updateRecipeDto.pictures.map((pictureDto) => ({
      //       picture: {
      //         create: {
      //           url: pictureDto.url,
      //           description: pictureDto.description,
      //           name: pictureDto.name,
      //         },
      //       },
      //     })),
      //   },
      // }),

      // Gestion de la durée
      ...(updateRecipeDto.duration && {
        duration: {
          deleteMany: {}, // Supprime la durée existante
          create: {
            duration: {
              create: {
                preparation: updateRecipeDto.duration.preparation,
                cooking: updateRecipeDto.duration.cooking,
                rest: updateRecipeDto.duration.rest,
              },
            },
          },
        },
      }),
    };

    return this.databaseService.recipe.update({
      where: { id },
      data,
      include: {
        user: true,
        duration: {
          include: { duration: true },
        },
        category: {
          include: { category: true },
        },
        tags: {
          include: { tag: true },
        },
        ingredients: {
          include: { ingredient: true },
        },
        ustensils: {
          include: { ustensil: true },
        },
        steps: {
          include: { step: true },
        },
        pictures: {
          include: { picture: true },
        },
        comments: true,
      },
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
