import schema from "@/app/products/schema";
import { NextRequest, NextResponse } from "next/server";

export function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (parseInt(params.id) > 10)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  return NextResponse.json({ id: 1, name: "Product 1", price: 10 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  return NextResponse.json(
    { id: parseInt(params.id), name: body.name, price: body.price },
    { status: 200 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (parseInt(params.id) > 10)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  return NextResponse.json(
    { message: "Product deleted successfully" },
    { status: 200 }
  );
}
