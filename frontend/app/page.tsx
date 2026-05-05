"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import ChatBox from "./components/ChatBox";
import UploadBox from "./components/UploadBox";

export default function Home() {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  if (!isSignedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <SignInButton />
      </div>
    );
  }

  const role = user?.publicMetadata?.role;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">College Admin Chatbot</h1>
        <UserButton />
      </div>

      {role === "admin" && <UploadBox />}
      {role === "user" && <ChatBox />}
    </main>
  );
}