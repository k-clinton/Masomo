import type { Metadata } from "next";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Chat with Us",
  description:
    "Speak directly with a Mersomo academic advisor. Get immediate help with tutoring, syllabus planning, or pricing options.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ChatPage() {
  return (
    <main className="pt-[72px] flex-1 flex flex-col justify-center bg-background py-8 md:py-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16 w-full flex-1 flex flex-col justify-center">
        {/* Intro header */}
        <div className="mb-6 text-center max-w-md mx-auto">
          <Reveal>
            <h1 className="font-serif text-2xl font-normal text-foreground leading-tight">
              Academic Support Chat
            </h1>
            <p className="text-xs text-foreground/45 mt-2 font-sans">
              Have a question about our educational services or tutors? Ask us below.
            </p>
          </Reveal>
        </div>

        {/* Chat window */}
        <Reveal delay={0.1} className="flex-1 flex justify-center">
          <ChatWindow />
        </Reveal>
      </div>
    </main>
  );
}
