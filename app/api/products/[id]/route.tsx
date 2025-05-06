import schema from "@/app/products/schema";
import { NextRequest, NextResponse } from "next/server";

export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // fetch products from a db (future)
  // if not found, return 404
  // else return data
  if (params.id > 10)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  return NextResponse.json({ id: 1, name: "Product 1", price: 10 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  return NextResponse.json(
    { id: 10, name: body.name, price: body.price },
    { status: 200 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // fetch the product with the given id from the db
  // if not found, return 404 (product not found)
  if (params.id > 10)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  // else delete the product and return a 200 status code
  // in a real world app, you would return the deleted product
  // or a message saying the product was deleted successfully
  return NextResponse.json(
    { message: "Product deleted successfully" },
    { status: 200 }
  );
}
