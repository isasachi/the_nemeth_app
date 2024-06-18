import prisma from "@/app/db/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const url = new URL(request.nextUrl)
  const classroom_id = url.searchParams.get("classroom_id");

  const gradings = await prisma.grading.findMany({
    where: {
      classroom_id: classroom_id?.toString()
    },
    include: {
      student: {
        select: {
          first_name: true,
          last_name: true
        }
      },
      classroom: {
        select: {
          name: true
        }
      }
    }
  });

  console.log(gradings)

  return NextResponse.json(gradings)
}
