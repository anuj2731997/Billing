import { headers } from "next/headers";
import { Webhook } from "svix";
import { prismaInstance } from "@/lib/prisma";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const payload = await req.text();
  const headerPayload = await  headers();

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  const event = wh.verify(payload, {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  }) as WebhookEvent;

  if (event.type === "user.created") {
    const { id, email_addresses, first_name } = event.data;

    await prismaInstance.user.upsert({
      where: { id },
      update: {},
      create: {
        id,
        email: email_addresses[0].email_address,
        name: first_name,
      },
    });
  }

  if(event.type === "user.deleted") {
    const { id } = event.data;

    await prismaInstance.user.delete({ where: { id } });
  }
 
  if(event.type === "user.updated") {
    const { id, email_addresses, first_name, } = event.data;

    await prismaInstance.user.update({
      where: { id },
      data: {
        email: email_addresses[0].email_address,
        name: first_name,
      },
    });
  }
  return new Response("OK");
}

