/*
  Warnings:

  - Added the required column `completedChapters` to the `CourseProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseProgress" ADD COLUMN     "completedChapters" INTEGER NOT NULL;
