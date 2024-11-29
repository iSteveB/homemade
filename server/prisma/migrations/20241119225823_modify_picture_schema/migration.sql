/*
  Warnings:

  - You are about to drop the column `description` on the `Picture` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Picture` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pictureId]` on the table `Picture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileKey` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pictureId` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "description",
DROP COLUMN "url",
ADD COLUMN     "fileKey" TEXT NOT NULL,
ADD COLUMN     "pictureId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Picture_pictureId_key" ON "Picture"("pictureId");
