/*
  Warnings:

  - Changed the type of `key` on the `SongVersion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SongVersionEnum" AS ENUM ('playback', 'lr', 'multitrack');

-- AlterTable
ALTER TABLE "SongVersion" DROP COLUMN "key",
ADD COLUMN     "key" "SongVersionEnum" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SongVersion_key_key" ON "SongVersion"("key");
