import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const stats = [
    { name: "Total Appointments", value: await prisma.appointment.count(), icon: "📅", color: "bg-blue-50 text-blue-600" },
    { name: "Pending Requests", value: await prisma.appointment.count({ where: { status: "pending" } }), icon: "⏳", color: "bg-yellow-50 text-yellow-600" },
    { name: "Support Tickets", value: await prisma.anonymousSupport.count(), icon: "✉️", color: "bg-purple-50 text-purple-600" },
    { name: "Registered Users", value: await prisma.user.count(), icon: "👤", color: "bg-green-50 text-green-600" },
  ];

  const recentAppointments = await prisma.appointment.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#1F2937]">Counselor Dashboard</h1>
        <p className="text-gray-500">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-2xl ${stat.color} flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-[#1F2937]">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-xl text-[#1F2937]">Recent Appointments</h2>
          <button className="text-[#C8102E] font-semibold text-sm">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentAppointments.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#1F2937]">{app.name}</p>
                    <p className="text-xs text-gray-500">{app.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(app.appointmentDate).toLocaleDateString()} at {app.appointmentTime}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                    {app.role}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                      app.status === 'approved' ? 'bg-green-100 text-green-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentAppointments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}