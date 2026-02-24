"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ui/conversation";
import { Message, MessageContent } from "@/components/ui/message";
import { Orb } from "@/components/ui/orb";
import { Response } from "@/components/ui/response";
import { IconSparkles } from "@tabler/icons-react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}

      {/* Messages Container */}
      <Card className="relative mx-auto my-0 size-full h-[400px] py-0">
        <div className="flex h-full flex-col">
          <Conversation>
            <ConversationContent>
              {messages.length === 0 ? (
                <ConversationEmptyState
                  icon={<Orb className="size-12" />}
                  title="Welcome to Ellwood Management AI"
                  description="Your intelligent assistant for property management. Ask me anything about your HOA rules, policies, or community guidelines!"
                />
              ) : (
                <>
                  {messages.map((message) => (
                    <Message from={message.role} key={message.id}>
                      <MessageContent>
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case "text":
                              return (
                                <Response key={`${message.id}-${i}`}>
                                  {part.text}
                                </Response>
                              );
                            default:
                              return null;
                          }
                        })}
                      </MessageContent>
                      {message.role === "assistant" && (
                        <div className="ring-border size-8 overflow-hidden rounded-full ring-1">
                          <Orb className="h-full w-full" agentState={null} />
                        </div>
                      )}
                    </Message>
                  ))}
                </>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </div>
      </Card>

      {/* Input Form */}
      <div className="border-t border-[#BED8D4] bg-[#BED8D4]/40 backdrop-blur-sm p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              sendMessage({ text: input });
              setInput("");
            }
          }}
          className="flex gap-3"
        >
          <input
            className="flex-1 p-3 rounded-full bg-[#F7F9F9] border border-[#BED8D4] text-[#5F5566] placeholder-[#815E5B]/50 focus:outline-none focus:ring-2 focus:ring-[#397F77] focus:border-transparent transition-all duration-200"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-6 py-3 bg-[#397F77] text-[#F7F9F9] rounded-full font-medium hover:bg-[#397F77]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
