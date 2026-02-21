import crypto from "crypto";
import { headers } from "next/headers";
import { prismaInstance as prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import { clerkClient } from "@clerk/nextjs/server";


export async function POST(req: Request) {


  const client = await clerkClient();
  const rawBody = await req.text();
  const headersList = await headers();
  const signature = headersList.get("x-razorpay-signature");
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");

  if (expected !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;

    const existing = await prisma.payment.findUnique({
      where: { razorpayPaymentId: payment.id },
    });

    if (existing) return NextResponse.json({ received: true });

    const order = await prisma.order.findUnique({
      where: { razorpayOrderId: payment.order_id },
    });

    if (!order) return NextResponse.json({ error: "Order not found" });

    await prisma.payment.create({
      data: {
        orderId: order.id,
        razorpayPaymentId: payment.id,
        razorpaySignature: signature!,
        amount: payment.amount / 100,
        method: payment.method,
        status: "CAPTURED",
      },
    });



    await prisma.order.update({
      where: { id: order.id },
      data: { status: "PAID" },
    });



     client.users.updateUser(order.userId, {
    publicMetadata: {
      premium: true,
    },


  });

  }

  if(event.event === "payment.failed") {
    const payment = event.payload.payment.entity;
    const order = await prisma.order.findUnique({
      where: { razorpayOrderId: payment.order_id },
    });

    if (!order) return NextResponse.json({ error: "Order not found" });

    await prisma.order.update({
      where: { id: order.id },
      data: { status: "FAILED" },
    });
  }

  

  return NextResponse.json({ received: true });
}

