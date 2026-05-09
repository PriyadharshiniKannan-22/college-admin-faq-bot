"use client";

import { useEffect } from "react";

import {
  MessageSquare,
  Plus,
} from "lucide-react";

import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import {
  createSession,
  getSessions,
  getChatHistory,
} from "@/lib/api";

import { useChat } from "../../chat/context/chat-context";

type Session = {
  session_id: string;
  title: string;
};

export default function Sidebar() {

  const { getToken } = useAuth();

  const {
    sessionId,
    setSessionId,

    sessions,
    setSessions,

    setMessages,
  } = useChat();

  // -----------------------------------
  // LOAD SESSIONS
  // -----------------------------------
  useEffect(() => {

    const loadSessions = async () => {

      try {

        const token = await getToken();

        if (!token) return;

        const res = await getSessions(token);

        const fetchedSessions = res.sessions || [];

        setSessions(fetchedSessions);

        // AUTO SELECT LATEST SESSION
        if (fetchedSessions.length > 0) {

          const latest = fetchedSessions[0];

          setSessionId(latest.session_id);

          const historyRes =
            await getChatHistory(
              latest.session_id,
              token
            );

          setMessages(
            historyRes.messages || []
          );

        } else {

          // CREATE FIRST SESSION
          const newSession =
            await createSession(token);

          const newChat = {
            session_id:
              newSession.session_id,
            title: "New Chat",
          };

          setSessions([newChat]);

          setSessionId(
            newSession.session_id
          );

          setMessages([]);
        }

      } catch (err) {
        console.error(
          "SESSION LOAD ERROR:",
          err
        );
      }
    };

    loadSessions();

  }, []);

  // -----------------------------------
  // NEW CHAT
  // -----------------------------------
  const handleNewChat = async () => {

    try {

      const token = await getToken();

      if (!token) return;

      const res = await createSession(token);

      const newSession = {
        session_id: res.session_id,
        title: "New Chat",
      };

      setSessions((prev) => [
        newSession,
        ...prev,
      ]);

      setSessionId(res.session_id);

      setMessages([]);

    } catch (err) {
      console.error(
        "NEW CHAT ERROR:",
        err
      );
    }
  };

  // -----------------------------------
  // SWITCH CHAT
  // -----------------------------------
  const handleSwitchSession =
    async (id: string) => {

      try {

        const token = await getToken();

        if (!token) return;

        setSessionId(id);

        const res =
          await getChatHistory(
            id,
            token
          );

        setMessages(
          res.messages || []
        );

      } catch (err) {
        console.error(
          "CHAT HISTORY ERROR:",
          err
        );
      }
    };

  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-950 flex flex-col">

      {/* TOP */}
      <div className="p-4">

        <Button
          onClick={handleNewChat}
          className="w-full rounded-2xl bg-white text-black hover:bg-zinc-200 h-14 text-base font-medium"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Chat
        </Button>

      </div>

      <Separator className="bg-zinc-800" />

      {/* SESSIONS */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-2">

        {sessions.map((chat: Session) => (

          <button
            key={chat.session_id}
            onClick={() =>
              handleSwitchSession(
                chat.session_id
              )
            }
            className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-2xl transition-all duration-200 text-sm
              
              ${
                sessionId === chat.session_id
                  ? "bg-white text-black"
                  : "hover:bg-zinc-900 text-zinc-300"
              }
            `}
          >

            <MessageSquare className="h-4 w-4 shrink-0" />

            <span className="truncate">
              {chat.title}
            </span>

          </button>
        ))}
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-zinc-800">

        <div className="rounded-2xl bg-zinc-900 p-4">

          <p className="text-sm font-semibold">
            College Hub AI
          </p>

          <p className="text-xs text-zinc-400 mt-1">
            Smart Student Assistant
          </p>

        </div>
      </div>
    </aside>
  );
}