import Link from "next/link";

export default function AboutPage() {
  
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            About This Project
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            A full-stack premium access system built as a real-world SaaS architecture
            demonstration using secure authentication and payment integration.
          </p>
        </div>
      </section>

      {/* About Me */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold">
            About the Developer
          </h2>
          <p className="mt-6 text-gray-600 leading-relaxed">
            I am a 3rd-year Computer Science Engineering student focused on
            building production-ready full-stack applications. This project
            demonstrates secure authentication, payment verification,
            webhook handling, and premium access control.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            The goal was to simulate a real SaaS product architecture
            using modern development practices and secure backend workflows.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h3 className="text-xl font-semibold mb-4">
            Technical Focus Areas
          </h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li>✔ Secure authentication using Clerk</li>
            <li>✔ Razorpay payment integration (UPI + Cards)</li>
            <li>✔ Server-side order creation</li>
            <li>✔ Webhook signature verification</li>
            <li>✔ Premium access control via metadata</li>
            <li>✔ Clean App Router architecture (Next.js)</li>
          </ul>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center">
            System Architecture
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8">

            <div className="p-6 border rounded-2xl bg-gray-50">
              <h3 className="font-semibold text-lg">
                Authentication Layer
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                Clerk manages user sessions, OAuth login, and secure identity handling.
              </p>
            </div>

            <div className="p-6 border rounded-2xl bg-gray-50">
              <h3 className="font-semibold text-lg">
                Payment Processing
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                Razorpay handles order creation and payment processing with
                server-side verification and webhook security.
              </p>
            </div>

            <div className="p-6 border rounded-2xl bg-gray-50">
              <h3 className="font-semibold text-lg">
                Access Control Logic
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                Premium status is managed using Clerk public metadata and
                validated backend logic.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Learning Outcome */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">
          What I Learned
        </h2>
        <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Through this project, I gained practical experience in payment
          gateway integration, webhook security validation, server-client
          separation in Next.js App Router, and implementing real-world
          SaaS-style premium access models.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold">
            Explore the Platform
          </h2>
          <p className="mt-4 text-gray-300">
            Experience a secure authentication and payment-driven architecture.
          </p>

          <Link
            href="/upgrade"
            className="inline-block mt-8 bg-white text-black px-6 py-3 rounded-md font-medium hover:opacity-90 transition"
          >
            View Premium System
          </Link>
        </div>
      </section>

    </div>
  );
}