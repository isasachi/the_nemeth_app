import prisma from "@/app/db/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const url = new URL(request.nextUrl)
    const email = url.searchParams.get("email");

    const teacher_id = prisma.users.findUnique({
        where: {
            email: email,
          },
          select: {
            teachers: {
              select: {
                teacher_id: true,
              },
            },
          },
    })

    return NextResponse.json(teacher_id)
}