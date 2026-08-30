"use client";

import React, { useState, useEffect } from "react";
import { Message, defaultChatService } from "@/lib/chatService";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";
import { ChatComposer } from "./ChatComposer";

interface ChatWindowProps {
  embedded?: boolean;
}

export function ChatWindow({ embedded = false }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Subscribe to chat service changes
  useEffect(() => {
    setMessages(defaultChatService.getMessages());

    const unsubscribe = defaultChatService.subscribe(() => {
      const msgs = defaultChatService.getMessages();
      setMessages(msgs);

      // Check if typing indicator should show
      if (msgs.length > 0 && msgs[msgs.length - 1].sender === "visitor") {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleSend = async (text: string) => {
    // Check if input is empty
    if (!text.trim()) return;

    // Send via ChatService
    await defaultChatService.sendMessage(text);
  };

  const handleSelectPrompt = async (prompt: string) => {
    await handleSend(prompt);
  };

  const handleClear = () => {
    defaultChatService.clearConversation();
  };

  return (
    <div
      className={`flex flex-col bg-background border-2 border-[#c5a059] ring-1 ring-[#c5a059]/20 overflow-hidden ${
        embedded ? "w-full h-full" : "max-w-[750px] mx-auto w-full shadow-2xl h-[calc(100vh-160px)] max-h-[650px] min-h-[420px]"
      }`}
    >
      {/* Header */}
      <ChatHeader onClear={handleClear} showClear={messages.length > 1} />

      {/* Messages */}
      <ChatMessageList
        messages={messages}
        isTyping={isTyping}
        onSelectPrompt={handleSelectPrompt}
      />

      {/* Composer */}
      <ChatComposer onSend={handleSend} disabled={isTyping} />
    </div>
  );
}
