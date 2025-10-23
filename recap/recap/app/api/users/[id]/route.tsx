import schema from "@/app/users/schema";
import { NextRequest, NextResponse } from "next/server";
// 4.)  import our prisma client
import { prisma } from "@/prisma/client";
// import our schema

export async function GET(
  request: NextRequest,
  // 8.) Because at run time, what we provided (params: { id: number }) is not valid, we need to change it to string. Because the values in the URL are always strings.
  { params }: { params: { id: string } }
) {
  // 5.) fetch use by using `prisma.user.findUnique` or `prisma.user.findFirst`
  const user = await prisma.user.findUnique({
    where: {
      // 9.) convert the id to a number using parseInt
      id: parseInt(params.id),
    },
  });
  // fetch users from a db (future)
  // if not found, return 404
  // else return data
  // 6.) If the user is not found, return a 404 response, so we would have to change our logic here to check if user is null
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  // 7.) if found, return the user in the response
  return NextResponse.json(user);
}

// you can use put or patch
// you should use put for replacing an object and patch for updating one or more properties
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // validate the request body
  // if invalid, return 400 bad request
  const body = await request.json();
  // instead of using an if statement, we can use safeParse
  // we also have a parse method, the difference is that the parse method will throw an error if the data is invalid
  // but safeParse doesn't yell at us, it just returns an object with a success property
  const validation = schema.safeParse(body);
  if (!validation.success) {
    // here we don't want to hard code the error message
    // we want to return the error message that are detected by zod
    return NextResponse.json(validation.error.errors, { status: 400 });
    // fetch the user with the given id from the db
    // if not found, return 404 (user not found)
    if (params.id > 10)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    // else update the user and return the updated user
    return NextResponse.json({ id: 1, name: body.name }, { status: 200 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // fetch the user with the given id from the db
  // if not found, return 404 (user not found)
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  // else delete the user and return a 200 status code
  // in a real world app, you would return the deleted user
  // or a message saying the user was deleted successfully
  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 }
  );
}
