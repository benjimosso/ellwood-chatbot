import { streamText, UIMessage, convertToModelMessages, embed, tool, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { matchRules } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("o4-mini"),
    system: `You are chatbot, a helpful HOA (Homeowners Association) assistant. When a user asks a question, use the getContext tool to retrieve relevant rules and information from the knowledge base. Always base your answers on the context provided by the tool. If the context doesn't contain relevant information, let the user know you couldn't find specific rules about their question.`,
    messages: await convertToModelMessages(messages),
    tools: {
      getContext: tool({
        description:
          "Retrieves relevant HOA rules and context based on the user query. Call this tool whenever the user asks a question that may relate to HOA rules, policies, or community guidelines.",
        inputSchema: z.object({
          query: z.string().describe("The user query to search for relevant context"),
        }),
        execute: async ({ query }) => {
          const { embedding } = await embed({
            model: openai.embedding("text-embedding-3-small"),
            value: query,
          });
          console.log("Generated embedding for query:", embedding, "...");
          const hoaId = process.env.HOA_ID!;
          const results = await matchRules(embedding, hoaId);
          console.log("matchRules results:", results);
          const context = results
            .map((r: { content: string }) => r.content)
            .join("\n\n");
          console.log("Retrieved context:", context);
          return { context };
        },
      }),
    },
    stopWhen: stepCountIs(3),
  });

  return result.toUIMessageStreamResponse();
}