/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(30)`.
  - A unique constraint covering the columns `[avatarFileKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
ADD COLUMN     "avatarFileKey" TEXT,
ALTER COLUMN "username" SET DATA TYPE VARCHAR(30);

-- CreateIndex
CREATE UNIQUE INDEX "User_avatarFileKey_key" ON "User"("avatarFileKey");
