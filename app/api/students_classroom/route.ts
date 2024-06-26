import prisma from "@/app/db/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const url = new URL(request.nextUrl)
  const classroom_id = url.searchParams.get("classroom_id");

  const students = await prisma.classroomStudents.findMany({
    where: {
      classroom_id: classroom_id?.toString()
    },
    include: {
      student: {
        select: {
          student_id: true,
          first_name: true,
          last_name: true
        }
      }
    }   
  });

  console.log(students);

  return NextResponse.json(students)
}