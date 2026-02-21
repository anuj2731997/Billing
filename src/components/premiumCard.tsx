"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type UserPremiumCardProps = {
  premium: boolean;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function UserPremiumCard({
  premium,
  name,
  email,
  image,
}: UserPremiumCardProps) {

  const router = useRouter();


  return (
    <div className="bg-white border rounded-2xl shadow-sm p-8 w-full max-w-md mx-auto">

      <div className="flex items-center gap-4">
        {image ? (
          <Image
            src={image}
            alt="User Avatar"
            width={60}
            height={60}
            className="rounded-full"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold">
            {name?.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold">{name || "User"}</h3>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>

      <div className="my-6 border-t" />

    
      {premium ? (
        <div className="space-y-4">

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Subscription Status
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
              👑 Premium
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border text-sm text-gray-600">
            You already have full premium access including:
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Unlimited dashboard access</li>
              <li>Priority support</li>
              <li>Advanced analytics</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Subscription Status
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
              Free Plan
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border text-sm text-gray-600">
            Upgrade to Premium to unlock advanced features and priority access.
          </div>

          <button className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition hover:cursor-pointer" onClick={()=>
            router.push("/upgrade")
          }>
            Upgrade to Premium
          </button>
        </div>
      )}
    </div>
  );
}