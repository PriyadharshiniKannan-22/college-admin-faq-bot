"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

import ChatBox from "./components/ChatBox";
import UploadBox from "./components/UploadBox";

import AppLayout from "./components/layout/AppLayout";

import { ChatProvider, useChat } from "./components/context/chat-context";

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

export default function Home() {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <SignInButton />
      </div>
    );
  }

  const role = user?.publicMetadata?.role;

  // ADMIN UI
  if (role === "admin") {
    return (
      <main className="min-h-screen bg-zinc-950 text-white p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            Admin Dashboard
          </h1>

          <UserButton />
        </div>

        <UploadBox />
      </main>
    );
  }

  // USER UI
  return (
    <ChatProvider>
      <UserChatPage />
    </ChatProvider>
  );
}