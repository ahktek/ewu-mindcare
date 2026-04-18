import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { concern, category } = await req.json();

    const request = await prisma.anonymousSupport.create({
      data: {
        concern,
        category,
      },
    });

    return NextResponse.json({ success: true, request });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
