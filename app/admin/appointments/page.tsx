import { prisma } from "@/lib/prisma";
import AppointmentActions from "@/components/admin/AppointmentActions";

export default async function AppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#1F2937]">Manage Appointments</h1>
        <p className="text-gray-500">Review and update student counseling requests.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Schedule</th>
                <th className="px-6 py-4">Concern</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#1F2937]">{app.name}</p>
                    <p className="text-xs text-gray-500 uppercase">{app.role}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(app.appointmentDate).toLocaleDateString()}<br/>
                    {app.appointmentTime}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {app.notes || "No notes provided"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                      app.status === 'approved' ? 'bg-green-100 text-green-700' : 
                      app.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <AppointmentActions id={app.id} currentStatus={app.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
