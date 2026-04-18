import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category, message } = body;

    const request = await prisma.anonymousSupport.create({
      data: {
        category,
        concern: message, // mapping 'message' to 'concern' in our schema
      },
    });

    return NextResponse.json({
      success: true,
      message: "Anonymous request submitted successfully.",
      request,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong." },
      { status: 500 }
    );
  }
}