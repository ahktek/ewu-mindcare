import Link from "next/link";
import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  // In a real app, we would get the current user session and email
  // const user = await getSession();
  // const appointments = await prisma.appointment.findMany({ where: { email: user.email } });
  
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
    take: 5
  });

  const stats = [
    { name: "Appointments", value: appointments.length, icon: "📅" },
    { name: "Resources Read", value: 12, icon: "📚" },
    { name: "Support Tokens", value: 2, icon: "🔑" },
  ];

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-[#1F2937]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black tracking-tight">
                Welcome Back, <span className="text-[#C8102E]">Student</span>
              </h1>
              <p className="text-gray-500 mt-2 text-lg">
                Your mental wellness is our priority. Here's your current progress.
              </p>
            </div>
            <Link 
              href="/book"
              className="px-8 py-4 bg-[#C8102E] text-white rounded-2xl font-bold shadow-xl shadow-red-100 hover:shadow-red-200 hover:-translate-y-1 transition-all text-center"
            >
              + New Appointment
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{stat.icon}</div>
              <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">{stat.name}</p>
              <p className="text-4xl font-black mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content: Appointments */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Appointments</h2>
                <Link href="/book" className="text-[#C8102E] font-bold text-sm hover:underline">View History</Link>
              </div>
              
              <div className="p-4">
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-6 rounded-[24px] bg-[#F8FBFF] border border-blue-50/50">
                        <div className="flex items-center gap-5">
                          <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex flex-col items-center justify-center border border-gray-100">
                            <span className="text-[#C8102E] font-black text-lg">
                              {new Date(app.appointmentDate).getDate()}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">
                              {new Date(app.appointmentDate).toLocaleString('default', { month: 'short' })}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-lg text-[#1F2937]">Counseling Session</p>
                            <p className="text-gray-500 text-sm font-medium">{app.appointmentTime} • Regular Checkup</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                            app.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 
                            app.status === 'approved' ? 'bg-green-50 text-green-600' : 
                            'bg-gray-100 text-gray-500'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-gray-400 italic">
                    No active appointments. Use the button above to book one.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar: Quick Actions & Tips */}
          <div className="space-y-6">
            <section className="bg-gradient-to-br from-[#C8102E] to-[#8E0B20] p-8 rounded-[32px] text-white shadow-xl shadow-red-100">
              <h3 className="text-xl font-bold mb-3">Anonymous Support</h3>
              <p className="text-red-100 text-sm leading-relaxed mb-6">
                Need to share something privately? Our anonymous support system is here 24/7.
              </p>
              <Link href="/support" className="block w-full text-center py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all border border-white/20">
                Submit Concern
              </Link>
            </section>

            <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Wellness Tip</h3>
              <div className="p-4 rounded-2xl bg-green-50 border border-green-100 text-green-800 text-sm italic">
                "Taking a 5-minute break every hour can significantly reduce academic burnout. Remember to breathe."
              </div>
              <button className="mt-6 text-sm font-bold text-gray-400 hover:text-[#C8102E] transition-colors flex items-center gap-2">
                Show another tip →
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}