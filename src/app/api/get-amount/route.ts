import { NextResponse } from "next/server";

export async function GET() {
  const amount = 500; 
  return NextResponse.json({ amount });
}