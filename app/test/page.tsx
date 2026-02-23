import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ui/conversation";

export default async function TestPage() {
  const messages = [
    {
      id: "1",
      role: "user",
      content: [{ type: "text", text: "Hello, how are you?" }],
    },
    {
      id: "2",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "I am good, thank you! How can I assist you today?",
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 p-4 md:p-6">
        <div className="flex h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border bg-background shadow-lg">
            <header className="flex items-center gap-3 border-b px-6 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 8V4H8" />
                        <rect width="16" height="12" x="4" y="8" rx="2" />
                        <path d="M2 14h2" />
                        <path d="M20 14h2" />
                        <path d="M15 13v2" />
                        <path d="M9 13v2" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-base font-semibold">Elwood AI Assistant</h1>
                    <p className="text-xs text-muted-foreground">Always online</p>
                </div>
            </header>
    <Conversation>
      <ConversationContent>
        {messages.length === 0 ? (
          <ConversationEmptyState
            title="No messages yet"
            description="Start a conversation to see messages here"
          />
        ) : (
          messages.map((message) => (
            <div key={message.id}>
              {message.content.map((part, i) => (
                <span key={i}>{part.text}</span>
              ))}
            </div>
          ))
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
        </div>
    </div>
  );
}
