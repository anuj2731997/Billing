"use client";

import { useEffect, useState } from "react";

export default function PayButton() {
  const [amount, setAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch amount properly
  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const res = await fetch("/api/get-amount");
        const data = await res.json();
        setAmount(data.amount);
      } catch (err) {
        console.error("Failed to fetch amount:", err);
      }
    };

    fetchAmount();
  }, []);

  const handlePay = async () => {
    if (!amount || loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/razorpay", {
        method: "POST",
      });

      if (!res.ok) throw new Error("Order creation failed");

      const { orderId, amount: orderAmount } = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: orderId,
        amount: orderAmount,
        currency: "INR",

        handler: function () {
          window.location.href = "/processing?order=" + orderId;
        },

        theme: {
          color: "#000000",
        },
      };

      if (!(window as any).Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={!amount || loading}
      className={`px-4 py-2 rounded text-white transition duration-300
        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:opacity-90"} hover:cursor-pointer
      `}
    >
      {loading
        ? "Processing..."
        : amount
        ? `Pay ₹${amount}`
        : "Loading..."}
    </button>
  );
}