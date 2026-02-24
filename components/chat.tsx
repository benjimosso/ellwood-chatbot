"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ui/conversation";
import { Message, MessageContent } from "@/components/ui/message";
import { Orb } from "@/components/ui/orb";
import { Response } from "@/components/ui/response";
import { ChatBoxInput } from "@/components/chatboxinput";

interface ChatProps {
  hoaId: string | null;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export default function Chat({ hoaId, selectedModel, onModelChange }: ChatProps) {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = () => {
    if (input.trim() && hoaId) {
      sendMessage({ text: input }, { body: { model: selectedModel, hoaId } });
      setInput("");
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-hidden">

      {/* Messages Container */}
      <div className="relative flex flex-1 overflow-hidden">
        <Conversation className="w-full">
            <ConversationContent>
              {messages.length === 0 ? (
                <ConversationEmptyState
                  icon={<Orb className="size-12" />}
                  title="Welcome to Ellwood Management AI"
                  description={
                    hoaId
                      ? "Your intelligent assistant for property management. Ask me anything about your HOA rules, policies, or community guidelines!"
                      : "Select your HOA association below to get started."
                  }
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
                  <div ref={messagesEndRef} />
                </>
              )}
            </ConversationContent>
            <ConversationScrollButton />
        </Conversation>
      </div>

      {/* Input */}
      <div className="flex justify-center border-t border-[#BED8D4] bg-[#BED8D4]/40 backdrop-blur-sm p-4">
        <ChatBoxInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          selectedModel={selectedModel}
          onModelChange={onModelChange}
          disabled={!hoaId || status === "streaming"}
        />
      </div>
    </div>
  );
}
