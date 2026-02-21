"use client"
import PremiumCard from "@/components/premiumCard";

import { useUser } from "@clerk/nextjs";

export default function Home() {

  const {isLoaded,isSignedIn,user} = useUser();

  const isPremium = user?.publicMetadata?.premium === true;
 


 if (!isLoaded) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        <p className="text-sm text-gray-500">Loading your profile...</p>
      </div>
    </div>
  );
}

if (!isSignedIn) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center space-y-3">
        <h1 className="text-xl font-semibold text-gray-900">
          Authentication Required
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          You must be signed in to access your profile.
          Please use the navigation bar to continue.
        </p>
      </div>
    </div>
  );
}
 return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <PremiumCard
        premium={isPremium}
        name={user.fullName}
        email={user.primaryEmailAddress?.emailAddress}
        image={user.imageUrl}
      />
    </div>
  );
}


