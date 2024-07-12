/*
  Warnings:

  - Added the required column `quarter_id` to the `classrooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classrooms" ADD COLUMN     "quarter_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "quarters" (
    "quarter_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "break" TIMESTAMP(3)[],

    CONSTRAINT "quarters_pkey" PRIMARY KEY ("quarter_id")
);

-- AddForeignKey
ALTER TABLE "classrooms" ADD CONSTRAINT "classrooms_quarter_id_fkey" FOREIGN KEY ("quarter_id") REFERENCES "quarters"("quarter_id") ON DELETE RESTRICT ON UPDATE CASCADE;
