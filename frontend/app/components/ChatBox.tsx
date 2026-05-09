"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";

import {
  sendMessage,
  getChatHistory,
} from "../../lib/api";

import { useChat } from "@/app/components/context/chat-context";
import { getSessions } from "@/lib/api";

export default function ChatBox() {
  const [input, setInput] = useState("");

  const { getToken } = useAuth();

  const {
    sessionId,
    sessions,
    messages,
    setMessages,
    setSessions,
  } = useChat();

  // -----------------------------
  // SEND MESSAGE
  // -----------------------------
  const handleSend = async () => {

    if (!input.trim()) return;

    if (!sessionId) return;

    const token = await getToken();

    if (!token) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentInput = input;

    setInput("");

    try {

      const res = await sendMessage(
        currentInput,
        sessionId,
        token
      );

      const uniqueSources = res.sources
        ? [...new Set<string>(res.sources)].map(
            (s) => s.split("/").pop()
          )
        : [];

      const botMessage = {
        role: "assistant",
        content: res.answer,
        sources: uniqueSources,
      };

      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);

      // -----------------------------
      // REFRESH SIDEBAR SESSIONS
      // -----------------------------
      const updatedSessions =
        await getSessions(token);

      setSessions(
        updatedSessions.sessions
      );

    } catch (err) {

      console.error("SEND ERROR:", err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Error getting response",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-zinc-950 text-white">
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 min-h-0">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-3xl ${
              msg.role === "user" ? "ml-auto" : "mr-auto"
            }`}
          >
            <div
              className={`rounded-2xl px-5 py-4 shadow-sm ${
                msg.role === "user"
                  ? "bg-white text-black"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-100"
              }`}
            >
              <p className="leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>

              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-4 border-t border-zinc-700 pt-3">
                  <p className="text-xs uppercase tracking-wide text-zinc-400 mb-2">
                    Sources
                  </p>

                  <div className="space-y-1">
                    {msg.sources.map((s: string, idx: number) => (
                      <div
                        key={idx}
                        className="text-sm text-zinc-300"
                      >
                        • {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 bg-zinc-950 p-4 shrink-0">
        <div className="max-w-4xl mx-auto flex gap-3">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your college..."
            className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
          />

          <button
            type="button"
            onClick={() => {
              console.log("BUTTON CLICKED");
              handleSend();
            }}
            className="rounded-2xl bg-white text-black px-6 font-medium hover:bg-zinc-200"
          >
            Send
          </button>

        </div>
      </div>
    </div>
  );
}