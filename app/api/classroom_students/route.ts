import prisma from "@/app/db/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const url = new URL(request.nextUrl)
  const classroom_id = url.searchParams.get("classroom_id");

  const classroom = await prisma.classrooms.findFirst({
    where: {
      classroom_id: classroom_id?.toString()
    },
    include: {
      classroomStudents: {
        include: {
          student: {
            select: {
              student_id: true,
              first_name: true,
              last_name: true
            }
          }
        }
      }
    }   
  });

  console.log(classroom);

  return NextResponse.json(classroom)
}