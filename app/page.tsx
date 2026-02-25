"use client";

import Link from "next/link";
import Image from "next/image";
import dashboardPreview from "../src/images/dashborad-preview.png"

export default function HomePage() {
  return (
    <main className="bg-gray-50">
      <section className="min-h-screen flex items-center px-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Manage Tickets.<br /> Track Activity.<br /> Stay Organized.
            </h1>

            <p className="text-lg text-indigo-100 mb-8">
              A simple yet powerful ticket management system to create, assign,
              track, and resolve issues efficiently — all in one dashboard.
            </p>

            <div className="flex gap-4">
              <Link
                href="/login"
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="relative">
            <Image
              src={dashboardPreview}
              alt="Dashboard Preview"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center text-black">
          <h2 className="text-4xl font-bold mb-12">
            Why Use Our System?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Activity Tracking",
                desc: "Every change is logged with timestamps and user details.",
              },
              {
                title: "Smart Assignments",
                desc: "Assign tickets easily and track ownership in real-time.",
              },
              {
                title: "Persistent Storage",
                desc: "Your tickets stay safe using local storage & API sync.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to get started?
        </h2>
        <p className="mb-6 text-indigo-100">
          Login and start managing tickets today.
        </p>
        <Link
          href="/login"
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Go to Login
        </Link>
      </section>
    </main>
  );
}