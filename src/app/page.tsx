import { auth } from "@clerk/nextjs/server";
import { prismaInstance as prisma } from "@/lib/prisma";
import DashboardClient from "@/components/dashboarc-client";

export default async function DashboardPage() {
  const { userId} = await  auth();

 if (!userId) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-lg text-center space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          Access Restricted
        </h1>

        <p className="text-gray-600 leading-relaxed">
          You need to be logged in to access the dashboard.
          Please sign in using the navigation bar to continue.
        </p>
      </div>
    </div>
  );
}
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: { payments: true },
      },
    },
  });

  const latestOrder = user?.orders[0] || null;
  const isPremium = latestOrder?.status === "PAID";

  return (
    <DashboardClient
      user={user}
      latestOrder={latestOrder}
      isPremium={isPremium}
    />
  );
}