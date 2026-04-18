import Navbar from "@/components/Navbar";

export default function ResourcesPage() {
  const resources = [
    {
      title: "Stress Management Tips",
      desc: "Learn practical ways to reduce academic and personal stress.",
    },
    {
      title: "Healthy Study-Life Balance",
      desc: "Maintain balance between coursework, sleep, and personal life.",
    },
    {
      title: "When to Seek Counseling",
      desc: "Understand the signs that indicate you may need professional support.",
    },
    {
      title: "Mindfulness & Relaxation",
      desc: "Simple breathing and relaxation exercises for mental wellness.",
    },
    {
      title: "Support for Faculty",
      desc: "Guidance for faculty members managing stress and burnout.",
    },
    {
      title: "Support for Students",
      desc: "Academic pressure, anxiety, and emotional support resources.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FBFF]">
      <Navbar />

      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-[#C8102E]">
              Mental Health Resources
            </h1>
            <p className="text-gray-600 mt-3">
              Helpful wellness resources for East West University students and
              faculty.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-[#C8102E] mb-3">
                  {item.title}
                </h2>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}