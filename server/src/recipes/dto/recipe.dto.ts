import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CategoryDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  name: string;
}

export class TagDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  name: string;
}

export class IngredientDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  unit: string;
}

export class UstensilDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  name: string;
}

export class StepDto {
  @IsString()
  description: string;

  @IsNumber()
  order: number;
}

export class PictureDto {
  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class DurationDto {
  @IsNumber()
  preparation: number;

  @IsNumber()
  cooking: number;

  @IsNumber()
  rest: number;
}
export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsEnum(['EASY', 'MEDIUM', 'HARD'])
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';

  @IsOptional()
  @IsEnum(['CHEAP', 'NORMAL', 'EXPENSIVE'])
  cost?: 'CHEAP' | 'NORMAL' | 'EXPENSIVE';

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories?: CategoryDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  tags?: TagDto[];

  @IsInt()
  @Min(1)
  servings: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients?: IngredientDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UstensilDto)
  ustensils?: UstensilDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => StepDto)
  steps?: StepDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PictureDto)
  pictures?: PictureDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DurationDto)
  duration?: DurationDto;
}

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}
