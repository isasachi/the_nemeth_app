-- CreateEnum
CREATE TYPE "attendance_enum" AS ENUM ('present', 'absent', 'justified absent', 'tardy');

-- CreateEnum
CREATE TYPE "gender_enum" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('coordinator', 'board', 'teacher', 'student');

-- CreateTable
CREATE TABLE "attendance" (
    "attendance_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "value" "attendance_enum" NOT NULL,
    "student_id" UUID NOT NULL,
    "classroom_id" UUID NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "classrooms" (
    "classroom_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "days" TEXT[],
    "time" TEXT NOT NULL,
    "schedule" DATE[],
    "teacher_id" UUID NOT NULL,

    CONSTRAINT "classrooms_pkey" PRIMARY KEY ("classroom_id")
);

-- CreateTable
CREATE TABLE "grading" (
    "grading_id" UUID NOT NULL,
    "period" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "listening" INTEGER,
    "reading" INTEGER,
    "writing" INTEGER,
    "speaking" INTEGER,
    "grammar_vocab" INTEGER,
    "project" INTEGER,
    "conversation" INTEGER,
    "teacher_comment" TEXT NOT NULL,
    "student_id" UUID NOT NULL,
    "classroom_id" UUID NOT NULL,

    CONSTRAINT "grading_pkey" PRIMARY KEY ("grading_id")
);

-- CreateTable
CREATE TABLE "students" (
    "student_id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birth_date" DATE NOT NULL,
    "country" TEXT NOT NULL,
    "gender" "gender_enum" NOT NULL,
    "address" TEXT NOT NULL,
    "parent_name" TEXT NOT NULL,
    "parent_phone" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "classroom_id" UUID,

    CONSTRAINT "students_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "teacher_id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birth_date" DATE NOT NULL,
    "country" TEXT NOT NULL,
    "gender" "gender_enum" NOT NULL,
    "address" TEXT NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "user_role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fk_student_user" ON "students"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "fk_teacher_user" ON "teachers"("user_id");

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "fk_attendance_classroom" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("classroom_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "fk_attendance_student" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "classrooms" ADD CONSTRAINT "fk_classroom_teacher" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("teacher_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "grading" ADD CONSTRAINT "fk-grading_classroom" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("classroom_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "grading" ADD CONSTRAINT "fk_grading_student" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "fk_student_classroom" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("classroom_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
