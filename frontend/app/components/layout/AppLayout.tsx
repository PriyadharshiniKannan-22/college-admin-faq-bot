"use client";

import Sidebar from "../sidebar/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col bg-zinc-950">
        {children}
      </main>
    </div>
  );
}