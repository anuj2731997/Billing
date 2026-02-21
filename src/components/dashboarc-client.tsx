"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  user: any;
  latestOrder: any;
  isPremium: boolean;
}

export default function DashboardClient({
  user,
  latestOrder,
  isPremium,
}: Props) {

const [amount, setAmount] = useState<number | null>(null);
useEffect(()=>{
  async function getAmount() {
    try {
      const res = await fetch("/api/get-amount", {
        method: "GET",
      });
      if (!res.ok) {
        console.error("Failed to fetch amount:", res.statusText);
        return;
      }
      const data = await res.json();
      setAmount(data.amount);
    } catch (err) {
      console.error("Failed to fetch amount:", err);
    }
  }
  getAmount();

},[])


  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome back, {user?.email}
            </p>
          </div>

          <div>
            <span
              className={`px-4 py-2 text-sm font-medium rounded-full ${
                isPremium
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {isPremium ? "👑 Premium Active" : "Free Plan"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Profile Information</h2>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium break-all">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Latest Order */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Latest Transaction</h2>

          {latestOrder ? (
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Order ID</p>
                <p className="break-all text-xs">
                  {latestOrder.razorpayOrderId}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Amount</p>
                <p className="font-semibold">₹{latestOrder.totalAmount}</p>
              </div>

              <div>
                <p className="text-gray-500">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    latestOrder.status === "PAID"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {latestOrder.status}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No transactions found.
            </p>
          )}
        </div>

        {/* Premium Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">
            {isPremium ? "Premium Benefits" : "Upgrade to Premium"}
          </h2>

          {isPremium ? (
            <div className="space-y-3 text-sm">
              <div className="p-4 rounded-lg bg-gray-50 border">
                <ul className="space-y-2">
                  <li>✔ Unlimited Access</li>
                  <li>✔ Priority Support</li>
                  <li>✔ Advanced Analytics</li>
                  <li>✔ Future Feature Updates</li>
                </ul>
              </div>

              <p className="text-green-600 font-medium text-sm">
                Your premium access is active.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Unlock advanced analytics, premium-only tools,
                and priority support.
              </p>

              <Link
                href="/upgrade"
                className="inline-block w-full text-center bg-black text-white px-4 py-2 rounded-md text-sm hover:opacity-90 transition"
              >
                Upgrade Now
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Optional Premium Highlight Banner */}
      {!isPremium && (
        <div className="max-w-6xl mx-auto px-6 pb-10">
          <div className="bg-black text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold">
                Go Premium Today
              </h3>
              <p className="text-sm text-gray-300 mt-2">
                One-time payment. Lifetime access.
              </p>
            </div>

            <Link
              href="/upgrade"
              className="bg-white text-black px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
            >
              Upgrade for {amount ? `₹${amount}` : "Premium Access"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}