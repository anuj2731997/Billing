import crypto from "crypto";
import { headers } from "next/headers";
import { prismaInstance as prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const headersList = await headers();
    const signature = headersList.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody);

  
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      await prisma.$transaction(async (tx) => {
        const existingPayment = await tx.payment.findUnique({
          where: { razorpayPaymentId: payment.id },
        });

        if (existingPayment) return;

        const order = await tx.order.findUnique({
          where: { razorpayOrderId: payment.order_id },
        });

        if (!order) return;

        await tx.payment.create({
          data: {
            orderId: order.id,
            razorpayPaymentId: payment.id,
            razorpaySignature: signature,
            amount: payment.amount / 100,
            method: payment.method,
            status: "CAPTURED",
          },
        });

        await tx.order.update({
          where: { id: order.id },
          data: { status: "PAID" },
        });

        const client = await clerkClient();

        await client.users.updateUser(order.userId, {
          publicMetadata: {
            premium: true,
          },
        });
      });
    }

    
    if (event.event === "payment.failed") {
      const payment = event.payload.payment.entity;

      await prisma.order.updateMany({
        where: { razorpayOrderId: payment.order_id },
        data: { status: "FAILED" },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

