import schema from "@/app/users/schema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // 1.) Check to see if the user exists inside the database
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  // 2.) If the user does not exist, return a 404 error
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 3.) If user exists, update their details
  const updateUser = await prisma.user.update({
    where: { id: user.id },
    // 4.) Provide the new data to update
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return NextResponse.json(updateUser, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  prisma.user.delete({
    where: { id: user.id },
  });

  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 }
  );
}
