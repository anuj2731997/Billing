import Link from "next/link";

export default function FailedUI() {
  return (
    <>
      <div className="text-red-500 text-4xl mb-4">✕</div>
      <h2 className="text-xl font-semibold">Payment Failed</h2>
      <p className="text-sm text-gray-500 mt-2">
        Something went wrong. Please try again.
      </p>
    
      <Link
      href={"/"}
      className="inline-block mt-6 bg-black text-white px-4 py-2 rounded-md"
      ></Link>
    </>
  );
}