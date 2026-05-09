"use client";

import { useUser, UserButton } from "@clerk/nextjs";

import ChatBox from "@/app/components/ChatBox";
import AppLayout from "@/app/components/layout/AppLayout";

import {
  ChatProvider,
  useChat,
} from "@/app/chat/context/chat-context";

function UserChatPage() {

  const { sessionId } = useChat();

  return (
    <AppLayout>

      <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">

        <h1 className="text-xl font-semibold">
          College Hub AI
        </h1>

        <UserButton />

      </div>

      {sessionId ? (
        <ChatBox />
      ) : (
        <div className="flex-1 flex items-center justify-center text-zinc-500">
          Loading chat...
        </div>
      )}

    </AppLayout>
  );
}

export default function ChatPage() {

  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  const role = user?.publicMetadata?.role;

  if (role !== "user") {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Unauthorized
      </div>
    );
  }

  return (
    <ChatProvider>
      <UserChatPage />
    </ChatProvider>
  );
}