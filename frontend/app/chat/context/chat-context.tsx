"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

type Session = {
  session_id: string;
  title: string;
};

type Message = {
  role: string;
  content: string;
  sources?: string[];
};

type ChatContextType = {
  sessionId: string;
  setSessionId: (id: string) => void;

  sessions: Session[];
  setSessions: React.Dispatch<
    React.SetStateAction<Session[]>
  >;

  messages: Message[];
  setMessages: React.Dispatch<
    React.SetStateAction<Message[]>
  >;
};

const ChatContext = createContext<ChatContextType>({
  sessionId: "",
  setSessionId: () => {},

  sessions: [],
  setSessions: () => {},

  messages: [],
  setMessages: () => {},
});

export function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [sessionId, setSessionId] = useState("");

  const [sessions, setSessions] = useState<Session[]>([]);

  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <ChatContext.Provider
      value={{
        sessionId,
        setSessionId,

        sessions,
        setSessions,

        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);