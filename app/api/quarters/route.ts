import prisma from "@/app/db/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const quarters = await prisma.quarters.findMany();
    console.log(quarters);

    return NextResponse.json(quarters)
}