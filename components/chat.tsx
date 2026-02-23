'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ui/conversation"


export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex items-center justify-center py-4 border-b border-[#BED8D4] bg-[#BED8D4]/40">
        <h1 className="text-xl font-semibold text-[#397F77]">💬 Chat Assistant</h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-[#BED8D4] scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-[#5F5566]">
            <p>Hi there! I&apos;m Jabot How can I assist you today?</p>
          </div>
        )}
        
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-2 ${
                message.role === 'user'
                  ? 'bg-[#397F77] text-[#F7F9F9] rounded-br-md'
                  : 'bg-[#BED8D4]/30 text-[#5F5566] rounded-bl-md border border-[#BED8D4]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs opacity-70">
                  {message.role === 'user' ? '👤 You' : '🤖 Assistant'}
                </span>
              </div>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return <span key={`${message.id}-${i}`}>{part.text}</span>;
                  }
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-[#BED8D4] bg-[#BED8D4]/40 backdrop-blur-sm p-4">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (input.trim()) {
              sendMessage({ text: input });
              setInput('');
            }
          }}
          className="flex gap-3"
        >
          <input
            className="flex-1 p-3 rounded-full bg-[#F7F9F9] border border-[#BED8D4] text-[#5F5566] placeholder-[#815E5B]/50 focus:outline-none focus:ring-2 focus:ring-[#397F77] focus:border-transparent transition-all duration-200"
            value={input}
            placeholder="Type your message..."
            onChange={e => setInput(e.currentTarget.value)}
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