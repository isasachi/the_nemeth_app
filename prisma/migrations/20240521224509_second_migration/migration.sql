/*
  Warnings:

  - Added the required column `time` to the `classrooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classrooms" ADD COLUMN     "time" TEXT NOT NULL;
