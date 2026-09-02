import type { Metadata } from "next";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Chat with Us",
  description:
    "Speak directly with a Harnes 24/7 academic advisor. Get immediate help with tutoring, syllabus planning, or pricing options.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ChatPage() {
  return (
    <main className="h-screen h-[100dvh] max-h-screen overflow-hidden flex flex-col bg-background p-3 md:p-6 text-foreground">
      <div className="max-w-[1000px] mx-auto w-full flex-1 flex flex-col h-full overflow-hidden min-h-0">
        {/* Intro header */}
        <div className="mb-2 md:mb-3 text-center max-w-md mx-auto shrink-0">
          <Reveal>
            <h1 className="font-serif text-xl md:text-2xl font-semibold text-foreground leading-tight">
              Academic Support Chat
            </h1>
            <p className="text-xs md:text-sm text-foreground/80 mt-1 font-sans font-medium">
              Have a question about our educational services or tutors? Ask us below.
            </p>
          </Reveal>
        </div>

        {/* Chat window */}
        <Reveal delay={0.1} className="flex-1 flex justify-center min-h-0 h-full overflow-hidden">
          <ChatWindow />
        </Reveal>
      </div>
    </main>
  );
}
