/*
  Warnings:

  - You are about to drop the `_classroomsTostudents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_classroomsTostudents" DROP CONSTRAINT "_classroomsTostudents_A_fkey";

-- DropForeignKey
ALTER TABLE "_classroomsTostudents" DROP CONSTRAINT "_classroomsTostudents_B_fkey";

-- DropTable
DROP TABLE "_classroomsTostudents";
