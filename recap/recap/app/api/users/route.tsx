import schema from "@/app/users/schema";
import { NextRequest, NextResponse } from "next/server";

// we didn't use request in this example, but if you remove it, Next.js will cache the response. so  next time we hit this endpoint, it will return the cached response
// to prevent caching we need to use this request object
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GET(request: NextRequest) {
  // fetch users from a db (future)
  return NextResponse.json([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ]);
}

export async function POST(request: NextRequest) {
  // create a new user
  // const body = await request.json();
  // return NextResponse.json(body);
  const body = await request.json();

  // in a real world app, once we read the body of the request, then we need to validate it.
  // if invalid, return 400 bad request
  // else, return 201 created
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
