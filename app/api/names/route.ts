import prisma from "@/app/db/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const url = new URL(request.nextUrl)
  const teacher_id = url.searchParams.get("teacher_id");

  const names = await prisma.classrooms.findMany({
    select: {
      name: true
    },
    where: {
      teacher_id: teacher_id?.toString()
    }
  });

  const namesArray = names.map(item => item.name)

  return NextResponse.json(namesArray)
}
