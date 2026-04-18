"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello. I am your supportive wellness assistant. I can offer emotional support and general guidance, but I am not a substitute for emergency or clinical care.",
    },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const text = input.toLowerCase();

    let reply =
      "Thank you for sharing that. You are not alone. It may help to talk to a trusted person, take a short break, practice breathing, and consider booking a counselor through this portal.";

    if (
      text.includes("stress") ||
      text.includes("anxiety") ||
      text.includes("pressure")
    ) {
      reply =
        "It sounds like you may be feeling overwhelmed. Try taking a short pause, breaking tasks into smaller steps, and reaching out for support. You can also book a counseling appointment from this portal.";
    }

    if (
      text.includes("sad") ||
      text.includes("depressed") ||
      text.includes("lonely")
    ) {
      reply =
        "I am sorry that you are going through this. Please remember that your feelings matter. Consider talking to a trusted friend, family member, or counselor. Seeking support is a strong step.";
    }

    if (
      text.includes("self-harm") ||
      text.includes("suicide") ||
      text.includes("kill myself")
    ) {
      reply =
        "If you are in immediate danger or thinking about harming yourself, please contact emergency services, campus authority, or a trusted person immediately. This system cannot provide emergency care.";
    }

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
      { role: "assistant", content: reply },
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-[#F8FBFF]">
      <Navbar />

      <div className="px-6 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-[#C8102E] mb-2">
            AI Support Chat
          </h1>
          <p className="text-gray-500 mb-6">
            This assistant provides supportive guidance only. It is not a
            substitute for emergency or clinical care.
          </p>

          <div className="h-[420px] overflow-y-auto border rounded-2xl p-4 bg-gray-50 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "ml-auto bg-[#DCEEFF] text-[#1F2937]"
                    : "mr-auto bg-[#E7F8EF] text-[#1F2937]"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-3">
            <input
              type="text"
              placeholder="Share how you feel..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
            <button
              onClick={sendMessage}
              className="px-6 py-3 rounded-xl bg-[#C8102E] text-white font-semibold hover:opacity-90"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}