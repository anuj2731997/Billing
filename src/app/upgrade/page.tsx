import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PaymentButton from "@/components/paymentButton";
import Link from "next/link";

import {MoveLeft} from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_DEVELOPMENT_URL || process.env.NEXT_PUBLIC_BASE_URL!;

async function fetchAmount() {
  const res = await fetch(`${baseUrl}/api/get-amount`, { method: "GET" });
  const data = await res.json();
  return data.amount;
}

export default async function UpgradePage() {
  const { userId } = await auth();
    const amount = await fetchAmount();

  if (!userId) {
    redirect("/sign-in");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const isPremium = user.publicMetadata?.premium === true;

  return (
    <div className="min-h-screen bg-gray-50">

     
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link href="/" className="text-sm text-gray-500 hover:text-black">
         <MoveLeft className="inline-block mr-2"/> Back to Dashboard
        </Link>
      </div>

      
      <div className="max-w-4xl mx-auto px-6 pb-20">

        <div className="bg-white rounded-2xl border shadow-sm p-12 text-center">

          <h1 className="text-4xl font-bold tracking-tight">
            Upgrade to Premium
          </h1>

          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Unlock advanced dashboard access, premium analytics,
            and priority support with our lifetime premium plan.
          </p>

     
          <div className="mt-10">
            <span className="text-6xl font-bold">₹{amount}</span>
            <span className="text-gray-500 ml-2">/ lifetime</span>
          </div>

          
          <div className="mt-10 text-left max-w-md mx-auto">
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>✔ Unlimited premium access</li>
              <li>✔ Secure Razorpay checkout</li>
              <li>✔ Webhook verified payments</li>
              <li>✔ Premium-only dashboard sections</li>
              <li>✔ Future feature updates included</li>
            </ul>
          </div>

    
          <div className="mt-12">

            {isPremium ? (
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                  👑 You already have Premium Access
                </div>

                <div>
                  <Link
                    href="/"
                    className="inline-block mt-4 px-6 py-3 bg-black text-white rounded-md hover:opacity-90 transition"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <PaymentButton />
            )}

          </div>

        </div>
      </div>
    </div>
  );
}