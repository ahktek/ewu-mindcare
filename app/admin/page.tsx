import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const stats = [
    { name: "Total Appointments", value: await prisma.appointment.count(), icon: "📅", color: "bg-red-50 text-[#C8102E]", shadow: "shadow-red-50" },
    { name: "Pending Requests", value: await prisma.appointment.count({ where: { status: "pending" } }), icon: "⏳", color: "bg-amber-50 text-amber-600", shadow: "shadow-amber-50" },
    { name: "Support Tickets", value: await prisma.anonymousSupport.count(), icon: "✉️", color: "bg-indigo-50 text-indigo-600", shadow: "shadow-indigo-50" },
    { name: "Total Users", value: await prisma.user.count(), icon: "👤", color: "bg-emerald-50 text-emerald-600", shadow: "shadow-emerald-50" },
  ];

  const recentAppointments = await prisma.appointment.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[#1F2937]">Counselor Console</h1>
          <p className="text-gray-500 mt-1 font-medium">Efficiently managing university mental wellness.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/appointments" className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all">
            Manage All
          </Link>
          <button className="px-5 py-2.5 bg-[#C8102E] text-white rounded-xl text-sm font-bold shadow-lg shadow-red-100 hover:shadow-red-200 transition-all">
            Export Report
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className={`bg-white p-7 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group`}>
            <div className="flex flex-col gap-4">
              <div className={`h-14 w-14 rounded-2xl ${stat.color} flex items-center justify-center text-2xl shadow-sm ${stat.shadow} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.name}</p>
                <p className="text-3xl font-black text-[#1F2937] mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h2 className="font-black text-2xl text-[#1F2937]">Incoming Requests</h2>
          <Link href="/admin/appointments" className="text-[#C8102E] font-bold text-sm hover:underline">View Appointment Queue →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Requester</th>
                <th className="px-8 py-5">Schedule</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentAppointments.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 group-hover:bg-[#C8102E] group-hover:text-white transition-colors">
                        {app.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-[#1F2937]">{app.name}</p>
                        <p className="text-xs text-gray-400 font-medium">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-gray-600">{new Date(app.appointmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-xs text-gray-400 font-medium">{app.appointmentTime}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black uppercase tracking-wider text-gray-500">
                      {app.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${
                      app.status === 'pending' ? 'bg-amber-50 text-amber-600' : 
                      app.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentAppointments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center text-gray-400 font-medium italic">
                    The queue is currently empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}