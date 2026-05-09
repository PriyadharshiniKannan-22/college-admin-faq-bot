"use client";

import { useUser, UserButton } from "@clerk/nextjs";

import UploadBox from "@/app/components/UploadBox";

export default function AdminPage() {

  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  const role = user?.publicMetadata?.role;

  if (role !== "admin") {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Unauthorized
      </div>
    );
  }

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