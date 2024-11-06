-- CreateEnum
CREATE TYPE "GradeNum" AS ENUM ('FRESHMAN', 'SOPHOMORE', 'JUNIOR', 'SENIOR');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "grade" "GradeNum" NOT NULL DEFAULT 'FRESHMAN';
