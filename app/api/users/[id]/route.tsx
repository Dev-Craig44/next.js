import { NextRequest, NextResponse } from "next/server";

export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // fetch users from a db (future)
  // if not found, return 404
  // else return data
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ id: 1, name: "Craig" });
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
  if (!body.name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  // fetch the user with the given id from the db
  // if not found, return 404 (user not found)
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  // else update the user and return the updated user
  return NextResponse.json({ id: 1, name: body.name }, { status: 200 });
}
