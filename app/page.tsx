import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8FBFF] text-[#1F2937]">
      <Navbar />

      <section className="grid md:grid-cols-2 gap-10 items-center px-6 md:px-12 py-16 md:py-24">
        <div>
          <p className="inline-block px-4 py-2 rounded-full bg-[#DCEEFF] text-sm font-medium text-[#1F2937]">
            Support for EWU Students and Faculty
          </p>

          <h2 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
            Your Mental Wellness
            <span className="block text-[#C8102E]">Matters Every Day</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            A digital mental health counseling web portal for East West
            University students and faculty to get support, book appointments,
            and access wellness resources in a safe and modern environment.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book"
              className="px-6 py-3 rounded-2xl bg-[#C8102E] text-white font-semibold shadow hover:opacity-90"
            >
              Book Appointment
            </Link>

            <Link
              href="/resources"
              className="px-6 py-3 rounded-2xl bg-[#DCEEFF] text-[#1F2937] font-semibold hover:opacity-90"
            >
              Explore Resources
            </Link>

            <Link
              href="/support"
              className="px-6 py-3 rounded-2xl bg-[#E7F8EF] text-[#1F2937] font-semibold hover:opacity-90"
            >
              Anonymous Support
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            This system provides supportive guidance and booking support. It is
            not a substitute for emergency or clinical care.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#DCEEFF] via-white to-[#E7F8EF] rounded-[32px] shadow-xl p-8 md:p-12">
          <div className="bg-white rounded-[28px] p-8 shadow-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-full bg-[#C8102E] text-white flex items-center justify-center text-2xl">
                ❤
              </div>
              <div>
                <h3 className="text-2xl font-bold">Safe. Supportive. Smart.</h3>
                <p className="text-gray-500">
                  Digital counseling and mental wellness support
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-[#F8FBFF] p-4 border">
                <h4 className="font-semibold text-[#C8102E]">
                  Appointment Booking
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Students and faculty can request counseling appointments
                  easily.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F8FBFF] p-4 border">
                <h4 className="font-semibold text-[#C8102E]">
                  Anonymous Support
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Users can share concerns privately for early assistance.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F8FBFF] p-4 border">
                <h4 className="font-semibold text-[#C8102E]">AI Chat Support</h4>
                <p className="text-sm text-gray-600 mt-1">
                  A supportive assistant offers initial guidance and resources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h3 className="text-xl font-bold text-[#C8102E] mb-3">
              Book a Counselor
            </h3>
            <p className="text-gray-600">
              Request a counseling session through a simple online appointment
              system.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h3 className="text-xl font-bold text-[#C8102E] mb-3">
              Mental Health Resources
            </h3>
            <p className="text-gray-600">
              Access articles, stress management tips, and wellness guidance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h3 className="text-xl font-bold text-[#C8102E] mb-3">
              Faculty & Student Support
            </h3>
            <p className="text-gray-600">
              A dedicated university-focused support environment for the EWU
              community.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}