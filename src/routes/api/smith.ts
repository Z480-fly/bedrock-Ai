import { createFileRoute } from "@tanstack/react-router";
import { buildSystemPrompt, clipMessages } from "@/lib/bedrock/prompt.server";
import type { SmithRequest } from "@/lib/bedrock/types";

export const Route = createFileRoute("/api/smith")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.XAI_API_KEY;
        if (!apiKey) {
          return Response.json(
            { error: "Smith is unavailable in this environment." },
            { status: 503 },
          );
        }

        let body: SmithRequest;
        try {
          body = (await request.json()) as SmithRequest;
        } catch {
          return Response.json({ error: "Invalid JSON body." }, { status: 400 });
        }

        const messages = clipMessages(Array.isArray(body.messages) ? body.messages : []);
        if (messages.length === 0 || messages[messages.length - 1]?.role !== "user") {
          return Response.json({ error: "Send a user message." }, { status: 400 });
        }

        const upstream = await fetch("https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "grok-4.5",
            stream: true,
            temperature: 0.35,
            max_tokens: 3200,
            messages: [
              { role: "system", content: buildSystemPrompt(body.project ?? null) },
              ...messages,
            ],
          }),
        });

        if (!upstream.ok || !upstream.body) {
          const text = await upstream.text().catch(() => "");
          return Response.json(
            { error: `Smith could not reach the model (${upstream.status}). ${text.slice(0, 200)}` },
            { status: 502 },
          );
        }

        return new Response(upstream.body, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
          },
        });
      },
    },
  },
});
