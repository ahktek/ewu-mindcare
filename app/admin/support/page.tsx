import { prisma } from "@/lib/prisma";

export default async function SupportAdminPage() {
  const requests = await prisma.anonymousSupport.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#1F2937]">Anonymous Support Requests</h1>
        <p className="text-gray-500">Review concerns shared by students privately.</p>
      </div>

      <div className="grid gap-6">
        {requests.map((req) => (
          <div key={req.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-[#DCEEFF] text-[#C8102E]`}>
                {req.category || "General Concern"}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(req.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {req.concern}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
              <button className="text-sm font-semibold text-[#C8102E] hover:underline">
                Mark as Reviewed
              </button>
            </div>
          </div>
        ))}
        {requests.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No support requests yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
