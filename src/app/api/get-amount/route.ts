import { NextResponse } from "next/server";

export async function GET() {
  const amount = 500;// in Rupees 
  return NextResponse.json({ amount });
}