import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";
import { prismaInstance } from "@/lib/prisma";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const Base_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_DEVELOPMENT_URL!;
export async function POST() {
  const { userId } = await auth();
  console.log("Creating order for user:", userId);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const res = await fetch(`${Base_URL}/api/get-amount`, { method: "GET" });
  if(!res.ok) {
    console.error("Failed to fetch amount:", res.statusText);
    return NextResponse.json({ error: "Failed to fetch amount" }, { status: 500 });
  }

  const { amount } = await res.json();

  const razorpayOrder = await razorpay.orders.create({
    amount: amount*100,// Razorpay expects amount in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });



  await prismaInstance.order.create({
    data: {
      userId,
      razorpayOrderId: razorpayOrder.id,
      totalAmount: amount,
    },
  });

  return NextResponse.json({
    orderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
  });
}