import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, role, date, time, notes } = body;

    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        role,
        appointmentDate: new Date(date),
        appointmentTime: time,
        notes,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Appointment request submitted successfully.",
      appointment,
    });
  } catch (error: any) {
    console.error("Prisma Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong." },
      { status: 500 }
    );
  }
}