import { auth } from "@clerk/nextjs/server";
import { prismaInstance as prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } =  await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const orderId = new URL(req.url).searchParams.get("order");

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing order id" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        razorpayOrderId: orderId, 
      },
      select: {
        status: true,
        userId: true,
      },
    });

    if (!order || order.userId !== userId) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: order.status });

  } catch (error) {
    console.error("Order status fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}