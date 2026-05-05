"use client";

import { useState } from "react";
import { sendMessage } from "../../lib/api";
import { useAuth } from "@clerk/nextjs";

export default function ChatBox() {
  const { getToken } = useAuth();

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const token = await getToken({ template: "rbac" });

      const res = await sendMessage(input, token || "");

      const uniqueSources = res.sources
        ? [...new Set<string>(res.sources)].map((s) => s.split("/").pop())
        : [];

      const botMessage = {
        role: "assistant",
        content: res.answer,
        sources: uniqueSources,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error getting response" },
      ]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col h-[80vh] border rounded p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded max-w-[70%] ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black mr-auto"
            }`}
          >
            <p>{msg.content}</p>

            {msg.sources && msg.sources.length > 0 && (
              <div className="text-xs text-gray-600 mt-2">
                <p className="font-semibold">Sources:</p>
                {msg.sources.map((s: string, idx: number) => (
                  <div key={idx}>• {s}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 w-full rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          onClick={handleSend}
          className="bg-black text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}