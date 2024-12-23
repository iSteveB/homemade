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
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { Recipe } from '@prisma/client';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto, UpdateRecipeDto } from './dto/recipe.dto';

import { PoliciesGuard } from 'src/common/guards/policies.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/jwt.strategy';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('pictures', 5, {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
      fileFilter: (req, file, callback) => {
        if (
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/webp' ||
          file.mimetype === 'image/gif'
        ) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('Seules les images sont acceptées'),
            false,
          );
        }
      },
    }),
  )
  async create(
    @Body('data') dataString: string,
    @Request() request: RequestWithUser,
    @UploadedFiles() pictures?: Express.Multer.File[],
  ): Promise<Recipe> {
    try {
      const createRecipeDto: CreateRecipeDto = JSON.parse(dataString);

      // Validate the parsed data
      if (!createRecipeDto.title) {
        throw new BadRequestException('Le titre est requis');
      }

      return await this.recipesService.create(
        createRecipeDto,
        request.user.id,
        pictures,
      );
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new BadRequestException('Invalid JSON format in data field');
      }
      console.error('Error creating recipe:', error);
      if (error?.response?.message) {
        throw new BadRequestException(error.response.message);
      }
      throw new BadRequestException(
        'Failed to create recipe: ' + error.message,
      );
    }
  }

  @Get()
  findAllRecipes() {
    return this.recipesService.findAllRecipes();
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUserRecipes(@Request() request: RequestWithUser) {
    const userId = request.user.id;
    return this.recipesService.findAllByUser(userId);
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
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('pictures', 5, {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        if (
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/webp' ||
          file.mimetype === 'image/gif'
        ) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('Seules les images sont acceptées'),
            false,
          );
        }
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @UploadedFiles() pictures: Express.Multer.File[],
  ) {
    return this.recipesService.update(id, updateRecipeDto, pictures);
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  delete(@Param('id') id: string) {
    return this.recipesService.delete(id);
  }
}
