-- AlterTable
ALTER TABLE "IngredientsRecipes" ADD COLUMN     "quantity" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "unit" VARCHAR(10) NOT NULL DEFAULT 'g';
