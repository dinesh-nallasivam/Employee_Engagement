/*
  Warnings:

  - Changed the type of `response` on the `FeedbackResponse` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FeedbackResponse" DROP COLUMN "response",
ADD COLUMN     "response" INTEGER NOT NULL;
