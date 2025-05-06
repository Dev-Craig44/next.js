import { NextRequest, NextResponse } from "next/server";

// we didn't use request in this example, but if you remove it, Next.js will cache the response. so  next time we hit this endpoint, it will return the cached response
// to prevent caching we need to use this request object
export function GET(request: NextRequest) {
  // fetch users from a db (future)
  return NextResponse.json([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ]);
}
