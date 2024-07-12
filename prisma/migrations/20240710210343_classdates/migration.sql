/*
  Warnings:

  - Added the required column `dates_id` to the `classrooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classrooms" ADD COLUMN     "dates_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "classDates" (
    "dates_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "classDates_pkey" PRIMARY KEY ("dates_id")
);

-- AddForeignKey
ALTER TABLE "classrooms" ADD CONSTRAINT "classrooms_dates_id_fkey" FOREIGN KEY ("dates_id") REFERENCES "classDates"("dates_id") ON DELETE RESTRICT ON UPDATE CASCADE;
