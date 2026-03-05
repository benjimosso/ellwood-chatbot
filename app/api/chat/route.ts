import { streamText, UIMessage, convertToModelMessages, embed, tool, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { matchRules } from "@/lib/supabase/admin";

const ALLOWED_MODELS = ["o4-mini", "gpt-4o", "gpt-4o-mini"] as const;
type AllowedModel = (typeof ALLOWED_MODELS)[number];

export async function POST(req: Request) {
  const { messages, model: requestedModel, hoaId }: {
    messages: UIMessage[];
    model?: string;
    hoaId?: string;
  } = await req.json();

  const model: AllowedModel = ALLOWED_MODELS.includes(requestedModel as AllowedModel)
    ? (requestedModel as AllowedModel)
    : "o4-mini";

  const resolvedHoaId = hoaId || process.env.HOA_ID!;

  const result = streamText({
    model: openai(model),
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
          const results = await matchRules(embedding, resolvedHoaId);
          
          const context = results
            .map((r: { content: string }) => r.content)
            .join("\n\n");
          
          return { context };
        },
      }),
    },
    stopWhen: stepCountIs(3),
  });

  return result.toUIMessageStreamResponse();
}