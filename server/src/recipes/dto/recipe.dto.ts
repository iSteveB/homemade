import { PartialType } from '@nestjs/mapped-types';
import { Type, Transform } from 'class-transformer';
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
  @Transform(({ value }) => Number(value))
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
  @Transform(({ value }) => Number(value))
  order: number;
}

export class PictureDto {
  @IsString()
  pictureId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  fileKey?: string;
}

export class DurationDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  preparation: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  cooking: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
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
  @Transform(({ value }) => Number(value))
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
  @ValidateNested()
  @Type(() => DurationDto)
  duration?: DurationDto;
}

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}
export class SafeRecipeDto extends PartialType(CreateRecipeDto) {}
