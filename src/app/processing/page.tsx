"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProcessingUI from "@/components/processingUi";
import FailedUI from "@/components/failedUi";

export default function ProcessingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order");

  const [status, setStatus] = useState("PROCESSING");

  useEffect(() => {
    if (!orderId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`/api/order-status?order=${orderId}`,{
        method:"GET",
      });

      if(res.status === 401) {
        clearInterval(interval);
        router.push("/sign-in");
        return;
      }
      
      
        if(res.status !== 200) {
          clearInterval(interval);
          setStatus("FAILED");
          return;
        }
      
      const data = await res.json();
      console.log("Order data:", data);

      if (data.status === "PAID") {
        clearInterval(interval);
        router.push("/");
      }

      if (data.status === "FAILED") {
        clearInterval(interval);
        setStatus("FAILED");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [orderId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-sm border w-full max-w-md text-center">
        {status === "PROCESSING" && <ProcessingUI />}
        {status === "FAILED" && <FailedUI />}
      </div>
    </div>
  );
}