/*
  Warnings:

  - You are about to drop the column `text` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTimeComplete` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedAt` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalChapter` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuiq` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTimeComplete` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mark` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMarks` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuestion` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTimeComplete` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "totalTimeComplete" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalChapter" INTEGER NOT NULL,
ADD COLUMN     "totalQuiq" INTEGER NOT NULL,
ADD COLUMN     "totalTimeComplete" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "text",
ADD COLUMN     "mark" INTEGER NOT NULL,
ADD COLUMN     "question" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "totalMarks" INTEGER NOT NULL,
ADD COLUMN     "totalQuestion" INTEGER NOT NULL,
ADD COLUMN     "totalTimeComplete" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseProgress" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "progress" DOUBLE PRECISION NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizResult" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "FeedbackQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackResponse" (
    "id" SERIAL NOT NULL,
    "feedbackId" INTEGER NOT NULL,
    "feedbackQuestionId" INTEGER NOT NULL,
    "response" TEXT NOT NULL,

    CONSTRAINT "FeedbackResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- AddForeignKey
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackQuestion" ADD CONSTRAINT "FeedbackQuestion_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackResponse" ADD CONSTRAINT "FeedbackResponse_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackResponse" ADD CONSTRAINT "FeedbackResponse_feedbackQuestionId_fkey" FOREIGN KEY ("feedbackQuestionId") REFERENCES "FeedbackQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
