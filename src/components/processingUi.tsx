export default function ProcessingUI() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="h-12 w-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>

      <h2 className="text-xl font-semibold">Processing Payment</h2>
      <p className="text-sm text-gray-500 mt-2">
        Please wait while we confirm your payment.
      </p>
    </>
  );
}