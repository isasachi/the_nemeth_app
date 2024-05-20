import prisma from "@/app/db/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const url = new URL(request.nextUrl)
  const student_id = url.searchParams.get("student_id");

  const attendance = await prisma.attendance.findMany({
    where: {
      student_id: student_id?.toString()
    },
  });

  console.log(attendance)

  return NextResponse.json(attendance)
}
