import Link from "next/link";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

type Appointment = {
  id: number;
  name: string;
  email: string;
  role: string;
  appointment_date: string;
  appointment_time: string;
  notes: string | null;
  status: string;
  created_at: string;
};

export default async function DashboardPage() {
  const { data: appointmentsData, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  const appointments: Appointment[] = appointmentsData ?? [];

  return (
    <main className="min-h-screen bg-[#F8FBFF]">
      <Navbar />

      <div className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-[#C8102E]">
              Welcome to Your Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your support activities, appointments, and wellness journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#C8102E] mb-3">
                Book Appointment
              </h2>
              <p className="text-gray-600 mb-4">
                Request a counseling session with a university counselor.
              </p>
              <Link
                href="/book"
                className="inline-block px-4 py-2 rounded-xl bg-[#C8102E] text-white"
              >
                Go to Booking
              </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#C8102E] mb-3">
                AI Support Chat
              </h2>
              <p className="text-gray-600 mb-4">
                Get supportive guidance and initial emotional support.
              </p>
              <Link
                href="/chat"
                className="inline-block px-4 py-2 rounded-xl bg-[#C8102E] text-white"
              >
                Open Chat
              </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#C8102E] mb-3">
                Wellness Resources
              </h2>
              <p className="text-gray-600 mb-4">
                Explore helpful mental health and stress management content.
              </p>
              <Link
                href="/resources"
                className="inline-block px-4 py-2 rounded-xl bg-[#C8102E] text-white"
              >
                View Resources
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-3xl shadow-md p-6">
              <h3 className="text-xl font-bold text-[#C8102E] mb-3">
                Recent Appointment Requests
              </h3>

              {error ? (
                <p className="text-red-600">
                  Failed to load appointment data.
                </p>
              ) : appointments.length > 0 ? (
                <div className="space-y-3">
                  {appointments.map((item: Appointment) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border bg-[#F8FBFF] p-4"
                    >
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.appointment_date} at {item.appointment_time}
                      </p>
                      <p className="text-sm text-[#C8102E] mt-1">
                        Status: {item.status}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  No appointment requests yet. Please submit a booking request.
                </p>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h3 className="text-xl font-bold text-[#C8102E] mb-3">
                Personal Wellness Note
              </h3>
              <p className="text-gray-600">
                Take one step at a time. Rest, connection, and support are part
                of progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}