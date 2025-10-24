import schema from "@/app/users/schema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  // 5.) Before creating the user, we should check to see if a user with the same email already exists
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  // 6.) If a user with the same email exists, return an error response
  if (user) {
    return NextResponse.json(
      { error: "User with this email already exists" },
      { status: 400 }
    );
  }

  // 1.) Create a new user using Prisma (future)
  const newUser = await prisma.user.create({
    // we shouldn't use body because a malicious user can supply additional properties in the body of the request, so we don't want to get anything blindly and put it in our database

    // 2.) create the user only with the properties we want
    data: {
      name: body.name,
      email: body.email,
      // other properties were given default values in the schema
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}
