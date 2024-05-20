import prisma from "@/app/db/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const students = await prisma.students.findMany({
    select: {
      student_id: true,
      first_name: true,
      last_name: true
    }
  });

  console.log(students);

  return NextResponse.json(students)
}