import ChatBox from "./components/ChatBox";
import UploadBox from "./components/UploadBox";

export default function Home() {
  return (
    <main className="h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">
        College Admin Chatbot
      </h1>

      <UploadBox />
      <ChatBox />
    </main>
  );
}