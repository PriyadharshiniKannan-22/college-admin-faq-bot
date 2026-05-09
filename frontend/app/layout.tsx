import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatProvider } from "@/app/chat/context/chat-context";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("font-sans", geist.variable)}>
        <body className="bg-black text-white">
          <TooltipProvider>
            <ChatProvider>
              {children}
            </ChatProvider>
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}